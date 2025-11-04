import express from "express";
import cors from "cors";
import appointmentRoutes from "./routes/appointment.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Suas rotas
app.use("/api/agendamentos", appointmentRoutes);

// Pega a porta vinda do Cloud Run
const PORT = process.env.PORT || 8080;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT} [${process.env.NODE_ENV}]`);
});
