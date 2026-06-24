"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HowToMemorizeQuran() {
  return (
    <div className="font-serif bg-white text-gray-900 min-h-screen">
      {/* Navbar */}
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

      {/* Hero Image */}
      <section className="pt-20 relative h-[50vh] overflow-hidden">
        <img src="/blog/quran.png" alt="How to Memorize Quran" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-white" />
        <div className="absolute bottom-8 left-10 md:left-20">
          <span className="bg-[#1a3a2f]/90 text-[#c9a96e] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-[#c9a96e]/20">Quran</span>
        </div>
      </section>

      {/* Article */}
      <section className="bg-white px-10 md:px-20 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-8">
            <Link href="/" className="hover:text-[#c9a96e] transition-colors">Home</Link><span>›</span>
            <Link href="/blog" className="hover:text-[#c9a96e] transition-colors">Blog</Link><span>›</span>
            <span className="text-gray-500">How to Memorize Quran</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[#c9a96e] uppercase tracking-widest text-xs mb-4">4 min read</p>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-8">
              How to Memorize Quran<br /><span className="text-[#c9a96e] italic">Fast &amp; Easily</span>
            </h1>

            <div className="prose prose-invert max-w-none space-y-6 text-gray-600 leading-relaxed text-base">
              <p>
                The Quran is the word of Allah and memorizing it is one of the greatest blessings a Muslim can achieve. To memorize the Quran fast and easily, a person should first make a sincere intention for Allah and set a daily memorization schedule.
              </p>
              <p>
                Repetition is the key to strong memorization, so reading the same verses many times helps fix them in the heart and mind. Listening to skilled reciters also improves pronunciation and makes memorization easier.
              </p>

              {/* Hadith highlight */}
              <blockquote className="border-l-2 border-[#c9a96e] pl-6 my-8">
                <p className="text-[#c9a96e] italic text-lg">"The best among you are those who learn the Quran and teach it."</p>
                <cite className="text-gray-400 text-sm not-italic mt-2 block">— Prophet Muhammad ﷺ (Sahih al-Bukhari)</cite>
              </blockquote>

              <p>
                It is also important to revise old memorization every day so it is not forgotten. Choosing a quiet place, understanding the meanings of verses, and making dua to Allah for help can greatly improve progress.
              </p>

              <h2 className="text-2xl font-light text-gray-900 mt-10 mb-4">Tips for Effective Memorization</h2>
              <ul className="space-y-3">
                {[
                  "Make a sincere intention (niyyah) for the sake of Allah",
                  "Set a consistent daily memorization schedule",
                  "Repeat each verse at least 20 times before moving on",
                  "Listen to skilled reciters to improve pronunciation",
                  "Revise previous memorization every single day",
                  "Choose a quiet, distraction-free environment",
                  "Understand the meaning of the verses you are memorizing",
                  "Make dua to Allah regularly and ask for His help",
                  "Be patient — consistency matters more than speed",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2" className="mt-0.5 shrink-0"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8">
                With patience, consistency, and trust in Allah, anyone can memorize the Quran step by step and feel its beauty changing their life forever. The journey of memorization is itself a form of worship — every moment you spend with the words of Allah brings you closer to Him.
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <div className="mt-16 bg-[#1a3a2f]/8 border border-[#c9a96e]/20 rounded-2xl p-8 text-center">
            <p className="text-[#c9a96e] uppercase tracking-widest text-xs mb-3">Begin Your Journey</p>
            <h3 className="text-2xl font-light text-gray-900 mb-3">Ready to Start Memorizing with a Teacher?</h3>
            <p className="text-gray-500 text-sm mb-6">Book a free trial lesson and begin your Quran memorization journey with a qualified teacher.</p>
            <button onClick={() => window.open("https://wa.me/201553135708?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20trial%20lesson!", "_blank")}
              className="bg-[#5a4a2f] hover:bg-[#6b5a3a] text-[#c9a96e] px-8 py-3 rounded-full text-sm border border-[#c9a96e]/20 transition-colors">
              Book a Free Trial →
            </button>
          </div>

          {/* Back */}
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