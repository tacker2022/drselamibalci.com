"use client";

import { useState } from "react";

interface PressLink {
  label: string;
  url: string;
}

interface PressItem {
  id: string;
  title: string;
  source: string;
  date: string;
  excerpt: string;
  imagePath: string;
  transcription: string;
  link?: string;
  links?: PressLink[];
}

const PRESS_ITEMS: PressItem[] = [
  {
    id: "lonca-dergisi-2026-haziran",
    title: "İstanbul’da Otopark Krizi Büyüyor: TODER’den Yeni Yasa Önerisi ve Kritik Uyarılar",
    source: "Lonca Dergisi",
    date: "Haziran 2026",
    excerpt: "İstanbul'daki otopark sorunu ve çözüm önerilerine yönelik hazırlanan yeni kanun önerisi hakkında TODER Yönetim Kurulu Başkanı Dr. Selami Balcı'nın açıklamaları ve değerlendirmeleri.",
    imagePath: "/press/lonca_dergisi_toder.png",
    link: "https://www.dergi.loncahaber.com/2026/05/17/182-sayi-mayis-2026-lonca-business-network-esnaf-bulteni-dergisi/#flipbook-df_815/15/",
    transcription: `
      <p class="font-medium text-slate-800">
        İstanbul’da giderek artan araç sayısı ve yetersiz otopark altyapısı, şehir yaşamını zorlaştıran en önemli sorunlardan biri haline geldi. Özellikle kentin merkezi lokasyonlarında yaşanan park yeri krizine karşı TODER'den kritik bir kanun düzenlemesi teklifi sunuldu.
      </p>
      <p>
        Uzman kadrolara göre mevcut kapasiteler, İstanbul genelindeki araç yoğunluğunu taşımaktan oldukça uzak kalıyor. Bu durum, günlük hayatta sürücülerin uzun dakikalar boyunca park yeri aramasına, dolayısıyla gereksiz yakıt sarfiyatına ve zaman kaybına yol açarak kent içi trafiği içinden çıkılmaz hale getiriyor.
      </p>
      <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3 my-6">
        <h3 class="font-serif font-bold text-slate-800 text-base">YENİ DÜZENLEME İLE NELER DEĞİŞECEK?</h3>
        <ul class="list-disc pl-5 space-y-1 text-sm">
          <li>Yeni inşa edilen binalardaki otopark zorunluluklarının sıkı denetlenmesi</li>
          <li>Mevcut pasif otopark alanlarının yüksek verimlilikle revize edilmesi</li>
          <li>Kamu ve özel sektör iş birlikleri (KÖİ) modellerinin yaygınlaştırılması</li>
          <li>Kapasite yönetimini güçlendirecek akıllı otopark yazılımlarının devreye alınması</li>
        </ul>
      </div>
      <h3 class="font-serif font-bold text-slate-800 text-lg pt-4">SORUN SADECE PARK YERİ DEĞİL</h3>
      <p>
        Otopark konusu salt araç park etmekten ibaret görülemez. Park yeri aramak amacıyla yollarda dolanan araçların trafikte oluşturduğu ek yük; karbon salınımını artırırken, çevre kirliliği ve stres gibi sosyo-ekonomik olumsuzlukları da tetikliyor.
      </p>
      <h3 class="font-serif font-bold text-slate-800 text-lg pt-4">TODER BAŞKANI DR. SELAMİ BALCI: "ARTIK AKILLI SİSTEM ŞART"</h3>
      <blockquote class="border-l-4 border-accent-600 bg-accent-50/30 p-5 rounded-r-2xl italic text-slate-700 font-serif text-base my-6">
        "Otopark yönetimi artık klasik yöntemlerle çözülebilecek bir konu değil. Veri odaklı, teknolojik ve entegre sistemlerin devreye alınması gerekiyor. Doğru planlama ve sürdürülebilir yatırımlar ile şehir içi trafik ciddi anlamda rahatlatılabilir."
      </blockquote>
      <p>
        Dr. Selami Balcı, otopark yatırımlarının şehir planlama süreçlerinin ayrılmaz bir parçası olarak görülmesi gerektiğini ve kamu ile özel sektör iş birliklerinin bu alanda kritik bir kaldıraç rolü üstleneceğini vurguladı.
      </p>
      <h3 class="font-serif font-bold text-slate-800 text-lg pt-4">YENİ DÖNEM: VERİ VE TEKNOLOJİ ODAKLI OTOPARK YÖNETİMİ</h3>
      <p>
        Sektörün vizyoner liderlerine göre otopark işletmeciliği; akıllı yönlendirme yazılımları, anlık doluluk takibi ve entegre veri analitiği sayesinde stratejik bir şehir lojistiği yönetimine dönüşmektedir. Bu teknolojik dönüşümün Türkiye geneline yayılması gerektiğinin altı çiziliyor.
      </p>
    `
  },
  {
    id: "mall-report-2026-haziran-roportaj",
    title: "Otoparkta Başlayan Memnuniyet, AVM’de Değere Dönüşüyor",
    source: "Mall Report",
    date: "Haziran 2026",
    excerpt: "ParkExpert Kurucusu Dr. Selami Balcı'nın AVM otopark işletmeciliğinde müşteri memnuniyeti, yapay zeka entegrasyonu, veri analitiği ve dijital dönüşüm vizyonunu paylaştığı kapsamlı röportaj.",
    imagePath: "/dr-selami-balci.jpg",
    links: [
      { label: "Web Makalesi", url: "https://mallreport.com.tr/2026/06/02/otoparkta-baslayan-memnuniyet-avmde-degere-donusuyor/?amp=1" },
      { label: "Dijital Dergi (Sayfa 64)", url: "https://mallreport.com.tr/2026/06/03/haziran-2026/#flipbook-df_43425/64/" },
      { label: "LinkedIn Paylaşımı", url: "https://www.linkedin.com/posts/mallreport_parkexpert-global-otopark-y%C3%B6netimi-kurucusu-share-7467555888707493890-9Gj4/?utm_source=social_share_send&utm_medium=ios_app&rcm=ACoAAFHUVm8BMD4LHvdFbaYY-Dn-VymJXh5Wym4&utm_campaign=copy_link" }
    ],
    transcription: `
      <p class="font-medium text-slate-800">
        ParkExpert Kurucusu Dr. Selami Balcı, standart otopark işletmeciliğini yapay zeka ve dijital otomasyonla yeniden tanımlayan yeni yazılımlarının detaylarını paylaşırken; plaka tanıma, esnek mobil ödeme ve akıllı yönlendirme sistemleriyle gişe kuyruklarını ve içerideki trafik sıkışıklığını tarihe gömdüklerini belirtti.
      </p>
      <h3 class="font-serif font-bold text-slate-800 text-lg pt-4">AVM otoparklarının yönetimi müşteri deneyimini nasıl etkiliyor? Sizin bu noktadaki hizmet anlayışınız nedir?</h3>
      <p>
        Ziyaretçinin AVM deneyimi mağazalarda veya yemek alanlarında değil, doğrudan otopark bariyerinde başlar. Eğer bir misafir aracına yer bulmakta zorlanır, karmaşık yönlendirmeler içinde kaybolur veya çıkışta uzun kuyruklar beklerse, içerideki mağazaların sunduğu kusursuz hizmet bile bu olumsuz ilk izlenimi silmeye yetmeyebilir. Bizim hizmet anlayışımız; ziyaretçiye stresi sıfıra indirilmiş, hızlı ve güvenli bir park deneyimi sunarken, AVM yönetimine de tüm operasyonel yükü devraldığımız şeffaf ve profesyonel bir altyapı sağlamaktır.
      </p>
      <h3 class="font-serif font-bold text-slate-800 text-lg pt-4">Yakın zamanda sektörle buluşturduğunuz ve oldukça merak edilen yeni bir yazılımınız var. Bu yazılımın temel özellikleri nelerdir ve mevcut otopark yönetiminde neleri değiştiriyor?</h3>
      <p>
        Yeni yazılımımız, standart bir otopark işletmeciliğini tamamen veri odaklı, akıllı bir ekosisteme dönüştürüyor. Amacımız sadece araçları park ettirmek değil, süreci baştan sona dijitalleştirmek. Öne çıkan bazı yeniliklerimizi şu şekilde sıralayabilirim:
      </p>
      <ul class="list-disc pl-5 space-y-1 my-4">
        <li><strong>Akıllı Yönlendirme ve Doluluk Analizi:</strong> Ziyaretçileri anlık olarak boş alanlara en kısa yoldan yönlendirerek içerideki trafik sıkışıklığını ve karbon salınımını önlüyor.</li>
        <li><strong>Gelişmiş Plaka Tanıma (LPR) Sistemi:</strong> Bilet veya kart kaybetme sorununu tamamen ortadan kaldırarak, giriş ve çıkış sürelerini saniyelere indiriyoruz.</li>
        <li><strong>Esnek Ödeme Entegrasyonları:</strong> Mobil uygulama, QR kod ve temassız ödeme seçenekleriyle gişe kuyruklarını tarihe karıştırıyoruz.</li>
        <li><strong>Gerçek Zamanlı Yönetim Paneli:</strong> AVM verileri yazılımımız üzerinden anlık doluluk oranlarını, ziyaretçi yoğunluk saatlerini ve finansal raporları tek bir ekrandan anında takip edebiliyor.</li>
      </ul>
      <h3 class="font-serif font-bold text-slate-800 text-lg pt-4">Bu teknolojik altyapının AVM yönetimlerine ve yatırımcılarına sunduğu en büyük avantaj nedir?</h3>
      <p>
        En büyük avantaj kesinlikle operasyonel şeffaflık ve ciddi bir maliyet optimizasyonu. Yazılımımızın getirdiği otomasyon sayesinde insan kaynaklı hatalar minimuma iniyor ve süreçler hızlanıyor. AVM yönetimleri, otoparkı artık bir maliyet, şikayet veya sorun merkezi olarak değil; kendi kendini kusursuz yöneten, müşteri memnuniyetini artıran ve güvenilir veri üreten dijital bir varlık olarak görüyor.
      </p>
      <h3 class="font-serif font-bold text-slate-800 text-lg pt-4">Dijital dönüşüm ziyaretçi deneyimini nasıl etkiliyor?</h3>
      <p>
        Günümüz ziyaretçisi hızlı ve sorunsuz bir deneyim bekliyor. Plaka tanıma sistemleri sayesinde çıkış noktalarında bekleme süreleri azalıyor, dijital ödeme yöntemleri sayesinde işlemler hızlanıyor ve abonelik süreçleri çevrimiçi olarak yönetilebiliyor. Bizim yaklaşımımızda amaç, yalnızca araç giriş çıkışını kontrol etmek değil; ziyaretçinin AVM’ye giriş anından çıkışına kadar kesintisiz ve konforlu bir deneyim yaşamasını sağlamaktır.
      </p>
      <h3 class="font-serif font-bold text-slate-800 text-lg pt-4">Yapay zeka ve veri analitiğinin otopark yönetimindeki rolü nedir?</h3>
      <p>
        Otoparklar aslında çok değerli verilerin üretildiği alanlardır. Yapay zeka destekli analizler sayesinde yoğunluk tahminleri yapılabiliyor, operasyonel planlamalar optimize edilebiliyor ve yatırım kararları daha sağlıklı alınabiliyor. Özellikle büyük ölçekli AVM’lerde elde edilen verilerin doğru yorumlanması; personel planlamasından kampanya yönetimine kadar birçok konuda yönetime önemli avantajlar sağlıyor.
      </p>
      <h3 class="font-serif font-bold text-slate-800 text-lg pt-4">Gelecekte AVM otoparklarını neler bekliyor?</h3>
      <p>
        Yakın gelecekte otoparklar yalnızca park alanı olmaktan çıkacak. Elektrikli araç şarj altyapıları, mobil uygulama entegrasyonları, temassız geçiş sistemleri ve yapay zeka destekli yönetim modelleri standart hale gelecek. Biz ParkExpert olarak bu dönüşümün öncülerinden biri olmayı hedefliyoruz. Teknoloji yatırımlarımızı ve yazılım geliştirme çalışmalarımızı bu vizyon doğrultusunda sürdürüyoruz. AVM’lerde otopark artık yalnızca bir operasyon kalemi değil; ziyaretçi memnuniyetini, marka algısını ve işletme verimliliğini doğrudan etkileyen stratejik bir unsurdur.
      </p>
      <h3 class="font-serif font-bold text-slate-800 text-lg pt-4">Son olarak, perakende sektörüne ve AVM yatırımcılarına mesajınız nedir?</h3>
      <p>
        Rekabetin bu kadar yoğun olduğu bir dönemde, fark yaratan şey detaylarda gizli olan ziyaretçi konforudur. Yeni yazılımımız ve uçtan uca profesyonel otopark hizmetimizle, AVM’lerin bu konforu en üst düzeye çıkarması için güvenilir bir teknoloji ortağı olmaya devam edeceğiz.
      </p>
    `
  },
  {
    id: "mall-report-2026-haziran-reklam",
    title: "ParkExpert Global Otopark Yönetimi Kurumsal Tanıtımı",
    source: "Mall Report",
    date: "Haziran 2026",
    excerpt: "Mall Report dergisinde yayınlanan, ParkExpert'in akıllı otopark çözümlerini, dijital entegrasyonlarını ve AVM/şehir lojistiği yönetim modellerini sunan 2 sayfalık kurumsal tanıtım sayfası.",
    imagePath: "/press/parkexpert_ad_mall_report.png",
    link: "https://mallreport.com.tr/2026/06/03/haziran-2026/#flipbook-df_43425/12/",
    transcription: `
      <p class="font-medium text-slate-800">
        Mall Report Haziran 2026 sayısında yayınlanan, ParkExpert'in akıllı otopark çözümlerini, dijital entegrasyonlarını ve AVM/şehir lojistiği yönetim modellerini tanıtan 2 sayfalık kurumsal tanıtım sayfası.
      </p>
      <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4 my-6">
        <h3 class="font-serif font-bold text-slate-800 text-base">TANITIM İÇERİĞİ VE DETAYLARI:</h3>
        <p class="text-sm">
          Bu kurumsal tanıtım, ParkExpert markasının geliştirdiği yapay zeka destekli otopark yönetim sistemi (OYBİS), plaka tanıma entegrasyonları, mobil ödeme teknolojileri ve müşteri memnuniyeti süreçlerini görsel ve teknik verilerle tanıtmaktadır.
        </p>
        <p class="text-sm">
          İlgili dijital tanıtıma doğrudan Mall Report e-dergisinin 12. sayfasından ulaşabilirsiniz.
        </p>
      </div>
    `
  }
];

