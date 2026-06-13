import Link from "next/link";
import { getVideos } from "@/lib/api";
import { Video } from "@repo/shared";
import FaqSection from "@/components/FaqSection";


// Helper to convert YouTube URL to Embed URL
function getEmbedUrl(url: string) {
  try {
    if (url.includes('embed')) return url;
    const videoId = url.split('v=')[1]?.split('&')[0];
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;

    // Support for youtu.be short links
    if (url.includes('youtu.be')) {
      const shortId = url.split('youtu.be/')[1]?.split('?')[0];
      if (shortId) return `https://www.youtube.com/embed/${shortId}`;
    }

    // Support for YouTube Shorts
    if (url.includes('/shorts/')) {
      const shortId = url.split('/shorts/')[1]?.split('?')[0];
      if (shortId) return `https://www.youtube.com/embed/${shortId}`;
    }

    return url;
  } catch { return url; }
}

export default async function Home() {
  const videos = await getVideos();

  const tvVideos = videos.filter(v => v.category === 'tv');
  const shortVideos = videos.filter(v => v.category === 'short');

  return (
    <div className="space-y-32 pb-24 overflow-hidden">
      {/* Premium Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-100/40 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-100/60 rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

        <div className="container max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center relative z-10">
          {/* Left: Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-10 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200/60 rounded-full shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-700"></span>
              </span>
              <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Akademisyen & Şehirci</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 font-serif leading-[1.1] tracking-tight">
              Dr. Selami <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-800 to-accent-600">Balcı</span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed max-w-2xl text-balance">
              Sürdürülebilir şehircilik, kentsel dönüşüm ve geleceğin akıllı şehir vizyonunu <strong className="text-slate-800 font-medium">bilimsel temellerle</strong> inşa ediyoruz.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-5 pt-4 w-full sm:w-auto">
              <Link href="/hakkinda" className="px-10 py-4.5 bg-accent-700 text-white rounded-2xl font-bold hover:bg-accent-800 transition-all duration-300 shadow-lg shadow-accent-700/20 hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
                <span>Biyografi & CV</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
              <Link href="/uzmanlik-alanlari" className="px-10 py-4.5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 flex items-center justify-center">
                Uzmanlık Alanları
              </Link>
            </div>
          </div>

          {/* Right: Premium 3D Card Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Premium Corporate Image */}
            <div className="relative group">
              {/* Simple refined backdrop */}
              <div className="absolute inset-0 bg-slate-100 rounded-[2.5rem] rotate-2 scale-105 opacity-50 transition-transform duration-700"></div>

              {/* Main Card */}
              <div className="relative w-80 md:w-96 aspect-[3.5/4.5] rounded-[2rem] overflow-hidden shadow-2xl bg-white p-2">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                  <img
                    src="/dr-selami-balci.jpg"
                    alt="Dr. Selami Balcı"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80"></div>

                  {/* Overlay Content */}
                  <div className="absolute bottom-8 left-8 text-white text-left z-10">
                    <p className="font-serif text-3xl font-bold tracking-tight">Dr. Selami Balcı</p>
                    <div className="h-1 w-12 bg-accent-500 my-2 rounded-full"></div>
                    <p className="text-white/90 text-sm font-medium tracking-wide uppercase">Şehircilik Uzmanı</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip - Glass */}
      <section className="relative -mt-32 z-20 container max-w-6xl mx-auto px-6">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { val: "20+", label: "Yıl Deneyim" },
            { val: "50+", label: "Proje Yönetimi" },
            { val: "Ulusal", label: "TV Görünürlüğü" },
            { val: "Global", label: "Faaliyet Ağı" }
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2 group">
              <div className="text-4xl md:text-5xl font-serif font-bold text-slate-800 group-hover:text-accent-700 transition duration-300">{stat.val}</div>
              <div className="text-xs font-bold tracking-widest text-slate-400 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ParkExpert Showcase Section */}
      <section className="container max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm overflow-hidden relative group">
          {/* Abstract Background Element */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent-50/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          {/* Left Column: Image */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[3/2] border border-slate-100 shadow-md">
            <img
              src="/press/parkexpert_ad_mall_report.png"
              alt="ParkExpert Akıllı Otopark Çözümleri"
              className="object-cover w-full h-full transform group-hover:scale-[1.01] transition duration-700"
            />
          </div>

          {/* Right Column: Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <span className="text-accent-700 font-bold tracking-widest uppercase text-xs bg-accent-50 px-3 py-1 rounded-full">
                Öne Çıkan Girişim
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-serif leading-tight">
                ParkExpert: Dijital ve Akıllı Otopark Dönüşümü
              </h2>
            </div>
            
            <p className="text-slate-600 font-light leading-relaxed text-base md:text-lg">
              Standart otopark işletmeciliğini yapay zekâ, akıllı yönlendirme ve bulut tabanlı otomasyon yazılımlarıyla yeniden tanımlıyoruz. Plaka tanıma (LPR), esnek mobil ödeme altyapıları ve anlık veri analitiğiyle AVM otoparklarında ve kentsel mobilitede stresi sıfıra indiriyoruz.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                href="/yayinlar-ve-basin" 
                className="px-6 py-3 bg-accent-700 text-white rounded-xl font-semibold hover:bg-accent-800 transition duration-300 shadow-md hover:shadow-lg flex items-center gap-2 text-sm"
              >
                <span>Tanıtım Küpürünü Oku</span>
                <span>→</span>
              </Link>
              <Link 
                href="/uzmanlik-alanlari" 
                className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition duration-300 text-sm"
              >
                Uzmanlık Alanları
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TV Videos Section */}
      {tvVideos.length > 0 && (
        <section className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-slate-100 pb-8">
            <div className="space-y-4">
              <span className="text-accent-700 font-bold tracking-widest uppercase text-xs bg-accent-50 px-3 py-1 rounded-full">Medya & Basın</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif">TV Yayınları & Röportajlar</h2>
            </div>
            <Link href="/yayinlar-ve-basin" className="group flex items-center gap-2 text-slate-600 font-medium hover:text-accent-700 transition">
              <span>Tümünü Gör</span>
              <span className="transform group-hover:translate-x-1 transition">→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {tvVideos.slice(0, 4).map((video: Video) => (
              <div key={video.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-500 border border-slate-100/50">
                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                  <iframe
                    src={getEmbedUrl(video.url)}
                    title={video.title}
                    className="w-full h-full absolute top-0 left-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-2xl text-slate-900 leading-snug group-hover:text-accent-700 transition font-serif">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Short Videos Section - Dark Mode feel */}
      {shortVideos.length > 0 && (
        <section className="bg-slate-900 py-24 text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(15,118,110,0.15),transparent_50%)]"></div>

          <div className="container max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16 space-y-4">
              <span className="text-accent-400 font-bold tracking-widest uppercase text-xs border border-accent-400/30 px-3 py-1 rounded-full">Sosyal Medya</span>
              <h2 className="text-4xl md:text-5xl font-bold font-serif">Kısa Video İçerikleri</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light">Şehircilik ve teknoloji üzerine hızlı, bilgilendirici paylaşımlar.</p>
            </div>

            <div className="flex overflow-x-auto pb-12 gap-8 justify-start md:justify-center snap-x no-scrollbar">
              {shortVideos.map((video: Video) => (
                <div key={video.id} className="min-w-[300px] w-[300px] bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 snap-center transform transition hover:-translate-y-3 duration-300">
                  <div className="aspect-[9/16] bg-black relative">
                    <iframe
                      src={getEmbedUrl(video.url)}
                      title={video.title}
                      className="w-full h-full absolute top-0 left-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h3 className="font-medium text-slate-200 text-base line-clamp-3 leading-relaxed">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SSS (FAQ) Bölümü */}
      <FaqSection />
    </div>
  );
}
