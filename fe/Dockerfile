# 1) Node 환경에서 React 빌드
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2) Nginx 이미지 사용
FROM nginx:alpine

# (중요) default.conf 복사:
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# React 빌드 결과를 Nginx의 html 폴더로 복사
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
