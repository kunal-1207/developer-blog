# Portfolio-Grade Developer Blog

A clean, fast, and SEO-optimized personal developer blog built with Next.js (App Router), MDX, and Tailwind CSS. This project uses GitHub as a lightweight CMS, allowing you to write blog posts in MDX and deploy them statically.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: [MDX](https://mdxjs.com/) with [gray-matter](https://github.com/jonschlinkert/gray-matter)
- **Syntax Highlighting**: [Shiki](https://shiki.style/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) (Dark/Light mode)
- **Comments**: [Giscus](https://giscus.app/)
- **Deployment**: [Vercel](https://vercel.com/) (Static Generation)

## 📁 Key Features

- **GitHub-Driven CMS**: No complex database or dashboard. Just push MDX files to `content/posts`.
- **Static Site Generation (SSG)**: Lightning-fast performance and excellent SEO.
- **Responsive Design**: Minimalist and mobile-friendly UI.
- **Reading Time**: Automatically calculated for every post.
- **SEO Ready**: Dynamic metadata, sitemap.xml, and robots.txt included.
- **Dark Mode**: Smooth transitions with system preference support.

## 🛠️ Getting Started

### Local Development

1. **Clone the repository**:

   ```bash
   git clone <your-repo-url>
   cd developer-blog
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Visit [http://localhost:3000](http://localhost:3000)

### Configuration

#### Giscus Comments

Update `components/GiscusComments.tsx` with your repository details:

- `repo`: `your-username/your-repo`
- `repoId`: Your repository ID
- `categoryId`: Your category ID

#### Site URL

Update the `baseUrl` in:

- `app/sitemap.ts`
- `lib/generateRSS.ts`
- `public/robots.txt`

## 📝 Writing Blog Posts

New posts should be added to the `content/posts` directory with the `.mdx` extension.

### Frontmatter Schema

```yaml
---
title: "Post Title"
description: "Brief summary of the post"
date: "YYYY-MM-DD"
tags: ["nextjs", "tutorial"]
---
```

## 🚢 Deployment

1. Push your code to a GitHub repository.
2. Connect your repository to **Vercel**.
3. Vercel will automatically detect the Next.js project and deploy it.
4. Set up environment variables if necessary (though this project primarily uses static generation).

## 📄 License

MIT
