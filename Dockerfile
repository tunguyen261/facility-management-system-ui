# Sử dụng một image cơ sở có sẵn với Node.js 16
FROM node:16

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json (nếu có) vào thư mục làm việc
COPY package*.json ./

# Cài đặt các gói phụ thuộc
RUN yarn install

# Sao chép toàn bộ mã nguồn ứng dụng React vào container
COPY . .

# ENV NODE_OPTIONS="--max-old-space-size=512"

# Build ứng dụng React
RUN yarn run build

# Cổng mà ứng dụng React chạy trên
EXPOSE 3000

# Khởi động ứng dụng React khi container được chạy
CMD ["yarn", "start"]
