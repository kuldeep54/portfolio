# Kuldeep Malviya - Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Features smooth animations, dark/light theme toggle, and a working contact form.

## 🚀 Features

- **Modern Design**: Clean, minimal design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Dark/Light Theme**: Toggle between dark and light modes
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Contact Form**: Working contact form with email notifications using Nodemailer
- **SEO Optimized**: Complete SEO metadata and Open Graph tags
- **TypeScript**: Fully typed for better development experience
- **Performance**: Optimized for fast loading and smooth interactions

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email**: Nodemailer
- **Theme**: next-themes

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd kuldeep-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your email credentials in `.env.local`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   CONTACT_EMAIL=your-email@gmail.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 Email Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use this app password as `SMTP_PASS` in your `.env.local`

## 🎨 Customization

### Personal Data
Edit `lib/data.ts` to update:
- Personal information
- Skills and technologies
- Work experience
- Projects
- Education
- Contact details

### Styling
- Colors and themes: `tailwind.config.ts`
- Global styles: `app/globals.css`
- Component styles: Individual component files

### Content Sections
- **Hero**: `components/hero.tsx`
- **About**: `components/about.tsx`
- **Experience**: `components/experience.tsx`
- **Projects**: `components/projects.tsx`
- **Contact**: `components/contact.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## ⚡ Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting for optimal loading

## 🎯 SEO Features

- Meta tags and Open Graph
- Structured data
- Sitemap generation
- Robot.txt
- Semantic HTML structure

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

If you have any questions or need help with setup, feel free to reach out:
- Email: malviyakuldeep54@gmail.com
- GitHub: [@kuldeep54](https://github.com/kuldeep54)
- LinkedIn: [kuldeep-malviya-017314253](https://linkedin.com/in/kuldeep-malviya-017314253)

---

Built with ❤️ by Kuldeep Malviya
