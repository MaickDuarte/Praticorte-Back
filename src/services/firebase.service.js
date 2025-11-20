import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho da chave
const serviceAccountPath = path.join(__dirname, "..", "firebase-key.json");

// Inicializa o Firebase somente uma vez
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
    });
}

const db = admin.firestore();

export { db, admin };
