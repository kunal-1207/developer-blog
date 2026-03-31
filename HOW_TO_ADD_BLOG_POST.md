# How to Add a New Blog Post

1. **Write Your Post**
   - Go to `content/posts/`.
   - Create a new file:
     - Use `.md` for plain Markdown (no React/JSX).
     - Use `.mdx` for Markdown + React/JSX components.
   - Add frontmatter at the top:
     ```md
     ---
     title: "Your Post Title"
     date: "YYYY-MM-DD"
     category: "CategoryName"
     excerpt: "Short summary of your post."
     tags: ["tag1", "tag2"]
     coverImage: "https://your-image-url.jpg"
     ---
     ```
   - Write your content below the frontmatter.

2. **(Optional) Use Custom Components**
   - In `.mdx` files, you can use React components from `components/MDXComponents.tsx`.
   - Example:
     ```mdx
     <YourComponent prop="value" />
     ```

3. **Push to GitHub**
   - Commit and push your changes.

4. **Vercel Deploys Automatically**
   - Your blog will redeploy and the new post will appear.

5. **View Your Post**
   - Visit: `https://your-vercel-domain/posts/your-slug`
   - The slug is the filename without extension.

---

## Troubleshooting
- If your post doesn't show up:
  - Make sure the file is in `content/posts/`.
  - Check the frontmatter for typos.
  - For `.mdx`, ensure you don't have invalid JSX.
  - Check Vercel deployment logs for errors.

---

## Summary
- `.md` = Markdown only
- `.mdx` = Markdown + React/JSX
- Add frontmatter
- Push to GitHub
- Vercel redeploys automatically
- Your post is live!
