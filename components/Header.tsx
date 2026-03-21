import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-slate-200 dark:border-gray-800">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
                    DevBlog
                </Link>
                <nav className="flex items-center space-x-6">
                    <Link href="/blog" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400">
                        Blog
                    </Link>
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
}
