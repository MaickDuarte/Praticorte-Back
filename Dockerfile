# Etapa base
FROM node:22

# Diretório de trabalho
WORKDIR /usr/src/app

# Copia arquivos
COPY package*.json ./
RUN npm install --production

COPY . .

# Porta esperada pelo Cloud Run
ENV PORT=8080
EXPOSE 8080

# Comando de inicialização
CMD ["node", "src/index.js"]
