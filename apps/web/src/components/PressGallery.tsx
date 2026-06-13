"use client";

import { useState } from "react";

interface PressItem {
  id: string;
  title: string;
  source: string;
  date: string;
  excerpt: string;
  imagePath: string;
  transcription: string;
}

const PRESS_ITEMS: PressItem[] = [
  {
    id: "lonca-dergisi-2026-haziran",
    title: "İstanbul’da Otopark Krizi Büyüyor: TODER’den Yeni Yasa Önerisi ve Kritik Uyarılar",
    source: "Lonca Dergisi",
    date: "Haziran 2026",
    excerpt: "İstanbul'daki otopark sorunu ve çözüm önerilerine yönelik hazırlanan yeni kanun önerisi hakkında TODER Yönetim Kurulu Başkanı Dr. Selami Balcı'nın açıklamaları ve değerlendirmeleri.",
    imagePath: "/press/lonca_dergisi_toder.png",
    transcription: `
# İstanbul’da Otopark Krizi Büyüyor: TODER’den Yeni Yasa Önerisi ve Kritik Uyarılar

İstanbul’da giderek artan araç sayısı ve yetersiz otopark altyapısı, şehir yaşamını zorlaştıran en önemli sorunlardan biri haline geldi. Özellikle merkezi lokasyonlarda yaşanan park yeri sıkıntısı, hem sürücüler hem de şehir trafiği açısından ciddi bir problem oluştururken, konuya yönelik yeni bir kanun düzenlemesi önerisi gündeme geldi.

Uzmanlara göre mevcut otopark kapasitesi, İstanbul’daki araç yoğunluğunu karşılamaktan oldukça uzak. Bu durum sürücülerin uzun süre park yeri aramasına, trafik yoğunluğunun artmasına ve günlük yaşamda ciddi zaman kayıplarına neden oluyor. AVM çevreleri, iş merkezleri ve yoğun yerleşim alanlarında sorun daha da belirgin hale geliyor.

## YENİ DÜZENLEME İLE NELER DEĞİŞECEK?

Gündeme gelen kanun önerisi kapsamında;
* Yeni yapılacak binalarda otopark zorunluluğunun daha sık denetlenmesi
* Mevcut otopark alanlarının daha verimli kullanılması
* Kamu ve özel sektör iş birlikleriyle yeni yatırımların teşvik edilmesi
* Akıllı otopark sistemleri ile kapasite yönetiminin güçlendirilmesi

gibi önemli adımlar öne çıkıyor.

## SORUN SADECE PARK YERİ DEĞİL

Otopark problemi yalnızca araç park etmekten ibaret değil. Park yeri arayan araçların trafikte oluşturduğu ek yük; yakıt tüketimini artırırken, çevresel etkileri de beraberinde getiriyor. Uzmanlar, bu durumun şehir içi ulaşım verimliğini doğrudan etkilediğini vurguluyor.

## SEKTÖR TEMSİLCİLERİNDEN NET MESAJ: "ARTIK AKILLI SİSTEM ŞART"

Tüm Otopark Entegratörleri, Yatırımcıları ve İşletmecileri Derneği (TODER) de konuya ilişkin önemli değerlendirmelerde bulundu.

Derneğin Yönetim Kurulu Başkanı **Dr. Selami Balcı**, İstanbul'daki otopark sorununun yalnızca fiziki alan eksikliğiyle açıklanamayacağını belirterek şu ifadeleri kullandı:

> "Otopark yönetimi artık klasik yöntemlerle çözülebilecek bir konu değil. Veri odaklı, teknolojik ve entegre sistemlerin devreye alınması gerekiyor. Doğru planlama ve sürdürülebilir yatırımlar ile şehir içi trafik ciddi anlamda rahatlatılabilir."

Balcı ayrıca, otopark yatırımlarının şehir planlamasının ayrılmaz bir parçası haline gelmesi gerektiğini ve kamu özel sektör iş birliklerinin artırılmasının kritik önem taşıdığını vurguladı.

## YENİ DÖNEM: VERİ VE TEKNOLOJİ ODAKLI OTOPARK YÖNETİMİ

Sektör temsilcilerine göre otopark yönetimi artık yalnızca fiziki alan üretmekten ibaret değil; veri analizi, dijital altyapı ve operasyonel verimlilikle birlikte ele alınması gereken stratejik bir alan haline geldi. Akıllı yönlendirme sistemleri, anlık doluluk takibi ve entegre yazılımlar sayesinde mevcut kapasitenin daha etkin kullanılması mümkün hale gelirken, bu dönüşümün Türkiye genelinde yaygınlaştırılması gerektiği ifade ediliyor.
`
  }
];

