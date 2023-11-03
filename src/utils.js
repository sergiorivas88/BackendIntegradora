import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

// Obtener la ruta del directorio actual del módulo
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// Clase para manejar excepciones personalizadas
export class Exception extends Error {
  constructor(message, status) {
    super(message);
    this.statusCode = status;
  }
}

// Configuración de Multer para la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/avatars');
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

// Configuración de Multer como middleware para subir archivos
export const uploader = multer({ storage });
