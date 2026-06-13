import { notFound } from "next/navigation";
import { getPost } from "@/lib/api";
import { Metadata } from "next";

export const runtime = "edge";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return { title: 'Yazı Bulunamadı' };
    return {
        title: `${post.title} - Dr. Selami Balcı`,
        description: post.excerpt || post.title,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt || post.title,
        "datePublished": post.published_at,
        "dateModified": post.updated_at || post.published_at,
        "author": {
            "@type": "Person",
            "name": "Dr. Selami Balcı",
            "url": "https://drselamibalci.com"
        },
        "publisher": {
            "@type": "Person",
            "name": "Dr. Selami Balcı",
            "url": "https://drselamibalci.com"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://drselamibalci.com/blog/${post.slug}`
        },
        "image": post.cover_url || "https://drselamibalci.com/dr-selami-balci.jpg"
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Ana Sayfa",
                "item": "https://drselamibalci.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://drselamibalci.com/blog"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `https://drselamibalci.com/blog/${post.slug}`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <article className="max-w-3xl mx-auto space-y-6 px-6 py-12">
                <header className="space-y-4 border-b border-slate-200 pb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                        {post.title}
                    </h1>
                    <div className="text-slate-500 text-sm">
                        {post.published_at && new Date(post.published_at).toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </header>

                {/* Basic HTML/Markdown Rendering */}
                <div
                    className="prose prose-slate max-w-none prose-a:text-blue-600 prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                />
            </article>
        </>
    );
}
