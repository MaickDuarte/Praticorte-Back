import { execSync } from "child_process";

console.log("🚀 Iniciando deploy para Google Cloud Run...");

try {
  const command = `gcloud run deploy praticorte-api --source . --region southamerica-east1 --allow-unauthenticated --env-vars-file=env.yaml`;
  console.log("🧱 Executando:");
  console.log(command);

  execSync(command, { stdio: "inherit" });
  console.log("✅ Deploy concluído com sucesso!");
} catch (err) {
  console.error("❌ Erro no deploy:", err.message);
  process.exit(1);
}
