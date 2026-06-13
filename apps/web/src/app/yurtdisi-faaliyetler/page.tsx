import { getActivities } from "@/lib/api";
import { Activity } from "@repo/shared";
import WorldMapBanner from "@/components/WorldMapBanner";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import InteractiveGlobe2 from "@/components/InteractiveGlobe2";

export const metadata = {
    title: "Yurtdışı Faaliyetler - Dr. Selami Balcı",
    description: "Dr. Selami Balcı'nın uluslararası arenadaki projeleri ve işbirlikleri.",
};

export default async function InternationalActivitiesPage() {
    const activities = await getActivities();

    return (
        <div className="max-w-5xl mx-auto space-y-12">
            {/* Header */}
            <header className="text-center space-y-4 pt-12">
                <h1 className="text-4xl font-bold text-slate-700 font-serif">Yurtdışı Faaliyetleri</h1>
                <p className="text-slate-500 font-light">
                    Dr. Selami Balcı'nın uluslararası arenadaki projeleri ve işbirlikleri.
                </p>
            </header>

            {/* Interactive SVG World Map */}
            <WorldMapBanner />

            {/* Activity Cards */}
            <div className="grid gap-4 max-w-4xl mx-auto">
                {activities.map((activity: Activity) => (
                    <div key={activity.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4 transition hover:shadow-md">
                        {/* Teal Globe Icon Matching Screenshot */}
                        <div className="flex-shrink-0 pt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgb(15, 118, 110)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-lg text-slate-900 font-serif">{activity.country}</h3>
                                {activity.year && (
                                    <span className="text-xs font-semibold text-accent-700 bg-accent-50 px-2 py-0.5 rounded-full border border-accent-100/50">
                                        {activity.year}
                                    </span>
                                )}
                            </div>
                            <p className="text-slate-500 font-light text-sm">{activity.description}</p>
                        </div>
                    </div>
                ))}

                {activities.length === 0 && (
                    <p className="text-center text-slate-500 italic py-12">Henüz listelenen bir faaliyet bulunmuyor.</p>
                )}
            </div>

            {/* 3D Interactive Globe at Bottom (Design 1) */}
            <div className="bg-gradient-to-br from-slate-50 to-teal-50/30 rounded-3xl border border-slate-100 shadow-sm py-8 px-4 mb-8">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-slate-800 font-serif">Dünya Üzerindeki İzler (Birinci Tasarım)</h2>
                    <p className="text-slate-500 text-sm font-light mt-1">
                        {activities.length} ülkede gerçekleştirilen proje ve işbirlikleri (Koyu Mavi / SVG Tasarımı)
                    </p>
                </div>
                <InteractiveGlobe />
            </div>

            {/* Alternative 3D Interactive Globe (Design 2 - Gemini) */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl border border-slate-800 shadow-2xl py-8 px-4 mb-20">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-100 font-serif">Dünya Üzerindeki İzler (Alternatif İkinci Tasarım)</h2>
                    <p className="text-slate-400 text-sm font-light mt-1">
                        Holografik altın rengi küre, çift eksenli serbest döndürme ve kategori filtreleme (Canvas Tasarımı)
                    </p>
                </div>
                <InteractiveGlobe2 />
            </div>
        </div>
    );
}
