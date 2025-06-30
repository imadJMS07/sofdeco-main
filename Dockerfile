# Build stage
FROM node:20.11.0-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20.11.0-alpine AS production

WORKDIR /app
RUN npm install -g serve

# Copy only the build output
COPY --from=build /app/dist ./dist

EXPOSE 5173
CMD ["npm", "run", "dev"]