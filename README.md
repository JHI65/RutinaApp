# Mesa de rutina

App del sistema de rutina por modos (completo / reducido / negra) para técnico de sonido autónomo.
Funciona sin conexión y guarda el historial en el propio dispositivo.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La app entera |
| `manifest.json` | Datos para instalarla en la pantalla de inicio |
| `sw.js` | Service worker: hace que funcione sin cobertura |
| `icono.svg`, `icono-512.png` | Iconos |

## Publicar en GitHub Pages

1. Crea el repositorio `JHI65` en GitHub (público, si no tienes cuenta de pago: las Pages de repos privados requieren plan Pro).
2. Sube los cinco archivos a la raíz del repositorio. Desde la web: **Add file → Upload files → Commit**.
3. **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `root` → Save**.
4. En un par de minutos queda en `https://TU-USUARIO.github.io/JHI65/`.

Desde la línea de comandos:

```bash
git init
git add .
git commit -m "Mesa de rutina"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/JHI65.git
git push -u origin main
```

## Instalar en el móvil

- **iPhone:** abre la URL en Safari → Compartir → *Añadir a pantalla de inicio*.
- **Android:** Chrome → menú → *Instalar aplicación*.

Instalarla importa: en iOS, los datos de una web que solo se visita en el navegador
pueden borrarse tras semanas sin abrirla. Instalada en la pantalla de inicio, no.

## Historial

Tres capas, de menos a más:

1. **Navegador.** Todo se guarda al momento en este dispositivo. Además se conservan
   automáticamente las copias de los últimos 10 días con actividad.
2. **Descargar copia.** Pestaña *Calendario* → *Descargar copia*. Genera un `.json`.
   *Restaurar copia* lo vuelve a meter, uniéndolo con lo que ya haya: los problemas
   anotados no se pierden nunca, y en el calendario manda la versión más reciente.
3. **Sincronizar con GitHub.** Guarda el historial en un gist privado de tu cuenta,
   para abrirlo desde el móvil y el portátil con los mismos datos.

### Configurar la sincronización

1. GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. Caducidad la que quieras. En **Account permissions**, pon **Gists: Read and write**.
   No le des ningún otro permiso, y ninguno de repositorio.
3. Copia el token, pégalo en la app (*Calendario → Sincronizar con GitHub*) y pulsa **Conectar**.
   La primera vez crea el gist solo; el ID aparece en el campo de al lado.
4. En el segundo dispositivo, pega el mismo token **y** el ID del gist.

El token se queda en el almacenamiento de ese navegador y no se sube al repositorio.
Aun así, si pierdes el móvil, revoca el token desde GitHub. Como solo tiene permiso de
gists, no da acceso a tu código.
