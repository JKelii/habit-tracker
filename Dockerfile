FROM node:23.11.0-slim AS builder


RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app


COPY package*.json ./
COPY prisma ./prisma

RUN npm install


COPY . .

RUN npm run build

FROM node:23.11.0-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "start"]
