'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { siteConfig } from '@/lib/config';

export default function GiscusComments() {
    const { theme } = useTheme();

    if (!siteConfig.giscus.repo) return null;

    return (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 min-h-[350px]">
            <Giscus
                id="comments"
                repo={siteConfig.giscus.repo as `${string}/${string}`}
                repoId={siteConfig.giscus.repoId}
                category={siteConfig.giscus.category}
                categoryId={siteConfig.giscus.categoryId}
                mapping="pathname"
                term="Welcome to my blog!"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={theme === 'dark' ? 'dark_dimmed' : 'light'}
                lang="en"
                loading="lazy"
            />
        </div>
    );
}
