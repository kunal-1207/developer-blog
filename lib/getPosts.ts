import { getSortedPostsData, PostData } from './markdown';

export async function getPosts(): Promise<PostData[]> {
  return await getSortedPostsData();
}

export async function getPostBySlug(slug: string): Promise<PostData> {
  const { getPostData } = await import('./markdown');
  return await getPostData(slug);
}
