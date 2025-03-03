# Build the frontend
FROM node:20 AS build

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV VITE_BACKEND_URL="http://localhost:3000/"

RUN npm run build

# Run the tests
FROM build AS test

RUN npm run test

# Serve the frontend
FROM nginx:1.25-alpine AS production

COPY --from=build /usr/src/app/dist /usr/share/nginx/html