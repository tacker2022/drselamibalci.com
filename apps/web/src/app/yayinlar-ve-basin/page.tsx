import { getVideos } from "@/lib/api";
import PressGallery from "@/components/PressGallery";

export const metadata = {
    title: "Yayınlar ve Basın - Dr. Selami Balcı",
    description: "Dr. Selami Balcı'nın TV programları, röportajları ve yayınlanmış makaleleri.",
};

export default async function PressPage() {
    const videos = await getVideos();

    // Helper to get YouTube thumbnail
    const getYoutubeThumbnail = (url: string) => {
        const videoId = url.split("v=")[1]?.split("&")[0];
        if (!videoId && url.includes("shorts")) return `https://img.youtube.com/vi/${url.split("/").pop()}/hqdefault.jpg`;
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Header Section */}
            <div className="bg-white border-b border-slate-100 pt-16 pb-12 mb-12">
                <div className="container max-w-5xl mx-auto px-6 text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif tracking-tight">Yayınlar ve Basın</h1>
                    <p className="text-lg text-slate-500 font-light max-w-2xl mx-auto">
                        TV programları, röportajlar ve sektörel makaleler.
                    </p>
                </div>
            </div>

            <div className="container max-w-6xl mx-auto px-6 space-y-20">

                {/* Videos Section */}
                <section>
                    <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8 border-l-4 border-accent-600 pl-4">TV Yayınları & Röportajlar</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videos.map((video) => (
                            <a
                                key={video.id}
                                href={video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-slate-100 flex flex-col"
                            >
                                <div className="aspect-video relative overflow-hidden bg-slate-900">
                                    <img
                                        src={video.thumbnail_url || getYoutubeThumbnail(video.url)}
                                        alt={video.title}
                                        className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-14 h-14 bg-accent-600/90 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z" /></svg>
                                        </div>
                                    </div>
                                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                                        {video.category === 'tv' ? 'TV Yayını' : 'Röportaj'}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-accent-700 transition line-clamp-2 mb-2">
                                        {video.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm mt-auto flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                        YouTube'da İzle
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Press Gallery Section (Written Press) */}
                <PressGallery />



            </div>
        </div>
    );
}
