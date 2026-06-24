"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function IslamicHistoryArticle() {
  return (
    <div className="font-serif bg-white text-gray-900 min-h-screen">
      <nav className="flex items-center justify-between px-10 py-5 fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <Link href="/" className="text-[#c9a96e] font-bold tracking-widest text-sm uppercase">Mihrab Academy</Link>
        <div className="hidden md:flex gap-8 text-sm text-gray-600">
          {[["Home", "/"], ["Courses", "/#programs"], ["About Us", "/about"], ["Blog", "/blog"]].map(([l, h]) => (
            <Link key={l} href={h} className="hover:text-[#c9a96e] transition-colors">{l}</Link>
          ))}
        </div>
        <button onClick={() => trackLeadAndOpenWhatsApp("Hi, I'd like to book a free trial lesson!")}
          className="bg-[#5a4a2f] hover:bg-[#6b5a3a] text-[#c9a96e] text-sm px-5 py-2 rounded-full border border-[#c9a96e]/20 transition-colors">
          Start Learning
        </button>
      </nav>

      <section className="pt-20 relative h-[50vh] overflow-hidden">
        <img src="/blog/islamic-history.png" alt="Islamic History" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-white" />
        <div className="absolute bottom-8 left-10 md:left-20">
          <span className="bg-[#1a3a2f]/90 text-[#c9a96e] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-[#c9a96e]/20">Islamic History</span>
        </div>
      </section>

      <section className="bg-white px-10 md:px-20 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-8">
            <Link href="/" className="hover:text-[#c9a96e] transition-colors">Home</Link><span>›</span>
            <Link href="/blog" className="hover:text-[#c9a96e] transition-colors">Blog</Link><span>›</span>
            <span className="text-gray-500">Islamic History</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[#c9a96e] uppercase tracking-widest text-xs mb-4">12 min read</p>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-8">
              Islamic History: A Journey of<br /><span className="text-[#c9a96e] italic">Faith, Civilization &amp; Achievement</span>
            </h1>

            <div className="space-y-6 text-gray-600 leading-relaxed text-base">
              <p>Islamic history is one of the most remarkable and influential histories in the world. It is a story of faith, leadership, sacrifice, knowledge, and civilization that changed humanity forever. Beginning in the Arabian Peninsula during the 7th century, Islam quickly spread across continents and established one of the greatest civilizations in human history.</p>

              <h2 className="text-2xl font-light text-gray-900 mt-10 mb-2">Arabia Before Islam</h2>
              <p>Before Islam, Arabia was living in a period known as <em className="text-gray-700">Jahiliyyah</em>, or the Age of Ignorance. Society was based mainly on tribal systems, where loyalty to the tribe was more important than justice or morality. Wars between tribes were common and sometimes lasted for many years over small disagreements. Idol worship surrounded the Kaaba in Makkah, and social injustice was widespread.</p>

              <h2 className="text-2xl font-light text-gray-900 mt-10 mb-2">The Prophet Muhammad ﷺ</h2>
              <p>In this environment, Prophet Muhammad (Peace Be Upon Him) was born in Makkah in 570 CE. He belonged to the respected Quraysh tribe and was known among his people as <em className="text-gray-700">Al-Amin</em>, meaning "the trustworthy." At the age of forty, while meditating in the Cave of Hira, he received the first revelation from Allah through Angel Jibril (Gabriel). This marked the beginning of Islam and changed the course of world history forever.</p>

              <h2 className="text-2xl font-light text-gray-900 mt-10 mb-2">The Hijrah — A Turning Point</h2>
              <p>One of the most important turning points in Islamic history was the <em className="text-gray-700">Hijrah</em>, or migration, from Makkah to Madinah in 622 CE. This event marks the beginning of the Islamic calendar. In Madinah, Prophet Muhammad established the first Islamic state based on justice, cooperation, and religious tolerance. He built the first mosque, created brotherhood between the immigrants and the local people, and introduced the Constitution of Madinah.</p>

              <h2 className="text-2xl font-light text-gray-900 mt-10 mb-2">The Major Battles</h2>
              <p>During this period, several major battles took place between Muslims and the Quraysh. The Battle of Badr in 624 CE was the first major victory for Muslims despite being heavily outnumbered. The Battle of Uhud taught Muslims important lessons about obedience and discipline. The Battle of the Trench showed the importance of planning, unity, and cooperation.</p>

              <blockquote className="border-l-2 border-[#c9a96e] pl-6 my-8">
                <p className="text-[#c9a96e] italic text-lg">In 630 CE, Prophet Muhammad and the Muslims peacefully conquered Makkah — and instead of revenge, the Prophet forgave most of his enemies.</p>
              </blockquote>

              <h2 className="text-2xl font-light text-gray-900 mt-10 mb-2">The Rashidun Caliphate</h2>
              <p>After the death of Prophet Muhammad in 632 CE, the Rashidun Caliphate began under the four Rightly Guided Caliphs: Abu Bakr, Umar ibn Al-Khattab, Uthman ibn Affan, and Ali ibn Abi Talib. This period is considered one of the greatest eras in Islamic history because of its justice, simplicity, and devotion to Islamic principles.</p>

              <h2 className="text-2xl font-light text-gray-900 mt-10 mb-2">The Golden Age of Islam</h2>
              <p>The Abbasid Caliphate established Baghdad as the center of the Islamic world. This era became known as the Golden Age of Islam because of its incredible scientific and intellectual achievements. Muslim scholars made important discoveries in mathematics, medicine, astronomy, chemistry, and philosophy. Al-Khwarizmi developed algebra, while Ibn Sina became famous for his medical encyclopedia that influenced medicine in Europe for centuries.</p>

              <h2 className="text-2xl font-light text-gray-900 mt-10 mb-2">The Ottoman Empire</h2>
              <p>The Ottoman Empire became one of the strongest and longest-lasting Islamic empires in history, ruling for more than six hundred years. One of their greatest achievements was the conquest of Constantinople in 1453 by Sultan Mehmed II, an event that marked the end of the Byzantine Empire.</p>

              <h2 className="text-2xl font-light text-gray-900 mt-10 mb-2">Islam Today</h2>
              <p>Today, Islam is one of the largest religions in the world, followed by more than a billion people across different continents. Muslims continue contributing to education, science, technology, business, and humanitarian work. The values taught throughout Islamic history — such as justice, mercy, knowledge, patience, and unity — remain relevant and inspiring today.</p>

              <p className="mt-6">In conclusion, Islamic history is much more than the story of empires and battles. It is a journey of spiritual guidance, cultural brilliance, scientific progress, and human achievement. Understanding Islamic history helps people appreciate the contributions of Islam to humanity and learn valuable lessons about leadership, morality, and civilization.</p>
            </div>
          </motion.div>

          <div className="mt-16 bg-[#1a3a2f]/8 border border-[#c9a96e]/20 rounded-2xl p-8 text-center">
            <p className="text-[#c9a96e] uppercase tracking-widest text-xs mb-3">Learn More</p>
            <h3 className="text-2xl font-light text-gray-900 mb-3">Interested in Our History Program?</h3>
            <p className="text-gray-500 text-sm mb-6">Book a free trial lesson and explore Islamic history with a qualified teacher.</p>
            <button onClick={() => window.open("https://wa.me/201553135708?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20trial%20lesson!", "_blank")}
              className="bg-[#5a4a2f] hover:bg-[#6b5a3a] text-[#c9a96e] px-8 py-3 rounded-full text-sm border border-[#c9a96e]/20 transition-colors">
              Book a Free Trial →
            </button>
          </div>

          <div className="mt-10">
            <Link href="/blog" className="text-[#c9a96e]/60 text-sm hover:text-[#c9a96e] transition-colors">← Back to Blog</Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#1a3a2f] px-10 md:px-20 py-10 border-t border-[#c9a96e]/10">
        <div className="flex justify-between items-center">
          <span className="text-[#c9a96e] font-bold tracking-widest text-sm uppercase">Mihrab Academy</span>
          <p className="text-gray-300 text-xs">© 2026 Mihrab Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}