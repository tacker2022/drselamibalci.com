"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "Otopark yönetimi nedir?",
    answer: "Otopark yönetimi, kentsel alanlarda araçların düzenli, güvenli ve verimli bir şekilde park etmesini sağlayan fiziksel, operasyonel ve teknolojik süreçlerin bütünüdür. Modern şehircilikte otopark yönetimi, sadece boş alan bulmaktan ibaret olmayıp; akıllı yönlendirme sistemleri, doluluk takipleri, mobil ödemeler ve veri analitiği entegrasyonuyla şehir trafiğini rahatlatan stratejik bir disiplindir."
  },
  {
    question: "AVM otopark işletmeciliği nasıl yapılır?",
    answer: "AVM otopark işletmeciliği, müşteri konforu ve operasyonel verimlilik odağında yürütülür. Giriş-çıkış plaka tanıma sistemleri (PTS), doluluk yönlendirme ekranları, UKOME kurallarına uygun fiyatlandırma, 7/24 güvenlik denetimleri ve akıllı otopark yönetim yazılımları entegre edilerek yapılır. Amaç, ziyaretçilerin otoparka hızlıca girmesini, yer bulmasını ve güvenle ayrılmasını sağlamaktır."
  },
  {
    question: "UKOME 0-3 saat ücretsiz otopark kuralı nedir?",
    answer: "İstanbul Büyükşehir Belediyesi Ulaşım Koordinasyon Merkezi (UKOME) kararına göre, alışveriş merkezlerinin (AVM) otoparkları, ziyaretçilere ilk 0-3 saat süresince ücretsiz olarak hizmet vermek zorundadır. Bu kural, AVM'lerin çevresindeki yollarda otopark kaynaklı trafik yoğunluğunu azaltmak ve tüketici haklarını korumak amacıyla getirilmiş yasal bir zorunluluktur."
  },
  {
    question: "TODER nedir ve ne amaçla kurulmuştur?",
    answer: "TODER (Tüm Otopark Entegratörleri, Yatırımcıları ve İşletmecileri Derneği), otopark sektöründeki paydaşları tek çatı altında toplayan mesleki sivil toplum kuruluşudur. Türkiye genelinde otopark işletmeciliği standartlarını yükseltmek, akıllı şehir teknolojileri entegrasyonunu teşvik etmek, yasal düzenleme süreçlerinde sektörü temsil etmek ve sürdürülebilir kentsel mobilitenin gelişmesine katkı sağlamak amacıyla kurulmuştur. Dr. Selami Balcı, derneğin kurucu yönetim kurulu başkanıdır."
  }
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="container max-w-4xl mx-auto px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="text-center mb-16 space-y-4">
        <span className="text-accent-700 font-bold tracking-widest uppercase text-xs bg-accent-50 px-3 py-1 rounded-full">
          GEO & Bilgi Bankası
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif">
          Sıkça Sorulan Sorular
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto font-light">
          Şehircilik, otopark yönetimi ve yasal düzenlemeler hakkında bilmek istedikleriniz.
        </p>
      </div>

      <div className="space-y-4">
        {FAQ_DATA.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div
              key={index}
              className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 md:px-8 flex justify-between items-center gap-4 hover:bg-slate-50/50 transition-colors"
              >
                <span className="font-serif font-semibold text-lg md:text-xl text-slate-800 hover:text-accent-700 transition-colors">
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-accent-100 text-accent-700' : 'text-slate-500'}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] border-t border-slate-100' : 'max-h-0'}`}
              >
                <div className="p-6 md:p-8 text-slate-600 leading-relaxed text-base font-light">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
