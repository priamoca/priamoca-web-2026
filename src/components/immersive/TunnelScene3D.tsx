import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface TunnelScene3DProps {
  progress: number; // 0.0 to 1.0
  tiltX: number;
  tiltY: number;
}

interface LightGate {
  group: THREE.Group;
  veilMat: THREE.MeshBasicMaterial;
  outerRingMat: THREE.LineBasicMaterial;
  innerRingMat: THREE.LineBasicMaterial;
  centerProgress: number;
}

export const TunnelScene3D: React.FC<TunnelScene3DProps> = ({
  progress,
  tiltX,
  tiltY,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const roadMeshRef = useRef<THREE.Mesh | null>(null);
  const roadUniformsRef = useRef<{
    uTravel: { value: number };
    uOpacity: { value: number };
    uShadowOpacity: { value: number };
    uShadowOffsetX: { value: number };
  } | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const particleMatRef = useRef<THREE.PointsMaterial | null>(null);
  const lightBarrierRef = useRef<{
    group: THREE.Group;
    veilMat: THREE.MeshBasicMaterial;
    outerRingMat: THREE.LineBasicMaterial;
    innerRingMat: THREE.LineBasicMaterial;
    light: THREE.PointLight;
  } | null>(null);
  const whiteTunnelGatesRef = useRef<LightGate[]>([]);
  const baseFovRef = useRef<number>(65);
  const progressRef = useRef(progress);
  const tiltRef = useRef({ x: tiltX, y: tiltY });

  progressRef.current = progress;
  tiltRef.current = { x: tiltX, y: tiltY };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Transparent WebGL Scene layered seamlessly over the Bridge & El Ávila backdrops
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    const computeCameraFov = (w: number, h: number) => {
      const aspect = w / Math.max(h, 1);
      if (aspect < 1) {
        return Math.min(82, Math.max(66, 65 / (aspect * 1.05)));
      }
      return 65;
    };

    const initialFov = computeCameraFov(width, height);
    baseFovRef.current = initialFov;
    const camera = new THREE.PerspectiveCamera(initialFov, width / Math.max(height, 1), 0.1, 300);
    camera.position.set(0, 0, 0);
    // Align 3D vanishing point slightly below screen center (~55.2% vertical) to match the Maracaibo Bridge horizon
    camera.rotation.x = 0.066;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    const disposables: Array<{ dispose: () => void }> = [];

    // 1. 3D Perspective Bridge Roadway Depth Flow + Contact Shadow under Priamito
    const roadUniforms = {
      uTravel: { value: 0 },
      uOpacity: { value: 0 },
      uShadowOpacity: { value: 0 },
      uShadowOffsetX: { value: 0 },
    };
    roadUniformsRef.current = roadUniforms;

    const roadGeom = new THREE.PlaneGeometry(7.4, 72);
    const roadMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: roadUniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTravel;
        uniform float uOpacity;
        uniform float uShadowOpacity;
        uniform float uShadowOffsetX;

        void main() {
          float lateralDist = abs(vUv.x - 0.5) * 2.0;
          float edgeMask = 1.0 - smoothstep(0.45, 0.98, lateralDist);
          float nearMask = smoothstep(0.02, 0.16, vUv.y);
          float farMask = 1.0 - smoothstep(0.55, 0.96, vUv.y);
          float roadMask = edgeMask * nearMask * farMask;

          float zCoord = vUv.y * 14.0 - uTravel;
          float dashCycle = fract(zCoord);
          float dash = smoothstep(0.08, 0.14, dashCycle) * (1.0 - smoothstep(0.42, 0.48, dashCycle));

          float laneLineL = 1.0 - smoothstep(0.008, 0.022, abs(vUv.x - 0.355));
          float laneLineR = 1.0 - smoothstep(0.008, 0.022, abs(vUv.x - 0.645));
          float dashes = (laneLineL + laneLineR) * dash;

          float catEyePhase = fract(zCoord * 2.0);
          float catEyePulse = smoothstep(0.15, 0.25, catEyePhase) * (1.0 - smoothstep(0.32, 0.42, catEyePhase));
          float centerLine = 1.0 - smoothstep(0.006, 0.018, abs(vUv.x - 0.5));
          float amberGlints = centerLine * catEyePulse;

          vec2 shadowDelta = vec2((vUv.x - 0.5 - uShadowOffsetX) * 5.2, (vUv.y - 0.18) * 10.5);
          float shadowOval = exp(-dot(shadowDelta, shadowDelta) * 2.4) * uShadowOpacity;

          vec3 col = vec3(0.95, 0.98, 1.0) * dashes * 0.28 + vec3(1.0, 0.80, 0.25) * amberGlints * 0.42;
          float laneAlpha = (dashes * 0.24 + amberGlints * 0.38) * roadMask * uOpacity;

          vec3 finalCol = mix(col, vec3(0.04, 0.07, 0.12), shadowOval * 0.85);
          float finalAlpha = clamp(laneAlpha + shadowOval * 0.28 * roadMask, 0.0, 0.65);

          gl_FragColor = vec4(finalCol, finalAlpha);
        }
      `,
    });
    const roadMesh = new THREE.Mesh(roadGeom, roadMat);
    roadMesh.rotation.x = -Math.PI / 2;
    roadMesh.position.set(0, -1.55, -36);
    scene.add(roadMesh);
    roadMeshRef.current = roadMesh;
    disposables.push(roadGeom, roadMat);

    // Circular radial contour geometry for smooth luminous light-tunnel gates
    const circlePts: THREE.Vector3[] = [];
    const ringSegs = 64;
    for (let i = 0; i <= ringSegs; i++) {
      const a = (i / ringSegs) * Math.PI * 2;
      circlePts.push(new THREE.Vector3(Math.cos(a) * 5.4, Math.sin(a) * 5.4, 0));
    }
    const ringCircleGeom = new THREE.BufferGeometry().setFromPoints(circlePts);
    disposables.push(ringCircleGeom);

    // 20% Light Barrier portal shape
    const w = 5.6;
    const h = 4.3;
    const c = 1.2;
    const frameShape = new THREE.Shape();
    frameShape.moveTo(-w + c, -h);
    frameShape.lineTo(w - c, -h);
    frameShape.lineTo(w, -h + c);
    frameShape.lineTo(w, h - c);
    frameShape.lineTo(w - c, h);
    frameShape.lineTo(-w + c, h);
    frameShape.lineTo(-w, h - c);
    frameShape.lineTo(-w, -h + c);
    frameShape.closePath();
    const frameGeom = new THREE.BufferGeometry().setFromPoints(frameShape.getPoints());
    disposables.push(frameGeom);

    // Radial luminous veil texture for the 20% portal
    const veilCanvas = document.createElement('canvas');
    veilCanvas.width = 512;
    veilCanvas.height = 512;
    const vCtx = veilCanvas.getContext('2d');
    if (vCtx) {
      const grad = vCtx.createRadialGradient(256, 256, 12, 256, 256, 250);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      grad.addColorStop(0.25, 'rgba(155, 255, 230, 0.65)');
      grad.addColorStop(0.55, 'rgba(0, 210, 255, 0.28)');
      grad.addColorStop(0.85, 'rgba(33, 228, 91, 0.08)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      vCtx.fillStyle = grad;
      vCtx.fillRect(0, 0, 512, 512);
    }
    const veilTex = new THREE.CanvasTexture(veilCanvas);
    veilTex.colorSpace = THREE.SRGBColorSpace;
    const veilGeom = new THREE.PlaneGeometry(w * 2.1, h * 2.1);
    disposables.push(veilTex, veilGeom);

    // Pure-white radiant beam texture for the 62%..66% white light tunnel transition
    const whiteCanvas = document.createElement('canvas');
    whiteCanvas.width = 512;
    whiteCanvas.height = 512;
    const wCtx = whiteCanvas.getContext('2d');
    if (wCtx) {
      const wGrad = wCtx.createRadialGradient(256, 256, 8, 256, 256, 252);
      wGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      wGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.88)');
      wGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.42)');
      wGrad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
      wCtx.fillStyle = wGrad;
      wCtx.fillRect(0, 0, 512, 512);
    }
    const whiteTex = new THREE.CanvasTexture(whiteCanvas);
    whiteTex.colorSpace = THREE.SRGBColorSpace;
    const whiteGateGeom = new THREE.PlaneGeometry(14, 14);
    disposables.push(whiteTex, whiteGateGeom);

    // 2. Luminous Light Barrier Gate at z = -12 (crossed at ~20% progress)
    const lightBarrierGroup = new THREE.Group();
    lightBarrierGroup.position.set(0, 0, -12.0);

    const outerRingMat = new THREE.LineBasicMaterial({ color: 0xaafff2, transparent: true, opacity: 0 });
    const outerRing = new THREE.Line(frameGeom, outerRingMat);
    outerRing.scale.set(0.98, 0.98, 1);
    lightBarrierGroup.add(outerRing);

    const innerRingMat = new THREE.LineBasicMaterial({ color: 0x00d2ff, transparent: true, opacity: 0 });
    const innerRing = new THREE.Line(frameGeom, innerRingMat);
    innerRing.scale.set(0.78, 0.78, 1);
    lightBarrierGroup.add(innerRing);

    const veilMat = new THREE.MeshBasicMaterial({
      map: veilTex,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    lightBarrierGroup.add(new THREE.Mesh(veilGeom, veilMat));

    const barrierLight = new THREE.PointLight(0x88fff0, 0, 35);
    barrierLight.position.set(0, 0, -11.5);
    scene.add(barrierLight);
    scene.add(lightBarrierGroup);
    disposables.push(outerRingMat, innerRingMat, veilMat);

    lightBarrierRef.current = {
      group: lightBarrierGroup,
      veilMat,
      outerRingMat,
      innerRingMat,
      light: barrierLight,
    };

    // 3. 3D Pure-White Light Tunnel Portals (replaces colored squares barrier cleanly across 61.5%..65.8%)
    const whiteGateDefs = [
      { z: -72.0, centerProgress: 0.625 },
      { z: -75.0, centerProgress: 0.638 },
      { z: -78.2, centerProgress: 0.648 },
    ];
    const whiteGates: LightGate[] = whiteGateDefs.map((def) => {
      const g = new THREE.Group();
      g.position.set(0, 0, def.z);
      g.visible = false;

      const wOuterMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
      const wOuter = new THREE.Line(ringCircleGeom, wOuterMat);
      wOuter.scale.set(0.95, 0.95, 1);
      g.add(wOuter);

      const wInnerMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
      const wInner = new THREE.Line(ringCircleGeom, wInnerMat);
      wInner.scale.set(0.65, 0.65, 1);
      g.add(wInner);

      const wVeilMat = new THREE.MeshBasicMaterial({
        map: whiteTex,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      g.add(new THREE.Mesh(whiteGateGeom, wVeilMat));

      scene.add(g);
      disposables.push(wOuterMat, wInnerMat, wVeilMat);

      return {
        group: g,
        veilMat: wVeilMat,
        outerRingMat: wOuterMat,
        innerRingMat: wInnerMat,
        centerProgress: def.centerProgress,
      };
    });
    whiteTunnelGatesRef.current = whiteGates;

    // 4. 3D Lakeside Wind & Atmospheric Depth Particles (framing outer corridor, unobstructed center)
    const particleCount = 260;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const coastalTints = [
      new THREE.Color(0xFFFFFF),
      new THREE.Color(0xBFF5FF),
      new THREE.Color(0x21E45B),
      new THREE.Color(0x00D2FF),
      new THREE.Color(0xFFE8A3),
    ];

    for (let i = 0; i < particleCount; i++) {
      const side = i % 2 === 0 ? 1 : -1;
      positions[i * 3] = side * (1.8 + Math.random() * 5.2);
      positions[i * 3 + 1] = (Math.random() - 0.45) * 7.2;
      positions[i * 3 + 2] = -6 - Math.random() * 105;

      const col = coastalTints[i % coastalTints.length];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.11,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);
    particlesRef.current = particles;
    particleMatRef.current = particleMat;
    disposables.push(particleGeom, particleMat);

    // Resize handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const cw = container.clientWidth || window.innerWidth;
      const ch = container.clientHeight || window.innerHeight;
      baseFovRef.current = computeCameraFov(cw, ch);
      cameraRef.current.aspect = cw / Math.max(ch, 1);
      cameraRef.current.fov = baseFovRef.current;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(cw, ch);
    };

    window.addEventListener('resize', handleResize);

    // Deterministic render loop strictly driven by progressRef and tiltRef
    let frameId = 0;
    const render = () => {
      frameId = requestAnimationFrame(render);
      const prog = progressRef.current;
      const tilt = tiltRef.current;

      if (!cameraRef.current || !rendererRef.current || !sceneRef.current) return;

      // Skip unnecessary WebGL draw calls once Roland Printer fully owns viewport (>= 0.75)
      if (prog >= 0.75) return;

      const bridgeTravel = Math.min(1, Math.max(0, (prog - 0.14) / (0.70 - 0.14)));
      const targetZ = -bridgeTravel * 84;

      // Deterministic 20% luminous light-barrier depth burst (0.178 to 0.225, peak at 0.20)
      const barrierBurst =
        prog >= 0.178 && prog <= 0.225
          ? Math.exp(-Math.pow((prog - 0.20) / 0.010, 2))
          : 0;

      // Pure-white light tunnel transition depth warp centered ~0.638 (0.615..0.658)
      const whiteTunnelWarp =
        prog >= 0.615 && prog <= 0.658
          ? Math.exp(-Math.pow((prog - 0.639) / 0.011, 2))
          : 0;

      cameraRef.current.position.z = targetZ;
      cameraRef.current.position.x = tilt.x * 0.75;
      cameraRef.current.position.y = tilt.y * 0.55;
      cameraRef.current.rotation.z = tilt.x * 0.035;

      const targetFov = baseFovRef.current + barrierBurst * 6.5 + whiteTunnelWarp * 4.5;
      if (Math.abs(cameraRef.current.fov - targetFov) > 0.02) {
        cameraRef.current.fov = targetFov;
        cameraRef.current.updateProjectionMatrix();
      }

      // 1. Update 3D Bridge Roadway Perspective Flow & Priamito Contact Shadow (0.03 -> 0.642)
      if (roadMeshRef.current && roadUniformsRef.current) {
        const roadFadeIn = Math.min(1, Math.max(0, (prog - 0.03) / 0.09));
        const roadFadeOut = prog <= 0.632 ? 1 : Math.max(0, 1 - (prog - 0.632) / (0.642 - 0.632));
        const shadowFadeIn = Math.min(1, Math.max(0, (prog - 0.11) / 0.04));
        const shadowFadeOut = prog <= 0.61 ? 1 : Math.max(0, 1 - (prog - 0.61) / (0.642 - 0.61));

        roadMeshRef.current.position.z = targetZ - 36;
        roadMeshRef.current.visible = prog >= 0.03 && prog < 0.644;
        roadUniformsRef.current.uTravel.value = Math.max(0, prog - 0.03) * 34.0;
        roadUniformsRef.current.uOpacity.value = roadFadeIn * roadFadeOut;
        roadUniformsRef.current.uShadowOpacity.value = shadowFadeIn * shadowFadeOut;
        roadUniformsRef.current.uShadowOffsetX.value = tilt.x * 0.02;
      }

      // 2. Update 3D Coastal Depth Particles (fade in after opening cover -> fade down during white tunnel)
      if (particleMatRef.current) {
        const pIn = Math.min(1, Math.max(0, (prog - 0.04) / 0.10));
        const pOut = prog <= 0.625 ? 1 : Math.max(0, 1 - (prog - 0.625) / 0.035);
        particleMatRef.current.opacity = 0.58 * pIn * pOut;
      }

      // 3. Update 20% Light Barrier Gate
      if (lightBarrierRef.current) {
        const lb = lightBarrierRef.current;
        lb.group.visible = barrierBurst > 0.005;
        lb.veilMat.opacity = barrierBurst * 0.72;
        lb.outerRingMat.opacity = barrierBurst * 0.95;
        lb.innerRingMat.opacity = barrierBurst * 0.85;
        lb.light.intensity = barrierBurst * 14;
      }

      // 4. Update Pure-White 3D Light Tunnel Portals (61.5% -> 65.8%)
      whiteTunnelGatesRef.current.forEach((gate) => {
        const dist = (prog - gate.centerProgress) / 0.011;
        const gateIntensity =
          prog >= 0.614 && prog <= 0.660 ? Math.exp(-dist * dist) : 0;
        gate.group.visible = gateIntensity > 0.005;
        if (gate.group.visible) {
          gate.veilMat.opacity = gateIntensity * 0.92;
          gate.outerRingMat.opacity = gateIntensity * 0.85;
          gate.innerRingMat.opacity = gateIntensity * 0.72;
        }
      });

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      disposables.forEach((item) => item.dispose());
      if (container && rendererRef.current?.domElement) {
        container.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
    };
  }, []);

  // Fade out 3D depth/transition layer seamlessly as Roland Printer reaches full view (0.69 -> 0.74)
  const overlayOpacity = (() => {
    if (progress <= 0.69) return 1;
    if (progress <= 0.74) return 1 - (progress - 0.69) / (0.74 - 0.69);
    return 0;
  })();

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none select-none z-10"
      style={{ opacity: overlayOpacity }}
    />
  );
};
