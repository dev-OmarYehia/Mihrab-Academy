"use client";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};


const modules = [
  { num: "01", title: "Aqeedah (Islamic Creed)", desc: "Study the fundamentals of Islamic belief — the oneness of Allah, the pillars of faith, and the correct understanding of Islamic theology as taught by the scholars of Ahlus Sunnah wal Jama'ah." },
  { num: "02", title: "Fiqh (Islamic Law)", desc: "Learn the practical rulings of Islam covering worship, transactions, and daily life. Students are taught according to the classical madhabs with a focus on understanding the wisdom behind each ruling." },
  { num: "03", title: "Seerah (Prophetic Biography)", desc: "Journey through the life of the Prophet Muhammad ﷺ in rich detail — from his birth to his final days. Students draw lessons of character, resilience, and leadership from his blessed life." },
  { num: "04", title: "Islamic Ethics & Spirituality", desc: "Explore the inner dimensions of Islam — purification of the heart, noble character, and the Islamic approach to mindfulness, gratitude, and living a life of meaning and purpose." },
];

export default function IslamicStudiesProgram() {
  const router = useRouter();
  const [user, setUser] = useState<{parentName:string}|null>(null);
  useEffect(() => { let mounted = true; const init = async () => { try { const s = localStorage.getItem("mihrab_user"); if (s && mounted) setUser(JSON.parse(s)); } catch {} }; init(); return () => { mounted = false; }; }, []);

  return (
    <div className="font-serif bg-[#0f1a14] text-white min-h-screen">
      <nav className="flex items-center justify-between px-10 py-5 fixed top-0 left-0 right-0 z-50 bg-[#1a3a2f]/80 backdrop-blur-md border-b border-[#c9a96e]/10">
        <Link href="/" className="text-[#c9a96e] font-bold tracking-widest text-sm uppercase">Mihrab Academy</Link>
        <div className="hidden md:flex gap-8 text-sm text-white/70">
          {[["Home","/"],["Courses","/#programs"],["About Us","/about"],["Blog","#"]].map(([l,h])=>(
            <Link key={l} href={h} className="hover:text-[#c9a96e] transition-colors">{l}</Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {user ? <Link href="/booking" className="text-[#c9a96e] text-sm border border-[#c9a96e]/20 px-4 py-2 rounded-full hover:bg-[#5a4a2f] transition-colors">My Lessons</Link>
          : <><Link href="/login" className="text-white/60 text-sm hover:text-white transition-colors"></Link>
            <button onClick={()=>router.push("/signup")} className="bg-[#5a4a2f] hover:bg-[#6b5a3a] text-[#c9a96e] text-sm px-5 py-2 rounded-full border border-[#c9a96e]/20 transition-colors">Start Learning</button></>}
        </div>
      </nav>

      <section className="bg-[#1a3a2f] pt-32 pb-16 px-10 md:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-white/30 text-sm mb-8">
            <Link href="/" className="hover:text-[#c9a96e] transition-colors">Home</Link><span>›</span>
            <Link href="/#programs" className="hover:text-[#c9a96e] transition-colors">Programs</Link><span>›</span>
            <span className="text-white/60">Islamic Studies</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#c9a96e]/10 flex items-center justify-center text-[#c9a96e] mb-6">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <p className="text-[#c9a96e] uppercase tracking-widest text-xs mb-3">Faith, Jurisprudence & the Sciences of Islam</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="text-5xl md:text-6xl font-light text-white">Islamic Studies</h1>
            <div className="flex gap-10">
              <div className="text-center"><div className="text-3xl font-light text-[#c9a96e]">4</div><div className="text-white/30 text-xs uppercase tracking-widest mt-1">Modules</div></div>
              <div className="text-center"><div className="text-3xl font-light text-[#c9a96e]">1‑on‑1</div><div className="text-white/30 text-xs uppercase tracking-widest mt-1">Sessions</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0d1510] px-10 md:px-20 py-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <h2 className="text-2xl font-light text-white mb-5">About This Programme</h2>
            <p className="text-white/60 leading-relaxed">Learn the concept of Islamic education from all aspects and become familiar with everything that concerns us as Muslims in our daily lives — from the pillars of belief and acts of worship, to ethics, jurisprudence, and the biography of the Prophet ﷺ. A comprehensive programme for all ages.</p>
          </div>
          <div className="md:w-72">
            <div className="bg-[#152a20]/60 border border-white/8 rounded-2xl p-6">
              <h3 className="text-white font-medium mb-5">What&apos;s Included</h3>
              <ul className="space-y-3">
                {["Aqeedah & Islamic Creed","Fiqh & Islamic Law","Seerah (Prophetic Biography)","Islamic Ethics","Free trial lesson included"].map((item)=>(
                  <li key={item} className="flex items-center gap-3 text-white/60 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0f1a14] px-10 md:px-20 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#c9a96e] uppercase tracking-widest text-xs mb-3">Programme Modules</p>
          <h2 className="text-4xl font-light text-white mb-12">What You Will Learn</h2>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 gap-5">
            {modules.map((m)=>(
              <motion.div key={m.title} variants={fadeUp} className="bg-[#152a20]/40 border border-white/8 rounded-2xl p-7">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[#c9a96e] text-xs uppercase tracking-widest">Module</span>
                  <span className="text-white/20 text-xl font-light">{m.num}</span>
                </div>
                <div className="w-8 h-px bg-[#c9a96e]/30 mb-4" />
                <h3 className="text-white font-medium mb-3">{m.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#0d1510] px-10 md:px-20 py-24 text-center">
        <p className="text-[#c9a96e] uppercase tracking-widest text-xs mb-4">Start Today</p>
        <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Ready to Begin Your <span className="text-[#c9a96e] italic">Islamic Studies</span> Journey?</h2>
        <p className="text-white/40 text-base max-w-lg mx-auto mb-10">Book a free trial session and meet your teacher before committing. No pressure, no payment required.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
  onClick={() => { trackLead(); router.push("/signup"); }}
  className="flex items-center justify-center gap-2 bg-[#1a3a2f] border border-[#c9a96e]/30 hover:border-[#c9a96e]/60 text-white px-8 py-4 rounded-full text-sm font-medium transition-colors"
>
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
  </svg>
  Book a Free Trial
</button>
          <Link href="/#programs" className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-full text-sm font-medium transition-colors">View All Programs →</Link>
        </div>
      </section>
      <footer className="bg-[#1a3a2f] px-10 md:px-20 py-10 border-t border-[#c9a96e]/10">
        <div className="flex justify-between items-center">
          <span className="text-[#c9a96e] font-bold tracking-widest text-sm uppercase">Mihrab Academy</span>
          <p className="text-white/20 text-xs">© 2026 Mihrab Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}