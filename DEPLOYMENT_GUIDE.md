# Guía de Deploy - Trigger.dev en Producción

## 📋 Resumen
Esta guía te ayudará a desplegar tu task de scraping con Trigger.dev a producción.

---

## 🔑 1. Configurar Variables de Entorno

### En tu plataforma de hosting (Vercel, Railway, etc.)

Agrega estas variables de entorno:

```bash
# Trigger.dev - PRODUCCIÓN (key diferente a dev!)
TRIGGER_SECRET_KEY=tr_prod_XXXXXXXXXX

# Supabase (si no las tienes ya)
NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key

# Gemini API (si la usas)
GEMINI_API_KEY=tu_gemini_key
```

### ¿Dónde obtener TRIGGER_SECRET_KEY de producción?

1. Ve a [https://cloud.trigger.dev](https://cloud.trigger.dev)
2. Selecciona tu proyecto: `proj_jswscfxqotzywgciawyj`
3. Settings → API Keys
4. Copia la clave de **Production** (empieza con `tr_prod_`)

⚠️ **IMPORTANTE**: La key de dev (`tr_dev_`) NO funciona en producción.

---

## 🚀 2. Deploy de la Task a Trigger.dev

Ejecuta este comando en tu terminal:

```bash
npx trigger.dev@latest deploy
```

Esto subirá tu código de `trigger/` a los servidores de Trigger.dev.

Durante el deploy:
- Se empaquetará tu task
- Se instalará Playwright y sus dependencias
- Se creará una nueva versión en producción

---

## 🔧 3. Configuración de Playwright

Ya está configurado en tu código con:

### En `trigger/scrape-hermes.ts`:
- Args de Chromium para contenedores (`--no-sandbox`, etc.)
- Modo headless habilitado
- Machine type `small-1x` (puedes cambiar a `medium-1x` si necesitas más recursos)

### En `trigger.config.ts`:
- External: `playwright` y `playwright-core`
- Machine type: `small-1x`

---

## 📦 4. Deploy de tu Aplicación Next.js

### Si usas Vercel:

```bash
# Asegúrate de que las variables de entorno estén configuradas
vercel --prod
```

### Si usas otra plataforma:

1. Configura las variables de entorno en tu plataforma
2. Haz push a tu repo
3. El deploy se hará automáticamente

---

## ✅ 5. Verificación

### Verifica que todo funcione:

1. **Verifica el deploy de Trigger.dev:**
   ```bash
   npx trigger.dev@latest list
   ```

2. **Prueba tu endpoint:**
   ```bash
   curl -X POST https://tu-dominio.com/api/scrape \
     -H "Content-Type: application/json" \
     -d '{"searchTerm": "geografia"}'
   ```

3. **Monitorea en el dashboard:**
   - Ve a [https://cloud.trigger.dev](https://cloud.trigger.dev)
   - Selecciona tu proyecto
   - Revisa la pestaña "Runs" para ver las ejecuciones

---

## 🐛 Troubleshooting

### Error: "TRIGGER_SECRET_KEY not configured"
- Verifica que agregaste la variable en tu plataforma de hosting
- Asegúrate de usar la key de **producción** (`tr_prod_`)
- Redeploya tu aplicación después de agregar la variable

### Error: "Playwright browser not found"
- Verifica que el deploy de Trigger.dev se completó exitosamente
- Prueba con una máquina más grande: `machine: "medium-1x"`

### Task no se ejecuta
- Verifica que hiciste `npx trigger.dev@latest deploy`
- Revisa los logs en el dashboard de Trigger.dev
- Verifica que el task ID sea correcto: `"scrape-hermes"`

---

## 📊 Monitoreo

### En el Dashboard de Trigger.dev puedes ver:
- ✅ Ejecuciones exitosas
- ❌ Errores y stack traces
- ⏱️ Tiempos de ejecución
- 📈 Uso de recursos

### Logs en tu aplicación Next.js:
- Verifica los logs de tu plataforma de hosting
- Los errores de triggering aparecerán en los logs del API route

---

## 💰 Consideraciones de Costos

### Trigger.dev:
- Free tier: 50,000 task runs/mes
- Tasks con Playwright pueden usar más recursos
- Considera usar `small-1x` para menor costo

### Playwright:
- Cada ejecución usa memoria y CPU
- Screenshots aumentan el tiempo de ejecución
- Considera limitar la cantidad de datos extraídos

---

## 🔄 Actualizaciones Futuras

Cuando hagas cambios en tu task:

1. Haz los cambios en `trigger/scrape-hermes.ts`
2. Ejecuta: `npx trigger.dev@latest deploy`
3. Redeploya tu aplicación Next.js (si cambiaste el API route)

---

## 📚 Recursos

- [Trigger.dev Docs](https://trigger.dev/docs)
- [Playwright in Docker](https://playwright.dev/docs/docker)
- [Dashboard de Trigger.dev](https://cloud.trigger.dev)

---

## ✨ Resumen de Comandos

```bash
# 1. Deploy de la task a Trigger.dev
npx trigger.dev@latest deploy

# 2. Verificar tasks desplegadas
npx trigger.dev@latest list

# 3. Deploy de tu aplicación Next.js (Vercel)
vercel --prod

# 4. Ver logs en tiempo real
npx trigger.dev@latest logs
```
