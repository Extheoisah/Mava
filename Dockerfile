# Build stage
FROM node:18-alpine AS BUILD_IMAGE
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=BUILD_IMAGE /app/build /app/build
COPY --from=BUILD_IMAGE /app/node_modules /app/node_modules
EXPOSE 8000
CMD [ "node", "index.ts" ]
