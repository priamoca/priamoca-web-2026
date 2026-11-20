import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../utils/theme';

interface TunnelScene3DProps {
  progress: number; // 0.0 to 1.0
  tiltX: number;
  tiltY: number;
}

export const TunnelScene3D: React.FC<TunnelScene3DProps> = ({
  progress,
  tiltX,
  tiltY,
}) => {
  const { isDark } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const floorMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const colMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const ringsRef = useRef<THREE.Group[]>([]);
  const shardsRef = useRef<THREE.Mesh[]>([]);
  const glassParticlesRef = useRef<THREE.Points | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const popPanelsRef = useRef<THREE.Group[]>([]);
  const lightBarrierRef = useRef<{
    group: THREE.Group;
    veilMat: THREE.MeshBasicMaterial;
    outerRingMat: THREE.LineBasicMaterial;
    innerRingMat: THREE.LineBasicMaterial;
    light: THREE.PointLight;
  } | null>(null);
  const screenBarrierRef = useRef<{
    group: THREE.Group;
    veilMat: THREE.MeshBasicMaterial;
    outerRingMat: THREE.LineBasicMaterial;
    innerRingMat: THREE.LineBasicMaterial;
    light: THREE.PointLight;
  } | null>(null);
  const baseFovRef = useRef<number>(65);
  const progressRef = useRef(progress);
  const tiltRef = useRef({ x: tiltX, y: tiltY });

  progressRef.current = progress;
  tiltRef.current = { x: tiltX, y: tiltY };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL as per guidelines
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

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isDark ? 0x07090D : 0xFFFFFF);
    scene.fog = new THREE.FogExp2(isDark ? 0x07090D : 0xF8FAFC, 0.015);
    sceneRef.current = scene;

    const computeCameraFov = (w: number, h: number) => {
      const aspect = w / h;
      if (aspect < 1) {
        // Mobile portrait: widen vertical FOV so the horizontal frustum stays wide enough
        // to view the full pórticos rings and lateral gallery frames without cutting off
        return Math.min(84, Math.max(68, 65 / (aspect * 1.05)));
      }
      return 65;
    };

    const initialFov = computeCameraFov(width, height);
    baseFovRef.current = initialFov;
    const camera = new THREE.PerspectiveCamera(initialFov, width / height, 0.1, 300);
    camera.position.set(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(isDark ? 0x0B192E : 0xFFFFFF, isDark ? 2.0 : 2.4);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const pointLight = new THREE.PointLight(0x21E45B, 4.5, 60);
    pointLight.position.set(0, 0, -10);
    scene.add(pointLight);

    // 1. Build Geometric Architectural Tunnel Rings (Pórticos)
    const ringCount = 30;
    const ringSpacing = 4.5;
    const rings: THREE.Group[] = [];

    const frameShape = new THREE.Shape();
    // Octagonal / chamfered architectural portal shape inspired by Thundernet FITELVEN & Priamo Stand
    const w = 5.6;
    const h = 4.3;
    const c = 1.2;
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

    const colGeom = new THREE.BoxGeometry(0.18, 0.18, ringSpacing * 0.95);
    const sharedColMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x08172B : 0xCBD5E1,
      roughness: 0.25,
      metalness: isDark ? 0.85 : 0.45,
    });
    colMatRef.current = sharedColMat;

    for (let i = 0; i < ringCount; i++) {
      const ringGroup = new THREE.Group();
      const z = -i * ringSpacing - 5;
      ringGroup.position.set(0, 0, z);

      // Outer glowing neon frame alternating between Priamo green and electric blue
      const ringColor = i % 2 === 0 ? 0x21E45B : 0x00D2FF;
      const lineMat = new THREE.LineBasicMaterial({
        color: ringColor,
        linewidth: 2,
        transparent: true,
        opacity: 0.85,
      });
      const frameLine = new THREE.Line(frameGeom, lineMat);
      ringGroup.add(frameLine);

      // Inner structural columns and neon beams
      const colMat = sharedColMat;

      // Left & Right floor track guides
      const leftTrack = new THREE.Mesh(colGeom, colMat);
      leftTrack.position.set(-w * 0.85, -h * 0.95, ringSpacing * 0.5);
      ringGroup.add(leftTrack);

      const rightTrack = new THREE.Mesh(colGeom, colMat);
      rightTrack.position.set(w * 0.85, -h * 0.95, ringSpacing * 0.5);
      ringGroup.add(rightTrack);

      // Floor glossy neon strip
      const stripGeom = new THREE.PlaneGeometry(0.12, ringSpacing);
      const stripMat = new THREE.MeshBasicMaterial({
        color: ringColor,
        side: THREE.DoubleSide,
      });
      const leftNeonStrip = new THREE.Mesh(stripGeom, stripMat);
      leftNeonStrip.rotation.x = Math.PI / 2;
      leftNeonStrip.position.set(-w * 0.85, -h * 0.93, ringSpacing * 0.5);
      ringGroup.add(leftNeonStrip);

      const rightNeonStrip = new THREE.Mesh(stripGeom, stripMat.clone());
      rightNeonStrip.rotation.x = Math.PI / 2;
      rightNeonStrip.position.set(w * 0.85, -h * 0.93, ringSpacing * 0.5);
      ringGroup.add(rightNeonStrip);

      scene.add(ringGroup);
      rings.push(ringGroup);
    }
    ringsRef.current = rings;

    // 1b. Luminous Light Barrier Gate at z = -12 (crossed at ~20% progress)
    // Gives Priamito a cinematic flash and sensation of crossing a light portal into tunnel depth
    const lightBarrierGroup = new THREE.Group();
    lightBarrierGroup.position.set(0, 0, -12.0);

    const outerRingMat = new THREE.LineBasicMaterial({
      color: 0xaafff2,
      transparent: true,
      opacity: 0,
    });
    const outerRing = new THREE.Line(frameGeom, outerRingMat);
    outerRing.scale.set(0.98, 0.98, 1);
    lightBarrierGroup.add(outerRing);

    const innerRingMat = new THREE.LineBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0,
    });
    const innerRing = new THREE.Line(frameGeom, innerRingMat);
    innerRing.scale.set(0.78, 0.78, 1);
    lightBarrierGroup.add(innerRing);

    // Radial luminous veil texture
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
    const veilMat = new THREE.MeshBasicMaterial({
      map: veilTex,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const veilMesh = new THREE.Mesh(veilGeom, veilMat);
    lightBarrierGroup.add(veilMesh);

    const barrierLight = new THREE.PointLight(0x88fff0, 0, 35);
    barrierLight.position.set(0, 0, -11.5);
    scene.add(barrierLight);
    scene.add(lightBarrierGroup);

    lightBarrierRef.current = {
      group: lightBarrierGroup,
      veilMat,
      outerRingMat,
      innerRingMat,
      light: barrierLight,
    };

    // 1c. Subtle Screen-Threshold Light Barrier Gate at z = -75.5 (crossed around 63%-65.5%)
    const screenBarrierGroup = new THREE.Group();
    screenBarrierGroup.position.set(0, 0, -75.5);

    const screenOuterMat = new THREE.LineBasicMaterial({
      color: 0xaafff2,
      transparent: true,
      opacity: 0,
    });
    const screenOuterRing = new THREE.Line(frameGeom, screenOuterMat);
    screenOuterRing.scale.set(0.96, 0.96, 1);
    screenBarrierGroup.add(screenOuterRing);

    const screenInnerMat = new THREE.LineBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0,
    });
    const screenInnerRing = new THREE.Line(frameGeom, screenInnerMat);
    screenInnerRing.scale.set(0.76, 0.76, 1);
    screenBarrierGroup.add(screenInnerRing);

    const screenVeilMat = new THREE.MeshBasicMaterial({
      map: veilTex,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const screenVeilMesh = new THREE.Mesh(veilGeom, screenVeilMat);
    screenBarrierGroup.add(screenVeilMesh);

    const screenLight = new THREE.PointLight(0x88fff0, 0, 28);
    screenLight.position.set(0, 0, -75.0);
    scene.add(screenLight);
    scene.add(screenBarrierGroup);

    screenBarrierRef.current = {
      group: screenBarrierGroup,
      veilMat: screenVeilMat,
      outerRingMat: screenOuterMat,
      innerRingMat: screenInnerMat,
      light: screenLight,
    };

    // 2. Reflective Floor Plane
    const floorGeom = new THREE.PlaneGeometry(16, ringCount * ringSpacing);
    const floorMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x050C16 : 0xEDF2F7,
      roughness: isDark ? 0.15 : 0.35,
      metalness: isDark ? 0.9 : 0.25,
    });
    floorMatRef.current = floorMat;
    const floor = new THREE.Mesh(floorGeom, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -h, -(ringCount * ringSpacing) / 2);
    scene.add(floor);

    // 3. Floating Speed Particles / CMYK Ink Droplets
    const particleCount = 500;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cmykColors = [
      new THREE.Color(0x21E45B), // Green
      new THREE.Color(0x00D2FF), // Cyan
      new THREE.Color(0xFF007A), // Magenta
      new THREE.Color(0xFFD200), // Yellow
      new THREE.Color(0xFF6B00), // Orange
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = -Math.random() * (ringCount * ringSpacing);

      const col = cmykColors[i % cmykColors.length];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 4. Materials POP and Advertising Products of Priamo (Scenes 36% to 68%)
    // Luminous exhibition gallery frames showcasing the 8 real Priamo advertising projects
    const textureLoader = new THREE.TextureLoader();

    // Elegant fallback canvas texture generator ensuring frames are never pitch black
    const createExhibitionPlaceholder = (title: string, subtitle: string, accentHex: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 680;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // High-contrast exhibition dark glass gradient
        const bg = ctx.createLinearGradient(0, 0, 1024, 680);
        bg.addColorStop(0, '#0c1a2e');
        bg.addColorStop(0.5, '#071220');
        bg.addColorStop(1, '#030811');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, 1024, 680);

        // Grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let x = 0; x < 1024; x += 64) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, 680);
          ctx.stroke();
        }
        for (let y = 0; y < 680; y += 64) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(1024, y);
          ctx.stroke();
        }

        // Inner frame border
        ctx.strokeStyle = accentHex;
        ctx.lineWidth = 4;
        ctx.strokeRect(36, 36, 952, 608);

        // Header
        ctx.fillStyle = accentHex;
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('PRIAMO PUBLICIDAD • PROYECTO REAL', 64, 88);

        // Main Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 44px sans-serif';
        ctx.fillText(title, 64, 340);

        // Subtitle
        ctx.fillStyle = '#94a3b8';
        ctx.font = '500 24px sans-serif';
        ctx.fillText(subtitle, 64, 395);

        // Tag
        ctx.fillStyle = accentHex;
        ctx.font = 'bold 20px monospace';
        ctx.fillText('CALIDAD DE IMPRESIÓN ROLAND TrueVIS', 64, 600);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    // The 8 frames ordered starting with Thundernet Stand FITELVEN and sequentially as requested:
    const popProducts = [
      {
        title: 'Thundernet Stand FITELVEN',
        subtitle: 'Pabellón Tecnológico & Stand Inmersivo',
        src: '/assets/aistudio/Thundernet-Stand-FITELVEN-2025-2.jpg',
        z: -25,
        x: -3.5,
        side: -1,
      },
      {
        title: 'TRANSVALOR Rotulado',
        subtitle: 'Rotulación de Flota & Vinil Cast de Alta Definición',
        src: '/assets/aistudio/TRANSVALOR-Rotulado.jpg',
        z: -32,
        x: 3.5,
        side: 1,
      },
      {
        title: 'Agendas Personalizadas',
        subtitle: 'Merchandising & Artículos Corporativos Premium',
        src: '/assets/aistudio/Agendas-Personalizadas.jpg',
        z: -39,
        x: -3.5,
        side: -1,
      },
      {
        title: 'Forum PVC',
        subtitle: 'Avisos Corpóreos & Señalética Arquitectónica',
        src: '/assets/aistudio/Forum-PVC.jpg',
        z: -46,
        x: 3.5,
        side: 1,
      },
      {
        title: 'Conatel Agendas',
        subtitle: 'Material Institucional & Papelería Ejecutiva',
        src: '/assets/aistudio/Conatel-Agendas.jpg',
        z: -53,
        x: -3.5,
        side: -1,
      },
      {
        title: 'Venita Taza',
        subtitle: 'Artículos de Marca Sublimados & Regalos',
        src: '/assets/aistudio/Venita-Taza.jpg',
        z: -60,
        x: 3.5,
        side: 1,
      },
      {
        title: 'Priamo Llaveros',
        subtitle: 'Llaveros de Goma 3D Microinyección',
        src: '/assets/aistudio/Priamo-Llaveros.jpg',
        z: -67,
        x: -3.5,
        side: -1,
      },
      {
        title: 'Aviso Warairarepano',
        subtitle: 'Fachada & Aviso Corpóreo de Gran Formato',
        src: '/assets/aistudio/Aviso-Warairarepano.jpg',
        z: -74,
        x: 3.5,
        side: 1,
      },
    ];

    const popGroup = new THREE.Group();
    const popMeshes: THREE.Group[] = [];
    const isMobileView = width < 768 || width < height;

    popProducts.forEach((prod) => {
      const panelGroup = new THREE.Group();
      // On mobile screens, position panels at ±2.3 to stay within the camera frustum alongside Priamito
      const panelX = isMobileView ? prod.side * 2.3 : prod.x;
      panelGroup.position.set(panelX, 0, prod.z);
      panelGroup.rotation.y = prod.side === -1 
        ? (isMobileView ? 0.30 : 0.38) 
        : (isMobileView ? -0.30 : -0.38);

      const pGeom = isMobileView 
        ? new THREE.PlaneGeometry(1.95, 1.30) 
        : new THREE.PlaneGeometry(2.4, 1.6);
      const accentHex = prod.side === -1 ? 0x21E45B : 0x00D2FF;
      const accentStr = prod.side === -1 ? '#21E45B' : '#00D2FF';

      // Initializing with exhibition placeholder texture ensures frames are NEVER black
      const placeholderTex = createExhibitionPlaceholder(prod.title, prod.subtitle, accentStr);

      // Using MeshBasicMaterial so the cuadros are completely self-illuminated,
      // displaying the full vibrant color and rich detail of each photograph
      const pMat = new THREE.MeshBasicMaterial({
        map: placeholderTex,
        side: THREE.DoubleSide,
      });

      textureLoader.load(
        prod.src,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          pMat.map = tex;
          pMat.needsUpdate = true;
        },
        undefined,
        (err) => {
          console.warn('Could not load quadro texture:', prod.src, err);
        }
      );

      const pMesh = new THREE.Mesh(pGeom, pMat);
      panelGroup.add(pMesh);

      // Glowing Neon border frame
      const edgeGeom = new THREE.EdgesGeometry(pGeom);
      const edgeMat = new THREE.LineBasicMaterial({
        color: accentHex,
        linewidth: 2,
        transparent: true,
        opacity: 0.95,
      });
      const edgeLine = new THREE.LineSegments(edgeGeom, edgeMat);
      panelGroup.add(edgeLine);

      // Dark backing plate giving the frame real physical depth
      const backGeom = isMobileView 
        ? new THREE.BoxGeometry(2.0, 1.35, 0.05) 
        : new THREE.BoxGeometry(2.46, 1.66, 0.06);
      const backMat = new THREE.MeshStandardMaterial({
        color: 0x07111F,
        roughness: 0.3,
        metalness: 0.8,
      });
      const backMesh = new THREE.Mesh(backGeom, backMat);
      backMesh.position.z = -0.035;
      panelGroup.add(backMesh);

      popGroup.add(panelGroup);
      popMeshes.push(panelGroup);
    });

    scene.add(popGroup);
    popPanelsRef.current = popMeshes;

    // 5. Shatter Barrier Shards (Scene 06: Ruptura y Transformación)
    // Placed at the end of the tunnel (z ~ -82)
    const barrierZ = -82;
    const shardGroup = new THREE.Group();
    shardGroup.position.set(0, 0, barrierZ);
    scene.add(shardGroup);

    const shards: THREE.Mesh[] = [];
    const shardRows = 7;
    const shardCols = 9;
    const shardWidth = (w * 2) / shardCols;
    const shardHeight = (h * 2) / shardRows;

    for (let r = 0; r < shardRows; r++) {
      for (let c = 0; c < shardCols; c++) {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(shardWidth * 0.95, (Math.random() - 0.5) * shardHeight * 0.4);
        shape.lineTo(shardWidth * (0.8 + Math.random() * 0.2), shardHeight * 0.95);
        shape.lineTo((Math.random() - 0.5) * shardWidth * 0.3, shardHeight * 0.85);
        shape.closePath();

        const sGeom = new THREE.ShapeGeometry(shape);
        const col = cmykColors[(r + c) % cmykColors.length];
        const sMat = new THREE.MeshStandardMaterial({
          color: col,
          roughness: 0.2,
          metalness: 0.8,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.9,
        });

        const shard = new THREE.Mesh(sGeom, sMat);
        const posX = -w + c * shardWidth;
        const posY = -h + r * shardHeight;
        shard.position.set(posX, posY, 0);

        shard.userData = {
          origX: posX,
          origY: posY,
          origZ: 0,
          velX: (posX / w) * (2.6 + Math.random() * 3.2),
          velY: (posY / h) * (2.6 + Math.random() * 3.2),
          velZ: 3.2 + Math.random() * 5.8, // breaks forward toward camera (+Z)
          rotX: (Math.random() - 0.5) * 6,
          rotY: (Math.random() - 0.5) * 6,
          rotZ: (Math.random() - 0.5) * 6,
        };

        shardGroup.add(shard);
        shards.push(shard);
      }
    }
    shardsRef.current = shards;

    // 5b. Prismatic Glass Micro-Shards for Scene 06 Rupture Threshold
    const glassShardCount = 180;
    const glassGeom = new THREE.BufferGeometry();
    const glassPositions = new Float32Array(glassShardCount * 3);
    const glassVelocities = new Float32Array(glassShardCount * 3);
    const glassColors = new Float32Array(glassShardCount * 3);

    for (let i = 0; i < glassShardCount; i++) {
      glassPositions[i * 3] = (Math.random() - 0.5) * (w * 1.5);
      glassPositions[i * 3 + 1] = (Math.random() - 0.5) * (h * 1.5);
      glassPositions[i * 3 + 2] = barrierZ + (Math.random() - 0.5) * 2;

      const angle = Math.random() * Math.PI * 2;
      const speed = 3.5 + Math.random() * 7.5;
      glassVelocities[i * 3] = Math.cos(angle) * speed;
      glassVelocities[i * 3 + 1] = Math.sin(angle) * speed;
      glassVelocities[i * 3 + 2] = 4 + Math.random() * 11;

      const col = Math.random() > 0.4 ? new THREE.Color(0x21E45B) : new THREE.Color(0x00D2FF);
      glassColors[i * 3] = col.r;
      glassColors[i * 3 + 1] = col.g;
      glassColors[i * 3 + 2] = col.b;
    }

    glassGeom.setAttribute('position', new THREE.BufferAttribute(glassPositions, 3));
    glassGeom.setAttribute('color', new THREE.BufferAttribute(glassColors, 3));

    const glassMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const glassParticles = new THREE.Points(glassGeom, glassMat);
    scene.add(glassParticles);
    glassParticlesRef.current = glassParticles;

    const origGlassPositions = glassPositions.slice();

    // Resize handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      baseFovRef.current = computeCameraFov(w, h);
      cameraRef.current.aspect = w / h;
      cameraRef.current.fov = baseFovRef.current;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Render loop strictly driven by progressRef and tiltRef
    let frameId = 0;
    const render = () => {
      frameId = requestAnimationFrame(render);
      const prog = progressRef.current;
      const tilt = tiltRef.current;

      if (!cameraRef.current || !rendererRef.current || !sceneRef.current) return;

      // Camera Z progression through tunnel:
      // Starts smoothly at 0.14 when entering tunnel, and reaches barrier at 0.68 - 0.70
      const tunnelProgress = Math.min(1, Math.max(0, (prog - 0.14) / (0.70 - 0.14)));
      const targetZ = -tunnelProgress * 84;

      // Deterministic 20% luminous light-barrier depth burst (0.178 to 0.225, peak at 0.20)
      const barrierBurst =
        prog >= 0.178 && prog <= 0.225
          ? Math.exp(-Math.pow((prog - 0.20) / 0.010, 2))
          : 0;

      // Subtle screen-threshold barrier depth burst (0.626 to 0.658, centered ~0.638)
      const subtleScreenBurst =
        prog >= 0.626 && prog <= 0.658
          ? Math.exp(-Math.pow((prog - 0.638) / 0.0085, 2))
          : 0;

      cameraRef.current.position.z = targetZ;
      cameraRef.current.position.x = tilt.x * 0.85;
      cameraRef.current.position.y = tilt.y * 0.65;
      cameraRef.current.rotation.z = tilt.x * 0.05;

      // Smooth deterministic FOV depth warp without any camera shake
      const targetFov = baseFovRef.current + barrierBurst * 6.5 + subtleScreenBurst * 2.2;
      if (Math.abs(cameraRef.current.fov - targetFov) > 0.02) {
        cameraRef.current.fov = targetFov;
        cameraRef.current.updateProjectionMatrix();
      }

      // Update 3D Light Barrier Gate glow & opacity (20% — untouched)
      if (lightBarrierRef.current) {
        const lb = lightBarrierRef.current;
        lb.group.visible = barrierBurst > 0.005;
        lb.veilMat.opacity = barrierBurst * 0.72;
        lb.outerRingMat.opacity = barrierBurst * 0.95;
        lb.innerRingMat.opacity = barrierBurst * 0.85;
        lb.light.intensity = barrierBurst * 14;
      }

      // Update subtle 63% Screen-Threshold Barrier Gate
      if (screenBarrierRef.current) {
        const sb = screenBarrierRef.current;
        sb.group.visible = subtleScreenBurst > 0.005;
        sb.veilMat.opacity = subtleScreenBurst * 0.36;
        sb.outerRingMat.opacity = subtleScreenBurst * 0.52;
        sb.innerRingMat.opacity = subtleScreenBurst * 0.44;
        sb.light.intensity = subtleScreenBurst * 6.5;
      }

      // Animate POP Advertising Product Panels floating in perspective (36% to 68%)
      if (popPanelsRef.current.length > 0) {
        popPanelsRef.current.forEach((panel, i) => {
          panel.position.y = Math.sin(prog * 10 + i * 1.5) * 0.15;
        });
      }

      // Scene 05: Color evolution (0.38 to 0.60)
      // Tunnel rings transform into CMYK printing hues
      const cmykProgress = Math.min(1, Math.max(0, (prog - 0.38) / (0.60 - 0.38)));
      if (ringsRef.current.length > 0) {
        ringsRef.current.forEach((r, idx) => {
          const line = r.children[0] as THREE.Line;
          if (line && line.material) {
            const mat = line.material as THREE.LineBasicMaterial;
            if (cmykProgress > 0) {
              const colIdx = (idx + Math.floor(prog * 12)) % cmykColors.length;
              mat.color.lerp(cmykColors[colIdx], cmykProgress * 0.1);
            } else {
              mat.color.setHex(0x21E45B);
            }
          }
        });
      }

      // Scene 06: Screen Shatter Effect starting at 64%, breaking toward camera & dissolving progressively 65%->70%
      // Up to 62% remains strictly dormant (shatterProgress === 0)
      const shatterProgress = Math.min(1, Math.max(0, (prog - 0.638) / (0.70 - 0.638)));
      const shatterFadeOut = prog <= 0.65 ? 1 : Math.max(0, 1 - (prog - 0.65) / (0.70 - 0.65));
      if (shardsRef.current.length > 0) {
        shardsRef.current.forEach((s) => {
          const u = s.userData;
          if (shatterProgress > 0) {
            const spreadT = Math.pow(shatterProgress, 1.15);
            s.position.x = u.origX + u.velX * spreadT * 7.2;
            s.position.y = u.origY + u.velY * spreadT * 7.2;
            s.position.z = u.origZ + u.velZ * spreadT * 5.8;
            s.rotation.x = u.rotX * shatterProgress * 3.0;
            s.rotation.y = u.rotY * shatterProgress * 3.0;
            s.rotation.z = u.rotZ * shatterProgress * 3.0;
            // Smoothly transition into translucent shards around 64%-65%, then dissolve progressively 65%->70%
            const translucentBase = 0.9 - Math.min(1, shatterProgress * 4.5) * 0.44;
            (s.material as THREE.MeshStandardMaterial).opacity = translucentBase * shatterFadeOut;
          } else {
            s.position.set(u.origX, u.origY, u.origZ);
            s.rotation.set(0, 0, 0);
            (s.material as THREE.MeshStandardMaterial).opacity = 0.9;
          }
        });
      }

      // Translucent prismatic glass micro-shards: emerge 64%-65% toward camera, dissolve progressively 65%-70%
      if (glassParticlesRef.current) {
        const mat = glassParticlesRef.current.material as THREE.PointsMaterial;
        const geom = glassParticlesRef.current.geometry;
        const posAttr = geom.getAttribute('position') as THREE.BufferAttribute;

        if (shatterProgress > 0) {
          const burstEmerge = Math.min(1, (prog - 0.638) / (0.650 - 0.638));
          mat.opacity = burstEmerge * shatterFadeOut * 0.85;
          for (let i = 0; i < glassShardCount; i++) {
            posAttr.setXYZ(
              i,
              origGlassPositions[i * 3] + glassVelocities[i * 3] * shatterProgress * 2.8,
              origGlassPositions[i * 3 + 1] + glassVelocities[i * 3 + 1] * shatterProgress * 2.8,
              origGlassPositions[i * 3 + 2] + glassVelocities[i * 3 + 2] * shatterProgress * 2.8
            );
          }
          posAttr.needsUpdate = true;
        } else {
          mat.opacity = 0;
        }
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (container && rendererRef.current?.domElement) {
        container.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
    };
  }, []);

  // Synchronize 3D tunnel atmosphere (white vs dark) smoothly without tearing down WebGL context
  useEffect(() => {
    const scene = sceneRef.current;
    if (scene) {
      scene.background = new THREE.Color(isDark ? 0x07090D : 0xFFFFFF);
      scene.fog = new THREE.FogExp2(isDark ? 0x07090D : 0xF8FAFC, 0.015);
    }
    if (floorMatRef.current) {
      floorMatRef.current.color.setHex(isDark ? 0x050C16 : 0xEDF2F7);
      floorMatRef.current.roughness = isDark ? 0.15 : 0.35;
      floorMatRef.current.metalness = isDark ? 0.9 : 0.25;
      floorMatRef.current.needsUpdate = true;
    }
    if (colMatRef.current) {
      colMatRef.current.color.setHex(isDark ? 0x08172B : 0xCBD5E1);
      colMatRef.current.metalness = isDark ? 0.85 : 0.45;
      colMatRef.current.needsUpdate = true;
    }
    if (ambientLightRef.current) {
      ambientLightRef.current.color.setHex(isDark ? 0x0B192E : 0xFFFFFF);
      ambientLightRef.current.intensity = isDark ? 2.0 : 2.4;
    }
  }, [isDark]);

  // Compute tunnel overall opacity:
  // Starts fading in at 0.10, full by 0.16 through 0.69, fades out into plotter at 0.74
  const tunnelOpacity = (() => {
    if (progress < 0.10) return 0;
    if (progress < 0.16) return (progress - 0.10) / (0.16 - 0.10);
    if (progress <= 0.69) return 1;
    if (progress <= 0.74) return 1 - (progress - 0.69) / (0.74 - 0.69);
    return 0;
  })();

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none select-none transition-opacity duration-150 z-10"
      style={{ opacity: tunnelOpacity }}
    />
  );
};
