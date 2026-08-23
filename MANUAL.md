# MENTA — Manual for dummies

Guía paso a paso para crear, arrancar y subir esta PWA. Escrita para alguien que abre Cursor (o Visual Studio Code) por primera vez.

Si tienes prisa: **esta carpeta ya es el frontend**. Lo que tienes que hacer ahora es instalar dependencias, verla en el navegador y (cuando quieras) subirla a GitHub. Los comandos exactos están más abajo.

---

## 0. La pregunta importante: ¿dos repos? ¿front primero?

**Sí: dos repositorios de GitHub es lo correcto para Menta.**  
No pongas el backend dentro de `MENTA_FRONT`. Deja dos carpetas hermanas:

```text
3.MENTA/
  MENTA_FRONT/     ← este proyecto (React + Vite + PWA)  → repo GitHub 1 → Vercel o Netlify
  MENTA_API/       ← lo crearemos después (API + PostgreSQL) → repo GitHub 2 → Railway o Render
```

### Por qué dos repos (y no uno solo)

Menta tiene **dos programas distintos**:

1. Lo que ve el paciente y la psicóloga en el móvil/ordenador (**frontend**).
2. El servidor que guarda pacientes, diarios, citas y facturas (**backend / API**).

Van a vivir en sitios distintos (Vercel/Netlify el front, Railway/Render el back). Cada uno se despliega por separado. Dos repos encajan con eso.

Un **monorepo** (un solo GitHub con carpetas `/front` y `/api`) también funciona, y a veces es más cómodo para una sola persona. Para Menta, con el diagrama que ya tienes, **dos repos es más limpio**.

### Cómo lo haría yo (orden realista)

No construyas la API el primer día. El orden sano es:

1. **PWA en React + Vite** con pantallas reales y **datos de mentira (mock)**. Así ves login, diario, agenda, ficha, facturación y ejercicios **sin servidor**.
2. Subir **solo el front** a GitHub.
3. Cuando las pantallas ya no cambien cada hora, diseñar la API (qué guarda PostgreSQL).
4. Crear `MENTA_API` en **otra carpeta**, otro repo.
5. Sustituir los mocks por llamadas `fetch` a esa API.
6. Publicar: front en Vercel/Netlify, API + PostgreSQL en Railway/Render.

Eso es exactamente tu plan 1 → 2 → 3, con un matiz: **el front debe funcionar antes de que exista el back**. Ya está hecho así.

---

## 1. Qué es una PWA (en una frase)

Una **Progressive Web App** es una web que se puede **instalar en el móvil** (como una app), funciona en el navegador y, si la configuras bien, puede usarse aunque la red falle un rato. No hace falta publicarla en App Store ni Google Play para una primera versión.

Menta usa:

- **React**: librería para pintar pantallas.
- **Vite**: herramienta que arranca el proyecto en local y lo empaqueta para producción.
- **vite-plugin-pwa**: añade el “manifiesto” y el service worker (lo que permite instalarla).

---

## 2. Qué tienes que tener instalado (una sola vez)

Haz esto en Windows **antes** de tocar código.

### A) Node.js (incluye `npm`)

