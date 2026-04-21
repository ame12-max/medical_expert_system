FROM node:20-slim

# Install SWI-Prolog
RUN apt-get update && apt-get install -y swi-prolog && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]