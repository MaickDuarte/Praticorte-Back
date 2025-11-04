import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import agendamentoRoutes from "./routes/agendamentos.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) =>
  res.send({
    status: "ok",
    env: process.env.NODE_ENV || "development",
    firebaseProject: JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT).project_id,
  })
);

app.use("/api/agendamentos", agendamentoRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT} [${process.env.NODE_ENV}]`);
});
