# Guía de Despliegue en Cloudflare Pages — PRIAMO Publicidad

Este proyecto está configurado como una **SPA estática (Vite + React + TypeScript + Three.js)** lista para **Cloudflare Pages** sin necesidad de servidor Node/Express ni Cloudflare Functions.

---

## Fase 1 · Despliegue de prueba gratuito (`*.pages.dev`) — Disponible ahora

### 1. Subir el código a GitHub
1. Crea un repositorio privado o público en GitHub (ej. `priamo-publicidad-web`).
2. Desde la raíz del proyecto descargado/exportado, inicializa Git y sube los archivos:
   ```bash
   git init
   git add .
   git commit -m "Preparar web Priamo Publicidad para Cloudflare Pages"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/priamo-publicidad-web.git
   git push -u origin main
   ```

### 2. Conectar GitHub con Cloudflare Pages
1. Entra a [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Selecciona tu repositorio `priamo-publicidad-web`.
3. Configura los parámetros de compilación exactamente así:
   - **Production branch:** `main`
   - **Framework preset:** `Vite` (o `None`)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables (opcional):** `NODE_VERSION` = `22`
   - *No se requieren claves secretas ni variables `GEMINI_API_KEY` en Cloudflare.*
4. Haz clic en **Save and Deploy**.
5. En ~1–2 minutos Cloudflare publicará la versión de prueba en una URL gratuita del tipo:
   `https://priamo-publicidad-web.pages.dev`

### 3. Qué comprobar en la URL `.pages.dev`
- Carga inicial en modo claro y funcionamiento del switch Claro/Oscuro.
- Escena inicial con la laptop, recorrido 3D de Priamito, plotter Roland TrueVIS y cierre.
- Navegación directa y recarga (`F5`) en `/servicios`, `/contacto`, `/info` y sus subrutas (garantizada automáticamente por el modo SPA de Cloudflare Pages al no existir `404.html` ni reglas `_redirects` hacia `/index.html`).
- Visualización del favicon oficial en la pestaña y en móvil.
- Botón flotante de WhatsApp y botones de cotización (`mailto:` / `wa.me`).

---

## Fase 2 · Conectar el dominio definitivo (`priamoca.com.ve`) — Cuando lo compres en NIC.ve

> **Nota:** No agregues estos registros antes de haber pagado y activado `priamoca.com.ve` en NIC.ve.

### Paso 1 · Registrar `priamoca.com.ve` en Cloudflare DNS
1. En el panel principal de Cloudflare, haz clic en **Add a domain / Agregar un sitio**.
2. Escribe `priamoca.com.ve` y elige el **plan Free ($0)**.
3. Cloudflare generará **2 Nameservers (NS)** exclusivos para tu cuenta (por ejemplo: `nombre1.ns.cloudflare.com` y `nombre2.ns.cloudflare.com`).

### Paso 2 · Cambiar los Nameservers en NIC.ve
1. Ingresa al portal oficial de [nic.ve](https://nic.ve/) con la cuenta titular o contacto autorizado.
2. Ve a **Mis Dominios** → `priamoca.com.ve` → **Administración de DNS / Gestionar NameServers**.
3. Reemplaza los servidores actuales por los **2 Nameservers** entregados por Cloudflare y guarda.
4. Confirma el cambio introduciendo el código de verificación temporal que NIC.ve envía al correo electrónico autorizado.
5. Espera la propagación DNS (normalmente de **2 a 24 horas**). Cloudflare te avisará cuando el dominio quede **Active**.

### Paso 3 · Conectar el dominio a tu proyecto en Cloudflare Pages
1. Ve a **Workers & Pages** → tu proyecto → pestaña **Custom domains** → **Set up a custom domain**.
2. Agrega **`priamoca.com.ve`** (Cloudflare creará automáticamente el registro `CNAME` en tu zona DNS).
3. Repite el proceso agregando **`www.priamoca.com.ve`**.

### Paso 4 · SSL/HTTPS y redirección al dominio principal
1. En Cloudflare Dashboard (dentro de la zona `priamoca.com.ve`) → **SSL/TLS** → **Overview**:
   - Selecciona el modo **Full (strict)**.
2. En **SSL/TLS** → **Edge Certificates**:
   - Activa **Always Use HTTPS** (fuerza `http://` → `https://`).
   - Activa **Automatic HTTPS Rewrites**.
3. **Redirección canónica (ej. `www.priamoca.com.ve` → `https://priamoca.com.ve`):**
   - Ve a **Rules** → **Redirect Rules** → **Create rule**:
     - **Rule name:** `Redirect www to apex`
     - **When incoming requests match:** Custom filter → `Hostname` `equals` `www.priamoca.com.ve`
     - **Then:** Type `Dynamic` → Expression: `concat("https://priamoca.com.ve", http.request.uri.path)`
     - **Status code:** `301` (Permanente) y marca **Preserve query string**.

### Paso 5 · Ajustes finales recomendados tras activar el dominio
- En `src/data/companyData.ts`, actualizar `website` a `'www.priamoca.com.ve'` (o `'priamoca.com.ve'`) cuando el dominio esté operativo.
- Actualizar `"url"` en el bloque JSON-LD y `<meta property="og:url">` si se desea fijar la URL canónica definitiva, y volver a hacer push a `main` para redesplegar automáticamente.
