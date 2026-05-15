import { getAllPostSlugs, getAdjacentPostSlugs, getPostBySlug, buildTitle, buildDescription } from '@/lib/posts';

export { PostSlug } from '@/lib/posts';

interface PostMetadata {
  title: string;
  date: string;
  readTime: string;
  description: string;
}

export async function getPosts(): Promise<PostMetadata[]> {
  const slugs = getAllPostSlugs();
  const posts: PostMetadata[] = [];

  for (const slug of slugs) {
    const post = getPostBySlug(slug);
    if (post) {
      posts.push({
        title: post.title,
        date: post.date,
        readTime: post.readTime,
        description: post.excerpt,
      });
    }
  }

  return posts;
}

export async function getPost(slug: string): Promise<PostMetadata | null> {
  const postSlug = slug as PostSlug;
  const post = getPostBySlug(postSlug);
  
  if (!post) {
    return null;
  }

  return {
    title: post.title,
    date: post.date,
    readTime: post.readTime,
    description: post.excerpt,
  };
}

export async function getAdjacentPost(slug: string): Promise<{
  previous: PostMetadata | null;
  next: PostMetadata | null;
}> {
  const postSlug = slug as PostSlug;
  const { previous, next } = getAdjacentPostSlugs(postSlug);
  
  return {
    previous: previous ? await getPost(previous) : null,
    next: next ? await getPost(next) : null,
  };
}

export function generateStaticParams(): { slug: string }[] {
  return getAllPostSlugs().map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const title = buildTitle(params.slug as PostSlug);
  const description = buildDescription(params.slug as PostSlug);

  return {
    title,
    description,
  };
}
