# Ifwad Portfolio

---

## 📌 Ifwad Portfolio — Developer Notes & Best Practices

### 🔧 Tech Stack
- **Frontend Framework**: React + TypeScript
- **Styling**: Tailwind CSS + ShadCN UI
- **Icons**: Lucide React Icons
- **Build Tool**: Vite (with HMR and optimized DX)
- **Hosting**: [Vercel](https://vercel.com/) (CI/CD enabled via GitHub)

---

### 🧩 Folder Structure Overview
| Folder/File         | Description |
|---------------------|-------------|
| `/components/`      | Reusable UI components (Header, Footer, ModeToggle, etc.) |
| `/pages/Index.tsx`  | Main page that composes all sections |
| `/assets/`          | Project images like avatar or project thumbnails |
| `/projects/`        | Array of projects used in the Projects section |
| `/theme-provider.tsx` | Global dark/light/system theme context |

---

### 🧠 Key Components
- **`Header.tsx`** – Sticky top nav with scroll-aware background & theme toggle.
- **`Hero.tsx`** – Personal introduction with resume download and scroll prompt.
- **`Skills.tsx`** – Categorized skill cards with tech logos.
- **`Projects.tsx`** – Filtered project grid, "show more" toggle, and badge tech tags.
- **`Contact.tsx`** – Email/Phone/Location info with Google Map embed.
- **`Footer.tsx`** – Social icons, internal navigation, and copyright.

---

### ☁️ Vercel Deployment Notes
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- `.env` for sensitive data like email credentials should never be committed.
- Vercel reads from your `vite.config.ts` and supports TypeScript out of the box.
- [Optional] Add `robots.txt` and `sitemap.xml` for SEO.

### 🌐 Custom Domain

- **Domain**: [ifwad.my](https://ifwad.my)
- Purchased via: [Exabytes](https://billing.exabytes.my/)
- Add domain in [Vercel Project Settings > Domains](https://vercel.com/dashboard)

how to make it work 
1. open vercel project > domain > insert domain name 
2. go to exbytes > Domain > Nameservers > insert nameservers with vercel

---

### 🔐 Environment Config (Optional Future Use)
If enabling contact forms or mailing:
```
EMAIL_USER=iwadss99@gmail.com
EMAIL_PASS=your_app_password_here
```
> Use **Vercel Environment Variables** instead of committing sensitive `.env` files.

---

### 🛠️ Future Improvements & Reminders
- ✅ Replace placeholder images (`No_image_available.png`) with real project screenshots
- ✅ Integrate email form using `/api/contact` + Nodemailer (optional)
- ✅ Setup proper SEO meta tags in `index.html`
- ✅ Consider splitting into routes with React Router for larger scale
- ✅ Monitor performance via Vercel Analytics (optional)

---

### ✅ Development Tips
- Run locally with: `npm run dev`
- Format code with: `npm run format`
- Recommended extensions:
  - ESLint + Prettier
  - Tailwind CSS IntelliSense
  - Icons support for VSCode
