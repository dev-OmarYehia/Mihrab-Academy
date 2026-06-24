"use client";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { trackLead } from "@/lib/fbPixel";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};


const modules = [
  {
    num: "01",
    title: "Islamic History",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
    desc: "Students explore the complete history of Islam from its very beginnings to the present day — including the early conquests, pivotal battles, great victories, periods of prosperity, and periods of weakness experienced by the Islamic state. A sweeping, honest account of a civilisation that shaped the world.",
  },
  {
    num: "02",
    title: "Arab History",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    desc: "Students learn about the Arabian Peninsula — its pre-Islamic history, its transformation under Islam, and the division and unification of its states across the centuries. A foundational module for understanding the roots of the Arab world and its enduring place in global history.",
  },
  {
    num: "03",
    title: "European History",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
    desc: "Students learn about the history of European countries in a clear and comprehensive manner — from the medieval period and the Crusades through to the Renaissance, the Age of Empires, and the modern era. Understanding European history enriches students' ability to see the world and Islam's place within it.",
  },
];

export default function HistoryProgram() {
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
            <span className="text-white/60">History Program</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#c9a96e]/10 flex items-center justify-center text-[#c9a96e] mb-6">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <p className="text-[#c9a96e] uppercase tracking-widest text-xs mb-3">Know Your Heritage — Built on Facts</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="text-5xl md:text-6xl font-light text-white">History Program</h1>
            <div className="flex gap-10">
              <div className="text-center"><div className="text-3xl font-light text-[#c9a96e]">3</div><div className="text-white/30 text-xs uppercase tracking-widest mt-1">Modules</div></div>
              <div className="text-center"><div className="text-3xl font-light text-[#c9a96e]">1‑on‑1</div><div className="text-white/30 text-xs uppercase tracking-widest mt-1">Sessions</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0d1510] px-10 md:px-20 py-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <h2 className="text-2xl font-light text-white mb-5">About This Programme</h2>
            <p className="text-white/60 leading-relaxed">Herein lies the difference: we learn about historical events that are absent from our children — and from many adults too. Islamic history is not just dates and battles; it is a living record of faith, sacrifice, and civilisation. Our programme brings these stories to life with authenticity and depth.</p>
          </div>
          <div className="md:w-72">
            <div className="bg-[#152a20]/60 border border-white/8 rounded-2xl p-6">
              <h3 className="text-white font-medium mb-5">What&apos;s Included</h3>
              <ul className="space-y-3">
                {["Islamic History","Arab History","European History","1-on-1 sessions with scholars","Free trial lesson included"].map((item)=>(
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
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-5">
            {modules.map((m)=>(
              <motion.div key={m.title} variants={fadeUp} className="bg-[#1a1a0f]/80 border border-white/6 rounded-2xl p-7 flex flex-col">
                {/* Icon + Number row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="text-[#c9a96e]/80">{m.icon}</div>
                  <span className="text-white/20 text-2xl font-light">{m.num}</span>
                </div>
                {/* Gold divider */}
                <div className="w-8 h-px bg-[#c9a96e]/40 mb-5" />
                {/* Title */}
                <h3 className="text-white font-medium text-lg mb-3">{m.title}</h3>
                {/* Description */}
                <p className="text-white/45 text-sm leading-relaxed flex-1">{m.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#0d1510] px-10 md:px-20 py-24 text-center">
        <p className="text-[#c9a96e] uppercase tracking-widest text-xs mb-4">Start Today</p>
        <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Ready to Begin Your <span className="text-[#c9a96e] italic">History Program</span> Journey?</h2>
        <p className="text-white/40 text-base max-w-lg mx-auto mb-10">Book a free trial session and meet your teacher before committing. No pressure, no payment required.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
  onClick={() => router.push("/signup")}
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