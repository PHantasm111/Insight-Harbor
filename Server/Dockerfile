# Using Node.js 20 Image
FROM node:20-alpine

# 设置容器内的工作目录
# Set the working directory in the container
WORKDIR /app

# 复制 package.json 和 package-lock.json，并安装依赖
# 这样如果仅仅是代码更新，而依赖没有变化，就可以利用 Docker 缓存，加快构建速度
# Copy package.json and package-lock.json, and install dependencies
# If only the code is updated and the dependencies remain unchanged, you can use Docker cache to speed up the build
COPY package*.json ./

# 将 NODE_ENV 设置为生产环境以安装生产依赖
# Set NODE_ENV to production to install production dependencies only
ENV NODE_ENV=production

RUN npm install

# 复制后端代码到容器内
# Copy the backend code into the container
COPY . .

# 暴露后端服务端口（本地是 3000）
# Expose the backend service port (locally 3000)
EXPOSE 3000

# 启动后端应用
# Start the backend application
CMD ["node", "index.js"]