export default function PressGallery() {
  const [activeItem, setActiveItem] = useState<PressItem | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

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

              <div className="mt-5 flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => setActiveItem(item)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-950 uppercase tracking-wider hover:text-accent-700 transition"
                >
                  <span>Küpürü Oku</span>
                  <span className="transform group-hover:translate-x-1 transition">→</span>
                </button>
                {item.links ? (
                  item.links.slice(0, 1).map((lnk, idx) => (
                    <a
                      key={idx}
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-accent-700 transition border-l border-slate-200 pl-4"
                    >
                      <span>{lnk.label}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  ))
                ) : item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-accent-700 transition border-l border-slate-200 pl-4"
                  >
                    <span>Dergiyi Oku</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                ) : null}
              </div>
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
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold text-accent-700 uppercase tracking-widest bg-accent-100/50 px-2.5 py-0.5 rounded-md">
                  {activeItem.source}
                </span>
                <span className="text-slate-400 text-xs font-medium">{activeItem.date}</span>
                {activeItem.links ? (
                  activeItem.links.map((lnk, idx) => (
                    <a
                      key={idx}
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-600 hover:text-accent-700 transition bg-white px-2.5 py-0.5 text-slate-800 rounded-md border border-slate-200 shadow-sm"
                    >
                      <span>{lnk.label}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  ))
                ) : activeItem.link ? (
                  <a
                    href={activeItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-600 hover:text-accent-700 transition bg-white px-2.5 py-0.5 rounded-md border border-slate-200 shadow-sm"
                  >
                    <span>Dergiden Orijinal Link</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                ) : null}
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
                <div 
                  className="relative max-h-full max-w-full group/image cursor-zoom-in"
                  onClick={() => setZoomedImage(activeItem.imagePath)}
                >
                  <img
                    src={activeItem.imagePath}
                    alt={activeItem.title}
                    className="max-h-[35vh] lg:max-h-[70vh] object-contain rounded-lg shadow-lg hover:scale-[1.02] transition duration-300"
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full pointer-events-none opacity-0 group-hover/image:opacity-100 transition-opacity">
                    Görseli Büyütmek İçin Tıklayın
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
                    
                    <div 
                      className="space-y-4 text-slate-600 leading-relaxed font-light text-base"
                      dangerouslySetInnerHTML={{ __html: activeItem.transcription }}
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Full screen Zoom Overlay */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-[60] bg-slate-950/90 flex items-center justify-center cursor-zoom-out p-4 animate-fade-in"
          onClick={() => setZoomedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            onClick={() => setZoomedImage(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img
            src={zoomedImage}
            alt="Büyütülmüş Görsel"
            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl animate-scale-up"
          />
        </div>
      )}
    </section>
  );
}