1. Entra en [https://nodejs.org](https://nodejs.org).
2. Descarga la versión **LTS**.
3. Instálala con “Next” hasta el final.
4. Cierra y abre Cursor / VS Code (importante: si no, no ve el comando `node`).

Comprueba en una terminal:

```powershell
node -v
npm -v
```

Tiene que salir un número (por ejemplo `v22.x` y `11.x`). Si dice que no reconoce el comando, Node no está en el PATH: reinstálalo y reinicia el editor.

### B) Git

1. [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Instalación típica. Déjalo marcar “Git from the command line”.

```powershell
git --version
```

### C) Cuenta de GitHub

Crea cuenta en [https://github.com](https://github.com) si no tienes.

Opcional pero cómodo: instala [GitHub CLI](https://cli.github.com/) (`gh`) para crear el repo desde la terminal.

### D) Editor

Puedes usar **Cursor** (este) o **Visual Studio Code**. Los comandos son los mismos: se escriben en la **Terminal**.

En Cursor: menú **Terminal → New Terminal**. Debe poner algo como:

```text
PS C:\Users\...\MENTA_FRONT>
```

Si no estás en `MENTA_FRONT`, entra:

```powershell
cd "C:\Users\mcaro\OneDrive\Documentos\2.PERSONALES\6.React\3.MENTA\MENTA_FRONT"
```

---

## 3. Crear la PWA con React y Vite

### Si partes de esta carpeta (recomendado)

**Ya está creada.** No ejecutes `npm create vite` otra vez o duplicarás archivos.

Solo instala librerías y arranca:

```powershell
npm install
npm run dev
```

Vite te dirá una URL, casi siempre:

```text
http://localhost:5173
```

Ábrela en Chrome. Eso es Menta en local.

### Si algún día partes de una carpeta vacía (receta)

Estos son los comandos que se usan **desde cero**. No los necesitas ahora; están para que sepas qué significa cada pieza.

```powershell
mkdir MENTA_FRONT
cd MENTA_FRONT
npm create vite@latest . -- --template react-ts
npm install
npm install react-router-dom
npm install -D @vitejs/plugin-react vite-plugin-pwa
```

Qué hace cada uno:

| Comando | Para qué |
| --- | --- |
| `npm create vite@latest . -- --template react-ts` | Crea un proyecto React con TypeScript usando Vite. El `.` significa “en esta carpeta”. |
| `npm install` | Descarga las librerías a `node_modules` (esa carpeta **no** se sube a GitHub). |
| `react-router-dom` | Varias pantallas (login, diario, agenda…) con URLs distintas. |
| `vite-plugin-pwa` | Convierte la web en instalable (PWA). |

Luego se edita `vite.config.ts` para el manifiesto (nombre Menta, colores, iconos) y `index.html` para el idioma `es` y las fuentes Outfit + Inter.

---

## 4. Cómo se trabaja día a día en Cursor / VS Code

1. Abre la carpeta `MENTA_FRONT` (File → Open Folder).
2. Terminal nueva.
3. `npm run dev`.
4. Deja esa terminal abierta. Cada vez que guardes un archivo, el navegador se actualiza solo.
5. Para parar el servidor: en la terminal, `Ctrl + C`.

Otros comandos útiles:

```powershell
npm run build      # Emppaqueta la app para producción (carpeta dist/)
npm run preview    # Sirve esa carpeta dist como si ya estuviera publicada
```

**La PWA de verdad (icono de “Instalar”, funcionar sin red) se prueba con `build` + `preview`**, no siempre con `dev`. En desarrollo el plugin a veces no registra el service worker igual que en producción.

```powershell
npm run build
npm run preview
```

Abre la URL que salga (suele ser `http://localhost:4173`). En Chrome: menú ⋮ → **Instalar Menta** (o el icono de instalación en la barra).

---

## 5. Qué hay ya en esta app (para que no te pierdas)

Identidad visual según tu diseño:

- Verde fresco `#A3E4D7`
- Terracota `#EDBB99`
- Blanco clínico `#F8F9F9`
- Gris piedra `#5D6D7E`
- Títulos: Outfit. Texto: Inter.

**Aún no hay backend.** Login, diario, facturas y ejercicios se guardan en el **navegador** (`localStorage`). Si borras datos del sitio, se resetea.

Cuentas de prueba en la pantalla de login:

| Quién | Email | Contraseña | A dónde entra |
| --- | --- | --- | --- |
| Psicóloga | `psicologa@menta.app` | `menta123` | Portal clínico |
| Paciente | `lucia@menta.app` | `menta123` | Diario emocional |

Registro: solo pacientes, y **deben elegir psicóloga**. La psicóloga no se auto-registra en esta primera versión (se da de alta “desde Menta”, como en una clínica real).

Mapa de pantallas:

```text
/                      Login
/registro              Alta de paciente + elegir psicóloga

/psicologa             Gestión clínica (dashboard)
/psicologa/pacientes   Lista + ficha clínica
/psicologa/agenda      Citas: WhatsApp si online, dirección si presencial
/psicologa/documentos  Informes / tests (lista de prueba)
/psicologa/facturacion Pagado / pendiente (sin pasarela)
/psicologa/ejercicios  Crear y asignar: texto, test, formulario, emoción

/app                   Diario emocional del paciente
/app/ejercicios        Lo que le asignaron
/app/agenda            Sus citas + WhatsApp
/app/perfil            Ficha básica
```

Archivos clave:

```text
vite.config.ts              PWA (manifiesto + service worker)
src/main.tsx                Arranque + registro PWA
src/App.tsx                 Rutas
src/styles/tokens.css       Colores de marca
src/auth/AuthContext.tsx    Login / registro (mock)
src/data/ClinicContext.tsx  Diario, citas, facturas (mock)
src/data/mock.ts            Pacientes y citas de ejemplo
.env.example                Aquí irá la URL de la API el día que exista
```

Cuando exista `MENTA_API`, pondrás en un archivo `.env`:

```env
VITE_API_URL=https://tu-api.up.railway.app
```

Hasta entonces déjalo vacío. **No subas `.env` a GitHub.**

---

## 6. Subir el FRONT a GitHub

Hazlo cuando hayas visto la app en `localhost` y te funcione el login.

### Paso A — Inicializar Git (si aún no hay repo)

En la terminal, **dentro de `MENTA_FRONT`**:

```powershell
git status
```

Si dice “not a git repository”:

```powershell
git init
git add .
git commit -m "Primera versión de la PWA Menta (React + Vite)"
```

`git add .` prepara todos los archivos **excepto** los de `.gitignore` (`node_modules`, `dist`, `.env`).

### Paso B — Crear el repositorio en GitHub (web, for dummies)

1. Entra en GitHub → **New repository**.
2. Nombre: `menta-front` (o `MENTA_FRONT`).
3. **Private** (recomendado: hay datos clínicos de prueba y más adelante será salud).
4. **No** marques “Add a README” (ya tienes uno).
5. Create repository.

GitHub te mostrará comandos. Copia la URL. Ejemplo:

```text
https://github.com/TU_USUARIO/menta-front.git
```

En la terminal:

```powershell
git branch -M main
git remote add origin https://github.com/TU_USUARIO/menta-front.git
git push -u origin main
```

Te pedirá login de GitHub. Si falla, usa GitHub Desktop o un Personal Access Token.

### Paso B (alternativa) — Con GitHub CLI

```powershell
gh auth login
gh repo create menta-front --private --source=. --remote=origin --push
```

### Qué no subir nunca

- `node_modules/`
- `.env` (contraseñas, URLs secretas)
- Datos reales de pacientes

---

## 7. El backend: otro repo, otra carpeta, más adelante

**No lo crees todavía** si estás aprendiendo el front. Cuando toque:

```powershell
cd "C:\Users\mcaro\OneDrive\Documentos\2.PERSONALES\6.React\3.MENTA"
mkdir MENTA_API
cd MENTA_API
```

Ahí irá, en un **segundo** GitHub (`menta-api`), algo como:

- Node.js + Express o Fastify (mismo lenguaje que el front), **o** Python FastAPI.
- PostgreSQL (pacientes, respuestas, citas, facturas).
- Autenticación de verdad (JWT o sesiones).
- Railway o Render: API + base de datos.

Recomendación para Menta: **Node + TypeScript + PostgreSQL**, para no cambiar de idioma. Eso se documentará en el README de `MENTA_API` cuando lo arranquemos.

El front hablará con el back así (idea, no lo copies aún):

```text
Navegador  →  https://menta.vercel.app     (esta PWA)
                 ↓ fetch
              https://menta-api.up.railway.app/api/...
                 ↓
              PostgreSQL
```

GitHub se conecta a **los dos** con líneas de puntos, como en tu diagrama: el código vive en GitHub; Vercel y Railway lo publican.

---

## 8. Publicar el front (cuando el repo ya exista)

Esto es el paso *después* de GitHub, no hace falta el primer día.

1. Cuenta en [Vercel](https://vercel.com) (encaja muy bien con Vite).
2. Import GitHub → elige `menta-front`.
3. Framework: Vite. Build: `npm run build`. Output: `dist`.
4. Deploy.

Netlify es igual de válido. Elige **uno**.

Hasta que exista la API, la web publicada seguirá usando datos mock del navegador de cada usuario (no se comparten entre móviles). Eso es normal.

---

## 9. Problemas frecuentes

**`npm` no se reconoce**  
Cierra Cursor, reinstala Node LTS, ábrelo otra vez.

**El puerto 5173 está ocupado**  
Vite ofrecerá 5174. O cierra la otra terminal que ya tenía `npm run dev`.

**No veo “Instalar app”**  
Usa `npm run build` y `npm run preview` en Chrome. En HTTP local a veces Chrome es más estricto; en `localhost` debería dejar.

**Cambié código y no pasa nada**  
Confirma que `npm run dev` sigue corriendo y que guardaste el archivo.

**Quiero resetear datos de prueba**  
En Chrome: F12 → Application → Local Storage → borra las claves que empiezan por `menta-`.

**OneDrive y `node_modules`**  
A veces OneDrive sincroniza `node_modules` y pone el PC lento. Si te pasa, mueve el proyecto fuera de OneDrive o ignora esa carpeta en OneDrive.

---

## 10. Mini glosario

| Palabra | Significado humano |
| --- | --- |
| Repo / repositorio | La carpeta del proyecto en GitHub. |
| Frontend | Lo que se ve. |
| Backend / API | El servidor que guarda y sirve datos. |
| Mock | Datos de mentira para diseñar sin API. |
| PWA | Web instalable. |
| `npm run dev` | Arrancar en tu ordenador. |
| Deploy | Publicar en internet. |
| PostgreSQL | Base de datos. |
| Service worker | Script que permite caché e instalación PWA. |

---

## 11. Checklist de esta fase

- [ ] Node, Git y GitHub listos
- [ ] `npm install` y `npm run dev` en `MENTA_FRONT`
- [ ] Login psicóloga → ves gestión clínica
- [ ] Login paciente → ves diario
- [ ] Registro de paciente eligiendo psicóloga
- [ ] `npm run build` sin errores
- [ ] Repo GitHub **solo del front**
- [ ] (Después) carpeta nueva `MENTA_API` y **otro** repo

Cuando termines el checklist, el siguiente capítulo no es “más pantallas al azar”: es **decidir el modelo de datos** (paciente, cita, diario, ejercicio, factura) y entonces sí, el API.
