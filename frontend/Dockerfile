FROM node:18-alpine AS builder
ENV NODE_ENV production

WORKDIR /app
#COPY package.json .
#RUN npm install
COPY . .
#RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.24.0-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 3000
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
