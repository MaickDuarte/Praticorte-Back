import express from "express";
import cors from "cors";
import agendamentoRoutes from "./routes/agendamentos.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/agendamentos", agendamentoRoutes);

app.get("/", (req, res) => {
  res.send("Praticorte Backend ON");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
