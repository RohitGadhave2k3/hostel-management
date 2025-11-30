# FROM node:18-alpine

# WORKDIR /app
# COPY package.json package-lock.json ./

# # Prevent interactive prompts
# ENV CI=true

# RUN npm install

# COPY . .

# # Expose React dev server port
# EXPOSE 3000

# CMD ["npm", "start"]

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Vite runs on port 5173
EXPOSE 5173

# Required to allow external access
ENV HOST=0.0.0.0
ENV PORT=5173

CMD ["npm", "run", "dev"]
