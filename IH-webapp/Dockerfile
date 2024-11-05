# 使用 Node.js 镜像进行构建
# Building with the Node.js image
FROM node:20.15 AS build

# 设置工作目录
# Set the working directory
WORKDIR /app

# 复制 package.json 和 package-lock.json 并安装依赖
# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# 复制所有项目文件并构建
# Copy all project files and build
COPY . .
RUN npm run build

# 使用 Nginx 部署构建的静态文件
# Use Nginx to deploy the built static files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
