import Link from 'next/link';
import Image from 'next/image';
import { codeToHtml } from 'shiki';
import { ComponentPropsWithoutRef } from 'react';
import { CopyButton } from './ui/CopyButton';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type ImageProps = ComponentPropsWithoutRef<'img'>;

const components = {
    h1: (props: HeadingProps) => <h1 className="text-4xl font-extrabold mt-12 mb-6 text-slate-900 dark:text-white tracking-tight" {...props} />,
    h2: (props: HeadingProps) => <h2 className="text-2xl font-bold mt-10 mb-5 border-b border-slate-200 dark:border-slate-800 pb-3 text-slate-900 dark:text-white tracking-tight" {...props} />,
    h3: (props: HeadingProps) => <h3 className="text-xl font-bold mt-8 mb-4 text-slate-900 dark:text-white tracking-tight" {...props} />,
    p: (props: ParagraphProps) => <p className="leading-relaxed mb-6 text-slate-600 dark:text-slate-400 text-lg" {...props} />,
    ul: (props: ListProps) => <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-600 dark:text-slate-400" {...props} />,
    ol: (props: ListProps) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-slate-600 dark:text-slate-400" {...props} />,
    li: (props: ListItemProps) => <li className="pl-1" {...props} />,
    blockquote: (props: BlockquoteProps) => (
        <blockquote className="border-l-4 border-accent pl-6 italic my-10 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/40 py-6 rounded-r-2xl shadow-sm" {...props} />
    ),
    img: ({ src, alt, width, height, ...props }: ImageProps) => (
        <figure className="my-12 group">
            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-2xl shadow-slate-200/50 dark:shadow-none">
                <Image
                    src={src as string || ''}
                    alt={alt as string || ''}
                    width={1200}
                    height={675}
                    style={{ width: '100%', height: 'auto' }}
                    className="hover:scale-[1.03] transition-transform duration-700 ease-out"
                    unoptimized={(src as string)?.startsWith('http')}
                    {...props}
                />
            </div>
            {alt && <figcaption className="mt-4 text-center text-sm text-slate-500 dark:text-slate-500 font-medium italic">{alt}</figcaption>}
        </figure>
    ),
    a: ({ href, children, ...props }: AnchorProps) => {
        const isInternal = href?.startsWith('/');
        const activeStyles = "text-accent font-semibold hover:opacity-75 decoration-accent/30 underline underline-offset-8 decoration-2 transition-all hover:decoration-accent";
        
        if (isInternal) {
            return (
                <Link href={href as string} className={activeStyles} {...props}>
                    {children}
                </Link>
            );
        }
        return (
            <a
                href={href}
                className={activeStyles}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            >
                {children}
            </a>
        );
    },
    pre: async ({ children }: any) => {
        const code = children?.props?.children || '';
        const lang = children?.props?.className?.replace('language-', '') || 'text';

        const html = await codeToHtml(code, {
            lang,
            theme: 'github-dark',
        });

        return (
            <div className="relative group my-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#0d1117] shadow-xl overflow-hidden">
                <div className="absolute -inset-2 bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-widest select-none">
                        {lang}
                    </div>
                </div>

                <CopyButton text={code} />

                <div
                    className="relative text-sm p-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        );
    },
};

export default components;
