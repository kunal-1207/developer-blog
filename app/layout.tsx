import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import BrowserLayout from "@/components/BrowserLayout";
import { getPosts } from "@/lib/getPosts";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevBlog | Browser Edition",
  description: "A production-grade developer blog with a browser-inspired UI.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await getPosts();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BrowserLayout posts={posts}>
            {children}
          </BrowserLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
