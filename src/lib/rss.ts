import { Post } from '../data/posts';

export async function fetchRSS(url: string): Promise<Post[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch RSS');

        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');

        const items = Array.from(xml.querySelectorAll('item'));

        return items.map((item, index) => {
            const title = item.querySelector('title')?.textContent || 'Untitled';
            const description = item.querySelector('description')?.textContent || '';
            const contentEncoded = item.getElementsByTagName('content:encoded')[0]?.textContent;
            const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();
            const link = item.querySelector('link')?.textContent || '';
            const categories = Array.from(item.querySelectorAll('category')).map(c => c.textContent || '');

            // Basic content cleaning (removing HTML tags for excerpt if needed, or keeping them if view supports it)
            const content = contentEncoded || description;
            const excerpt = description.replace(/<[^>]*>/g, '').slice(0, 150) + '...';

            return {
                id: `rss-${index}-${Date.now()}`,
                title,
                excerpt,
                content: content, // We'll render this carefully
                tags: categories,
                category: categories[0] || 'Blog',
                publishDate: new Date(pubDate).toISOString(),
                readingTime: Math.ceil(content.length / 1000), // Rough estimate
                slug: link.split('/').filter(Boolean).pop() || `post-${index}`
            };
        });
    } catch (error) {
        console.error('RSS Fetch Error:', error);
        return [];
    }
}
