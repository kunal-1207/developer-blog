export default function Footer() {
    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 py-8 mt-auto">
            <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                <p>© {new Date().getFullYear()} DevBlog. Built with Next.js, MDX, and Tailwind CSS.</p>
            </div>
        </footer>
    );
}
