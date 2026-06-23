"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { trackLeadAndOpenWhatsApp } from "@/lib/fbPixel";

export default function HijriCalendarArticle() {
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
  <img src="/scc.png" alt="The Hijri Calendar" className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-white" />
  <div className="absolute bottom-8 left-10 md:left-20">
    <span className="bg-[#1a3a2f]/90 text-[#c9a96e] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-[#c9a96e]/20">Hadith &amp; Seerah</span>
  </div>
</section>

      <section className="bg-white px-10 md:px-20 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-8">
            <Link href="/" className="hover:text-[#c9a96e] transition-colors">Home</Link><span>›</span>
            <Link href="/blog" className="hover:text-[#c9a96e] transition-colors">Blog</Link><span>›</span>
            <span className="text-gray-500">The Hijri Calendar</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[#c9a96e] uppercase tracking-widest text-xs mb-4">7 min read</p>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-8">
              The Hijri Calendar:<br /><span className="text-[#c9a96e] italic">The Sacred Journey and Temporal Anchor of Islam</span>
            </h1>

            <div className="space-y-6 text-gray-600 leading-relaxed text-base">
              <p>For over a billion Muslims around the globe, time is measured not just by the cycles of the sun, but by a profound historical turning point that altered the course of human history. The Islamic calendar, known as the Hijri calendar, is more than just a tool for tracking days; it is a spiritual compass, a cultural anchor, and a living testament to the resilience of the early Muslim community.</p>

              <h2 className="text-2xl font-light text-gray-900 mt-10 mb-2">The Story of the Hijrah</h2>
              <p>In the 7th century CE, the Prophet Muhammad (peace be upon him) and his early followers faced intense persecution, boycotts, and torture by the ruling tribes of Mecca for preaching the message of monotheism. For thirteen years, they endured these hardships with patience. However, when the oppression reached a boiling point and a plot to assassinate the Prophet was uncovered, divine permission was given to migrate.</p>
              <p>The destination was Yathrib (later renamed Madinah al-Munawwarah — The Enlightened City), a city some 320 kilometers north of Mecca, whose inhabitants had pledged to protect the Prophet.</p>

              <h2 className="text-2xl font-light text-gray-900 mt-10 mb-2">The Great Escape</h2>
              <p>The migration, which took place in 622 CE, was filled with suspense and divine intervention. On the night of the escape, the Prophet's young cousin, Ali ibn Abi Talib, bravely slept in the Prophet's bed to deceive the assassins surrounding the house.</p>

              <blockquote className="border-l-2 border-[#c9a96e] pl-6 my-8">
                <p className="text-[#c9a96e] italic text-lg">The Prophet and Abu Bakr hid in the Cave of Thawr for three days. When trackers reached the mouth of the cave, a spider had miraculously spun a web across the entrance — making it appear undisturbed.</p>
              </blockquote>

              <p>The Hijrah was not a flight of cowardice, but a strategic move that allowed the first Islamic state to be established, built on the foundations of justice, brotherhood, and religious freedom.</p>

              <h2 className="text-2xl font-light text-gray-900 mt-10 mb-2">The Establishment of the Calendar</h2>
              <p>The Hijri calendar was instituted during the reign of the second Caliph, Umar ibn al-Khattab, in the year 639 CE. As the Islamic empire expanded, governors needed a standardized way to date official documents. Ali ibn Abi Talib suggested that the Hijrah should mark the beginning of the era, as it was the definitive event that separated truth from falsehood. Umar agreed, and thus, the year 622 CE became 1 AH (Anno Hegirae — Year of the Hijrah).</p>

              <h2 className="text-2xl font-light text-gray-900 mt-10 mb-2">Why the Hijri Calendar is Crucial for Muslims</h2>
              <p>The Hijri calendar is a purely lunar calendar, consisting of 12 months based on the motion of the moon. It spans roughly 354 or 355 days, making it 10 to 11 days shorter than the solar Gregorian calendar.</p>

              <div className="bg-[#1a3a2f]/5 border border-[#c9a96e]/15 rounded-xl p-6 my-6">
                <h3 className="text-[#c9a96e] font-medium mb-4">Sacred Rituals Tied to the Hijri Calendar</h3>
                <ul className="space-y-3">
                  {[
                    { name: "Ramadan", desc: "The holy month of fasting" },
                    { name: "Eid al-Fitr & Eid al-Adha", desc: "The two major Islamic celebrations" },
                    { name: "Hajj (Pilgrimage)", desc: "Performed in Dhu al-Hijjah" },
                  ].map((item) => (
                    <li key={item.name} className="flex items-start gap-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2" className="mt-0.5 shrink-0"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                      <span><strong className="text-gray-900">{item.name}</strong> — {item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <h2 className="text-2xl font-light text-gray-900 mt-10 mb-2">The Wisdom of Moving Seasons</h2>
              <p>Because the lunar year is shorter than the solar year, Islamic months rotate through all the solar seasons over a cycle of about 33 years. This holds profound divine wisdom — it ensures that Muslims worldwide experience fasting in Ramadan during different seasons, ensuring fairness in hardship and reward across different hemispheres.</p>

              <h2 className="text-2xl font-light text-gray-900 mt-10 mb-2">Conclusion</h2>
              <p>The Hijri calendar is not merely an ancient system for counting days; it is a continuous celebration of a journey that reshaped the world. It reminds every Muslim that after every hardship (Mecca), there is a breakthrough and a place of peace (Madinah). By tracking the silver crescent of the moon month after month, Muslims remain spiritually connected to their Creator, their history, and each other.</p>
            </div>
          </motion.div>

          <div className="mt-16 bg-[#1a3a2f]/8 border border-[#c9a96e]/20 rounded-2xl p-8 text-center">
            <p className="text-[#c9a96e] uppercase tracking-widest text-xs mb-3">Learn More</p>
            <h3 className="text-2xl font-light text-gray-900 mb-3">Explore Islamic History with Us</h3>
            <p className="text-gray-500 text-sm mb-6">Book a free trial lesson and deepen your knowledge of Islamic history and civilization.</p>
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