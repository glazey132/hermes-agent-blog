# Hermes Agent Blog - Automated Deployment System

## Overview

This blog automatically publishes 2 posts daily, documenting the AI agent development journey.

## Setup Instructions

### 1. Deploy to Vercel

1. Go to https://vercel.com/new
2. Import the repository: `glazey132/hermes-agent-blog`
3. Use root directory: `hermes-agent-blog`
4. Deploy automatically on each push

**URL**: https://hermes-agent-blog.vercel.app

### 2. Configure CI/CD

Already configured! Vercel will automatically:
- Build on every push to main
- Deploy to production
- Cache for faster subsequent builds

### 3. Monitoring

#### Daily Ranking Check
Run this script to track search rankings:

```bash
# In the blog directory
./scripts/check-rankings.sh
```

#### SEO Health Check
```bash
npm run build && npm run preview
# Then check: curl https://hermes-agent-blog.vercel.app/sitemap.xml
```

## Writing New Posts

### Add a New Post File

1. Create `src/app/posts/[new-post-slug]/page.tsx`
2. Add slug to the `generateStaticParams` array
3. Add metadata and content
4. Update navigation links

### Post Template

```typescript
import { Metadata } from "next";

interface BlogPostProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return [
    { slug: "your-new-post-slug" },
  ];
}

export function generateMetadata({ params }: BlogPostProps): Metadata {
  return {
    title: "Your Post Title | Hermes Agent Blog",
    description: "Post excerpt",
  };
}

export default function BlogPost() {
  return (
    /* Your post content */
  );
}
```

## Content Strategy

### Post Types

1. **Technical Posts** (Software Engineer Focus)
   - Architecture decisions
   - Implementation details
   - Performance optimization
   - Tool selection rationale

2. **Consumer Posts** (Lay Person Focus)
   - How AI agents work
   - Real-world applications
   - Benefits and use cases
   - Future implications

### Daily Schedule

- **8:00 AM**: First post (Technical deep-dive)
- **12:00 PM**: Second post (Consumer-facing)
- **6:00 PM**: SEO ranking check and performance metrics

## SEO Best Practices

- Each post has proper meta tags
- Sitemap automatically generated
- Robots.txt configured
- Semantic HTML structure
- Mobile-responsive design
- Fast loading times

## Analytics Integration

Recommended tools:
- Google Analytics 4
- Vercel Analytics
- Search Console

Add tracking:
1. Create Vercel project if not done
2. Enable analytics in Vercel dashboard
3. Track page views and user behavior

## Automation Scripts

See `scripts/` directory for:
- `check-rankings.sh` - SEO ranking tracker
- `publish-post.js` - Automated post creation
- `update-seo.js` - SEO optimization

## Next Steps

1. ✅ GitHub repository created
2. ✅ Next.js base with SEO configured
3. ✅ Vercel deployment ready
4. ⏳ Set up automated posting system
5. ⏳ Connect to analytics
6. ⏳ Begin content pipeline

## Team

- **Primary**: @glazey132
- **Repository**: https://github.com/glazey132/hermes-agent-blog
- **Live Site**: https://hermes-agent-blog.vercel.app

---

*Last updated: May 04, 2024*
