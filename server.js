import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuraciones necesarias para usar ES Modules (__dirname no existe por defecto en modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Cloud Run inyecta el puerto dinámicamente en process.env.PORT (usualmente 8080)
const port = 3000;

// ¡LA MAGIA OCURRE AQUÍ! Habilitamos CORS para permitir que tu Dashboard descargue el JS
app.use(cors({
  origin: '*' // O puedes poner específicamente 'https://app.autocargapelusqui.com' para mayor seguridad
}));

// Servimos la carpeta "dist" que generó Vite
app.use(express.static(path.join(__dirname, 'dist')));

// Cualquier otra ruta la redirigimos al index (buena práctica por si lo abren directo)
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor del Titlebar ejecutándose en el puerto ${port}`);
});
