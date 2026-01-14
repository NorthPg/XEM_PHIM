# 🚀 Hướng dẫn Deploy ứng dụng Romantic Movie Invite

Ứng dụng này có thể được deploy lên nhiều platform miễn phí. Dưới đây là hướng dẫn chi tiết cho các platform phổ biến nhất.

## 📋 Mục lục
1. [Vercel](#vercel-recommended) ⭐ (Khuyên dùng)
2. [Netlify](#netlify)
3. [GitHub Pages](#github-pages)

---

## 🎯 Vercel (Recommended) ⭐

**Vercel là cách đơn giản và nhanh nhất để deploy ứng dụng này.**

### Cách 1: Deploy qua GitHub (Khuyên dùng)

1. **Đẩy code lên GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy trên Vercel:**
   - Truy cập: https://vercel.com
   - Đăng nhập bằng GitHub
   - Click **"Add New Project"**
   - Chọn repository của bạn
   - Vercel sẽ tự động detect settings:
     - **Framework Preset:** Vite
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Click **"Deploy"**
   - Chờ vài phút, bạn sẽ có link deploy!

### Cách 2: Deploy bằng Vercel CLI

1. **Cài đặt Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```
   - Lần đầu tiên sẽ hỏi login và một số cấu hình
   - Chọn default settings
   - Xong! Bạn sẽ có link deploy

3. **Deploy production:**
   ```bash
   vercel --prod
   ```

### Cấu hình Vercel (nếu cần)

Tạo file `vercel.json` ở root project (không bắt buộc, Vercel tự detect):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

## 🌐 Netlify

### Cách 1: Deploy qua GitHub

1. **Đẩy code lên GitHub** (giống như Vercel)

2. **Deploy trên Netlify:**
   - Truy cập: https://app.netlify.com
   - Đăng nhập bằng GitHub
   - Click **"Add new site"** > **"Import an existing project"**
   - Chọn repository
   - Cấu hình build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click **"Deploy site"**

### Cách 2: Drag & Drop

1. **Build project:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   - Truy cập: https://app.netlify.com/drop
   - Kéo thả folder `dist` vào trang web
   - Xong!

### Cách 3: Netlify CLI

1. **Cài đặt Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build và deploy:**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### Cấu hình Netlify

Tạo file `netlify.toml` ở root project:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 📄 GitHub Pages

### Bước 1: Cài đặt gh-pages

```bash
npm install --save-dev gh-pages
```

### Bước 2: Cập nhật package.json

Thêm vào `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://<your-username>.github.io/<repo-name>"
}
```

### Bước 3: Cập nhật vite.config.ts

Thêm `base` path:
```typescript
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/<repo-name>/', // Thay <repo-name> bằng tên repo của bạn
    // ... rest of config
  };
});
```

### Bước 4: Deploy

```bash
npm run deploy
```

**Lưu ý:** GitHub Pages sẽ có URL dạng: `https://<username>.github.io/<repo-name>`

---

## 🔧 Build Local (Kiểm tra trước khi deploy)

Trước khi deploy, bạn nên test build local:

```bash
# Build
npm run build

# Preview build
npm run preview
```

Kiểm tra folder `dist` đã được tạo và chạy preview để đảm bảo mọi thứ hoạt động tốt.

---

## ⚠️ Lưu ý quan trọng

1. **Ảnh trong public folder:**
   - Ảnh trong `public/images/` sẽ được tự động copy vào build
   - Đường dẫn `/images/...` sẽ hoạt động đúng sau khi deploy

2. **Environment Variables:**
   - Nếu có biến môi trường, cần cấu hình trên platform deploy
   - Vercel: Project Settings > Environment Variables
   - Netlify: Site settings > Build & deploy > Environment variables

3. **Custom Domain:**
   - Tất cả platform đều hỗ trợ custom domain miễn phí
   - Vercel: Project Settings > Domains
   - Netlify: Site settings > Domain management

---

## 🎉 Kết luận

- **Vercel**: ⭐ Khuyên dùng - Đơn giản, nhanh, tự động SSL
- **Netlify**: Tốt, tương tự Vercel
- **GitHub Pages**: Miễn phí, nhưng cần setup thêm

Chúc bạn deploy thành công! 🚀