export default function PressGallery() {
  const [activeItem, setActiveItem] = useState<PressItem | null>(null);

  return (
    <section>
      <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8 border-l-4 border-accent-600 pl-4">
        Yazılı Basın & Röportajlar
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {PRESS_ITEMS.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-slate-100 flex flex-col md:flex-row h-full"
          >
            {/* Card Left: Image Thumbnail */}
            <div className="md:w-2/5 relative aspect-[3.5/4.5] md:aspect-auto overflow-hidden bg-slate-100 flex-shrink-0 cursor-pointer" onClick={() => setActiveItem(item)}>
              <img
                src={item.imagePath}
                alt={item.title}
                className="object-cover object-top w-full h-full group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-300 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-slate-800 shadow-md transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" /></svg>
                </div>
              </div>
            </div>

            {/* Card Right: Text Details */}
            <div className="p-6 flex flex-col flex-grow justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="bg-accent-50 text-accent-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {item.source}
                  </span>
                  <span className="text-slate-400 text-xs font-medium">{item.date}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg md:text-xl group-hover:text-accent-700 transition leading-snug cursor-pointer" onClick={() => setActiveItem(item)}>
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>
              </div>

              <button
                onClick={() => setActiveItem(item)}
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-950 uppercase tracking-wider hover:text-accent-700 transition self-start"
              >
                <span>Haber Küpürünü Oku</span>
                <span className="transform group-hover:translate-x-1 transition">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal with Transcription and High-Res View */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
          {/* Main Modal Container */}
          <div className="relative bg-white rounded-3xl w-full max-w-6xl h-[90vh] md:h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-scale-up">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 md:px-8 md:py-5 border-b border-slate-100 flex-shrink-0 bg-slate-50">
              <div>
                <span className="text-xs font-bold text-accent-700 uppercase tracking-widest bg-accent-100/50 px-2.5 py-0.5 rounded-md">
                  {activeItem.source}
                </span>
                <span className="text-slate-400 text-xs font-medium ml-3">{activeItem.date}</span>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="w-10 h-10 rounded-full bg-slate-200/60 hover:bg-slate-200 text-slate-700 hover:text-slate-950 flex items-center justify-center transition-all"
                aria-label="Kapat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Modal Content - Two Columns */}
            <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
              
              {/* Left Column: Interactive Image View */}
              <div className="lg:w-1/2 bg-slate-900 flex items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-slate-200 overflow-y-auto max-h-[40vh] lg:max-h-full">
                <div className="relative max-h-full max-w-full group/image">
                  <img
                    src={activeItem.imagePath}
                    alt={activeItem.title}
                    className="max-h-[35vh] lg:max-h-[70vh] object-contain rounded-lg shadow-lg"
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full pointer-events-none opacity-0 group-hover/image:opacity-100 transition-opacity">
                    Haber Küpürü Orijinal Görseli
                  </div>
                </div>
              </div>

              {/* Right Column: Transcription Reader */}
              <div className="lg:w-1/2 p-6 md:p-10 overflow-y-auto bg-white flex flex-col justify-start">
                <div className="prose prose-slate max-w-none prose-headings:font-serif prose-h1:text-2xl prose-h1:md:text-3xl prose-h1:font-bold prose-h1:text-slate-900 prose-h2:text-lg prose-h2:md:text-xl prose-h2:font-bold prose-h2:mt-8 prose-h2:text-slate-800 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-blockquote:border-l-4 prose-blockquote:border-accent-500 prose-blockquote:bg-slate-50 prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:rounded-r-xl prose-blockquote:italic">
                  <div className="space-y-6">
                    <h1 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
                      {activeItem.title}
                    </h1>
                    
                    <div className="h-0.5 w-16 bg-accent-500 rounded-full"></div>
                    
                    <div className="space-y-4 text-slate-600 leading-relaxed font-light text-base">
                      <p className="font-medium text-slate-800">
                        İstanbul’da giderek artan araç sayısı ve yetersiz otopark altyapısı, şehir yaşamını zorlaştıran en önemli sorunlardan biri haline geldi. Özellikle kentin merkezi lokasyonlarında yaşanan park yeri krizine karşı TODER'den kritik bir kanun düzenlemesi teklifi sunuldu.
                      </p>

                      <p>
                        Uzman kadrolara göre mevcut kapasiteler, İstanbul genelindeki araç yoğunluğunu taşımaktan oldukça uzak kalıyor. Bu durum, günlük hayatta sürücülerin uzun dakikalar boyunca park yeri aramasına, dolayısıyla gereksiz yakıt sarfiyatına ve zaman kaybına yol açarak kent içi trafiği içinden çıkılmaz hale getiriyor.
                      </p>

                      <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100 space-y-3">
                        <h3 className="font-serif font-bold text-slate-800 text-base">YENİ DÜZENLEME İLE NELER DEĞİŞECEK?</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Yeni inşa edilen binalardaki otopark zorunluluklarının sıkı denetlenmesi</li>
                          <li>Mevcut pasif otopark alanlarının yüksek verimlilikle revize edilmesi</li>
                          <li>Kamu ve özel sektör iş birlikleri (KÖİ) modellerinin yaygınlaştırılması</li>
                          <li>Kapasite yönetimini güçlendirecek akıllı otopark yazılımlarının devreye alınması</li>
                        </ul>
                      </div>

                      <h3 className="font-serif font-bold text-slate-800 text-lg pt-4">SORUN SADECE PARK YERİ DEĞİL</h3>
                      <p>
                        Otopark konusu salt araç park etmekten ibaret görülemez. Park yeri aramak amacıyla yollarda dolanan araçların trafikte oluşturduğu ek yük; karbon salınımını artırırken, çevre kirliliği ve stres gibi sosyo-ekonomik olumsuzlukları da tetikliyor.
                      </p>

                      <h3 className="font-serif font-bold text-slate-800 text-lg pt-4">TODER BAŞKANI DR. SELAMİ BALCI: "ARTIK AKILLI SİSTEM ŞART"</h3>
                      
                      <blockquote className="border-l-4 border-accent-600 bg-accent-50/30 p-5 rounded-r-2xl italic text-slate-700 font-serif text-base">
                        "Otopark yönetimi artık klasik yöntemlerle çözülebilecek bir konu değil. Veri odaklı, teknolojik ve entegre sistemlerin devreye alınması gerekiyor. Doğru planlama ve sürdürülebilir yatırımlar ile şehir içi trafik ciddi anlamda rahatlatılabilir."
                      </blockquote>

                      <p>
                        Dr. Selami Balcı, otopark yatırımlarının şehir planlama süreçlerinin ayrılmaz bir parçası olarak görülmesi gerektiğini ve kamu ile özel sektör iş birliklerinin bu alanda kritik bir kaldıraç rolü üstleneceğini vurguladı.
                      </p>

                      <h3 className="font-serif font-bold text-slate-800 text-lg pt-4">YENİ DÖNEM: VERİ VE TEKNOLOJİ ODAKLI OTOPARK YÖNETİMİ</h3>
                      <p>
                        Sektörün vizyoner liderlerine göre otopark işletmeciliği; akıllı yönlendirme yazılımları, anlık doluluk takibi ve entegre veri analitiği sayesinde stratejik bir şehir lojistiği yönetimine dönüşmektedir. Bu teknolojik dönüşümün Türkiye geneline yayılması gerektiğinin altı çiziliyor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}
