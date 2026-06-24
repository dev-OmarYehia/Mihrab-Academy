"use client";

import type { Variants } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { trackLead } from "@/lib/fbPixel";
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const blogPosts = [
  { category: "QURAN", title: "How to Memorize Quran Fast & Easily", excerpt: "The Quran is the word of Allah and memorizing it is one of the greatest blessings a Muslim can achieve. With the right method, anyone can memorize it step by step.", img: "/blog/quran.png", href: "/blog/how-to-memorize-quran" },
  { category: "ISLAMIC HISTORY", title: "Islamic History: A Journey of Faith, Civilization & Achievement", excerpt: "Islamic history is one of the most remarkable and influential histories in the world — a story of faith, leadership, and civilization that changed humanity forever.", img: "/blog/islamic-history.png", href: "/blog/islamic-history" },
  { category: "HADITH & SEERAH", title: "The Hijri Calendar: The Sacred Journey and Temporal Anchor of Islam", excerpt: "For over a billion Muslims, time is measured not just by cycles of the sun, but by a profound historical turning point that altered the course of human history.", img: "/blog/hijri-calendar.jpg", href: "/blog/hijri-calendar" },
];

export default function Home() {
  const router = useRouter();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Auth state — read directly from localStorage, no context needed
  const [user, setUser] = useState<{ parentName: string } | null>(null);
  useEffect(() => {
    let mounted = true;
    const init = async () => {
      try {
        const saved = localStorage.getItem("mihrab_user");
        if (saved && mounted) setUser(JSON.parse(saved));
      } catch {}
    };
    init();
    return () => { mounted = false; };
  }, []);
  const logout = () => {
    localStorage.removeItem("mihrab_token");
    localStorage.removeItem("mihrab_user");
    setUser(null);
    router.push("/");
  };

  // Contact form
  const [contact, setContact] = useState({ fullName: "", email: "", phone: "", message: "", programs: [] as string[] });
  const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [contactError, setContactError] = useState("");

  const toggleProgram = (program: string) => {
    setContact((prev) => ({
      ...prev,
      programs: prev.programs.includes(program)
        ? prev.programs.filter((p) => p !== program)
        : [...prev.programs, program],
    }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleContactSubmit = () => {
    if (!contact.fullName || !contact.email || !contact.message) {
      setContactStatus("error");
      setContactError("Please fill in your name, email, and message.");
      return;
    }
    setContactStatus("loading");
    setContactError("");

    const text =
      `Hi, I'd like to get in touch with Mihrab Academy.\n\n` +
      `*Name:* ${contact.fullName}\n` +
      `*Email:* ${contact.email}\n` +
      (contact.phone ? `*Phone:* ${contact.phone}\n` : "") +
      (contact.programs.length > 0 ? `*Programs:* ${contact.programs.join(", ")}\n` : "") +
      `*Message:* ${contact.message}`;

    const url = `https://wa.me/201553135708?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");

    setContactStatus("success");
    setContact({ fullName: "", email: "", phone: "", message: "", programs: [] });
  };

  const goToBooking = () => router.push(user ? "/booking" : "/signup");

  return (
    <div className="font-serif bg-[#0f1a14] text-white min-h-screen overflow-x-hidden">

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="flex items-center justify-between px-10 py-5 fixed top-0 left-0 right-0 z-50 bg-[#1a3a2f]/80 backdrop-blur-md border-b border-[#c9a96e]/10"
      >
        <span className="text-[#c9a96e] font-bold tracking-widest text-sm uppercase">Mihrab Academy</span>
        <div className="hidden md:flex gap-8 text-sm text-white/70">
          {[["Home", "/"], ["Courses", "#programs"], ["About Us", "/about"], ["Blog", "/blog"]].map(([label, href], i) => (
            <motion.a key={label} href={href} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }} className="hover:text-[#c9a96e] transition-colors duration-200">
              {label}
            </motion.a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/booking" className="text-[#c9a96e] text-sm border border-[#c9a96e]/20 px-4 py-2 rounded-full hover:bg-[#5a4a2f] transition-colors">
                My Lessons
              </Link>
              <button onClick={logout} className="text-[#a8c5a0]/60 text-sm hover:text-white transition-colors">Logout</button>
            </>
          ) : (
            <>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => { trackLead(); router.push("/signup"); }}
                className="bg-[#5a4a2f] hover:bg-[#6b5a3a] text-[#c9a96e] text-sm px-5 py-2 rounded-full border border-[#c9a96e]/20 transition-colors">
                Start Learning
              </motion.button>
            </>
          )}
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <section ref={heroRef} className="min-h-screen bg-[#1a3a2f] flex items-center px-10 md:px-20 pt-24 pb-16 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-[#a8c5a0]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-72 h-72 rounded-full bg-[#c9a96e]/5 blur-3xl pointer-events-none" />
        <div className="absolute top-40 left-1/2 w-80 h-80 rounded-full bg-[#2d6a4f]/15 blur-3xl pointer-events-none" />
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-12">
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex-1 max-w-xl">
            <motion.p variants={fadeUp} className="text-[#a8c5a0] uppercase tracking-widest text-xs mb-6">Mihrab Academy</motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl leading-tight font-light text-white">
              Learn Qur&apos;an<br />with<br /><span className="text-[#c9a96e] italic">Proper Guidance</span>
            </motion.h1>
            <motion.div variants={fadeUp} className="flex gap-4 mt-10">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 bg-[#5a4a2f] text-[#c9a96e] border border-[#c9a96e]/20 px-6 py-3 rounded-full text-sm">
                Explore Courses <span>→</span>
              </motion.button>
              <motion.button whileHover={{ color: "#a8c5a0" }} onClick={goToBooking} className="text-white/70 text-sm px-6 py-3">
                
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.92, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }} className="flex-1 max-w-lg w-full">
            <div className="rounded-3xl overflow-hidden aspect-[1/1] ring-1 ring-[#a8c5a0]/20">
              <img src="/interface.jpeg" alt="Student reading Quran" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Vision ── */}
      <section className="bg-[#0f1a14] px-10 md:px-20 py-28">
        <div className="flex flex-col md:flex-row items-center gap-16 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="flex-1 max-w-lg w-full">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] ring-1 ring-[#a8c5a0]/15">
              <motion.img whileHover={{ scale: 1.04 }} transition={{ duration: 0.6 }}
                src="/vision.jpeg" alt="Grand mosque" className="w-full h-full object-cover" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }} className="flex-1 max-w-xl">
            <h2 className="text-5xl font-light text-white mb-8">Vision</h2>
            <div className="space-y-5 text-[#a8c5a0]/70 leading-relaxed">
              <p>Mihrab is a comprehensive online learning platform that aims to teach the Holy Quran, Islam, and Arabic language skills.</p>
              <p>Experience a new and unique learning experience for your children online.</p>
              <p className="font-semibold text-white/90">Learn Quran, Islamic Studies, and Arabic online with trusted teachers.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Programs ── */}
      <section id="programs" className="bg-[#0d1510] px-10 md:px-20 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-[#c9a96e] uppercase tracking-widest text-xs mb-4">What We Offer</p>
          <h2 className="text-5xl font-light text-white mb-4">Our Programs</h2>
          <p className="text-white/40 text-sm max-w-xl mx-auto leading-relaxed">
            Comprehensive Islamic education designed for all ages and levels — from the first letter of the Quran to advanced scholarship.
          </p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {[
            { num: "01", title: "Quran Program", sub: "READ, MEMORISE & UNDERSTAND THE HOLY QURAN", desc: "Here you will find the difference in learning the Holy Qur'an in terms of reading, memorising, and Tajweed...", modules: 3, href: "/programs/quran",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg> },
            { num: "02", title: "Arabic Language", sub: "LEARN THE LANGUAGE OF THE QURAN YOUR WAY", desc: "The language of the Qur'an — and the most wonderful language of all time. Here you can learn according...", modules: 4, href: "/programs/arabic",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/></svg> },
            { num: "03", title: "Islamic Studies", sub: "FAITH, JURISPRUDENCE & THE SCIENCES OF ISLAM", desc: "Learn the concept of Islamic education from all aspects and become familiar with everything...", modules: 4, href: "/programs/islamic-studies",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
            { num: "04", title: "History Program", sub: "KNOW YOUR HERITAGE — BUILT ON FACTS", desc: "Herein lies the difference: we learn about historical events that are absent from our children — and...", modules: 3, href: "/programs/history",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
          ].map((p) => (
            <motion.div key={p.title} variants={fadeUp}
              whileHover={{ y: -4, borderColor: "rgba(201,169,110,0.25)" }}
              onClick={() => router.push(p.href)}
              className="bg-[#152a20]/40 border border-white/8 rounded-2xl p-6 transition-all duration-300 group cursor-pointer flex flex-col">
              {/* Top row: icon + number */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-9 h-9 rounded-lg bg-[#c9a96e]/10 flex items-center justify-center text-[#c9a96e]">
                  {p.icon}
                </div>
                <span className="text-white/20 text-2xl font-light">{p.num}</span>
              </div>
              {/* Title + subtitle */}
              <h3 className="text-white font-semibold text-lg mb-1">{p.title}</h3>
              <p className="text-[#c9a96e] text-[10px] uppercase tracking-widest mb-4">{p.sub}</p>
              {/* Description */}
              <p className="text-white/40 text-sm leading-relaxed flex-1">{p.desc}</p>
              {/* Footer */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <span className="text-white/30 text-xs">{p.modules} modules</span>
                <span className="text-[#c9a96e] text-sm group-hover:translate-x-1 transition-transform duration-200">
                  Explore →
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="bg-[#1a3a2f] px-10 md:px-20 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5a4a2f]/40 to-transparent pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14 relative">
          <p className="text-[#a8c5a0] uppercase tracking-widest text-xs mb-3">Why Us</p>
          <h2 className="text-5xl font-light text-white">Why Choose Us</h2>
          <p className="text-[#a8c5a0]/50 mt-4 max-w-xl mx-auto text-sm">We provide a structured and modern way to learn Islamic knowledge effectively.</p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto relative">
          {[
            { title: "Qualified Teachers", desc: "Learn from experienced and certified instructors with decades of expertise." },
            { title: "Structured Learning", desc: "Step-by-step curriculum thoughtfully designed for all levels." },
            { title: "Flexible Schedule", desc: "Learn anytime from anywhere at your own pace." },
          ].map((f) => (
            <motion.div key={f.title} variants={fadeUp} whileHover={{ x: 4 }} className="border-t border-[#a8c5a0]/20 pt-6">
              <h3 className="text-[#c9a96e] text-lg font-medium mb-3">{f.title}</h3>
              <p className="text-[#a8c5a0]/60 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Contact ── */}
      <section className="bg-[#0d1510] px-10 md:px-20 py-24">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-5xl mx-auto flex flex-col md:flex-row rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
          {/* Left —  panel */}
          <div className="bg-[#1a3a2f] p-10 md:w-2/5 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-light text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-10">Have questions? Our admissions team will guide you.</p>
            </div>
            <div className="space-y-6">
              {[
                { icon: "📞", label: "Call Us", value: "+20 15 53135708", href: "tel:+201553135708" },
                { icon: "💬", label: "WhatsApp", value: "+20 15 53135708", href: "https://wa.me/201553135708" },
                { icon: "✉️", label: "Email", value: "contact@mihrabacademy.org", href: "mailto:contact@mihrabacademy.org" },
              ].map((item) => (
                <motion.a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ x: 4 }} className="flex items-start gap-4 cursor-pointer group">
                  <span className="text-[#c9a96e] text-lg mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-widest">{item.label}</p>
                    <p className="text-[#8a7340] text-sm font-medium group-hover:underline">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right — dark panel */}
          <div className="bg-[#0d1a12] p-10 flex-1 space-y-5">
            {contactStatus === "success" ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="text-6xl mb-5">✅</div>
                <h3 className="text-white text-2xl font-light mb-2">Opening WhatsApp...</h3>
                <p className="text-[#a8c5a0]/60 text-sm max-w-xs">Jazakum Allah Khayran. Continue the conversation on WhatsApp to finish sending your message.</p>
                <button onClick={() => setContactStatus("idle")} className="mt-8 text-[#c9a96e] text-sm hover:underline">Send another message</button>
              </motion.div>
            ) : (
              <>
                {contactStatus === "error" && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm px-4 py-3 rounded-xl">
                    {contactError}
                  </motion.div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", name: "fullName", placeholder: "Hamza Mohamed", type: "text" },
                    { label: "Email Address", name: "email", placeholder: "Hamza@example.com", type: "email" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-[#a8c5a0]/70 text-xs mb-2">{field.label} <span className="text-red-400">*</span></label>
                      <input name={field.name} type={field.type} placeholder={field.placeholder}
                        value={contact[field.name as keyof typeof contact]} onChange={handleContactChange}
                        className="w-full bg-[#152a20] border border-[#a8c5a0]/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#a8c5a0]/40 transition-colors" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-[#a8c5a0]/70 text-xs mb-2">Phone Number</label>
                  <input name="phone" type="text" placeholder="+17759865200" value={contact.phone} onChange={handleContactChange}
                    className="w-full bg-[#152a20] border border-[#a8c5a0]/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#a8c5a0]/40 transition-colors" />
                </div>
                <div>
                  <label className="block text-[#a8c5a0]/70 text-xs mb-2">Programs you&apos;re interested in</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Quran Program", "Arabic Language", "Islamic Studies", "History Program"].map((program) => {
                      const selected = contact.programs.includes(program);
                      return (
                        <button
                          key={program}
                          type="button"
                          onClick={() => toggleProgram(program)}
                          className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm border transition-colors text-left ${
                            selected
                              ? "bg-[#1a3a2f] border-[#c9a96e]/50 text-[#c9a96e]"
                              : "bg-[#152a20] border-[#a8c5a0]/10 text-white/70 hover:border-[#a8c5a0]/30"
                          }`}
                        >
                          <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            selected ? "bg-[#c9a96e] border-[#c9a96e]" : "border-[#a8c5a0]/30"
                          }`}>
                            {selected && (
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#152a20" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </span>
                          {program}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-[#a8c5a0]/70 text-xs mb-2">What time do you prefer <span className="text-red-400">*</span></label>
                  <textarea name="message" rows={4} placeholder="Ex: From 9am To 3pm" value={contact.message} onChange={handleContactChange}
                    className="w-full bg-[#152a20] border border-[#a8c5a0]/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#a8c5a0]/40 transition-colors resize-none" />
                </div>
                <motion.button onClick={handleContactSubmit} disabled={contactStatus === "loading"}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#1a3a2f] border border-[#a8c5a0]/20 text-white py-3.5 rounded-lg text-sm font-medium hover:border-[#a8c5a0]/50 transition-colors disabled:opacity-50">
                  {contactStatus === "loading" ? "Opening WhatsApp..." : "Send Message"}
                </motion.button>
              </>
            )}
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#1a3a2f] px-10 md:px-20 pt-20 pb-10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#a8c5a0]/30 to-transparent" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 mb-16">
          <div>
            <h3 className="text-[#c9a96e] font-bold tracking-widest text-sm uppercase mb-5">Mihrab Academy</h3>
            <p className="text-[#a8c5a0]/50 text-sm leading-relaxed mb-8">Dedicated to spreading the authentic knowledge of the Quran and Sunnah, nurturing the next generation of mindful Muslims.</p>
            <blockquote className="border border-[#a8c5a0]/20 rounded-xl p-5 bg-[#152a20]/50">
              <p className="text-[#c9a96e] italic text-sm leading-relaxed mb-2">&ldquo;And We have certainly made the Qur&apos;an easy for remembrance, so is there any who will remember?&rdquo;</p>
              <cite className="text-[#a8c5a0]/40 text-xs not-italic">— Surah Al-Qamar [54:17]</cite>
            </blockquote>
          </div>
          <div>
            <h4 className="text-[#a8c5a0]/40 uppercase tracking-widest text-xs mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {[["About Us", "/about"], ["Our Programs", "#"], ["Book a Lesson", "/booking"], ["Blog", "/blog"]].map(([label, href]) => (
                <li key={label}><Link href={href} className="text-[#a8c5a0]/70 text-sm hover:text-[#c9a96e] transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

        </div>
        <div className="border-t border-[#c9a96e]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">© 2026 Mihrab Academy. All rights reserved.</p>
          <div className="flex gap-5">
            {[{ icon: "facebook", href: "https://www.facebook.com/share/1EJ47zkcpc/" }, { icon: "twitter", href: "https://x.com" }, { icon: "instagram", href: "https://www.instagram.com/mihrab_academy1?utm_source=qr&igsh=MTlycWJueDZiMzBmZA==" }, { icon: "youtube", href: "https://youtube.com" }].map(({ icon, href }) => (
              <motion.a key={icon} href={href} target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#c9a96e" }} className="text-white/30 text-sm transition-colors">
                {icon === "facebook" && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>}
                {icon === "twitter" && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>}
                {icon === "instagram" && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>}
                {icon === "youtube" && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>}
              </motion.a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Claim Free Trial Popup ── */}
      <FreeTrialPopup onBook={goToBooking} />

      {/* ── WhatsApp FAB ── */}
      <motion.a href="https://wa.me/201553135708" target="_blank" rel="noopener noreferrer"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg z-50">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.057 23.214a.75.75 0 00.921.921l5.355-1.476A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.715 9.715 0 01-4.952-1.355l-.355-.212-3.683 1.015 1.015-3.683-.212-.355A9.715 9.715 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
      </motion.a>
    </div>
  );
}

// ── Free Trial Popup Component ────────────────────────────────
function FreeTrialPopup({ onBook }: { onBook: () => void }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-24 right-6 z-50 w-80 bg-[#0f1a14] border border-[#c9a96e]/20 rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#c9a96e]/10">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
          </div>
          <span className="text-white font-medium text-sm">Claim Your Free Trial</span>
        </div>
        <button onClick={() => { setVisible(false); setDismissed(true); }}
          className="text-white/40 hover:text-white transition-colors text-lg leading-none">×</button>
      </div>

      {/* Body */}
      <div className="px-4 py-4">
        <p className="text-white/70 text-sm leading-relaxed mb-1">
          Give your child the gift of authentic Islamic education. Join{" "}
          <strong className="text-white">hundreds of families</strong> already learning Quran,
          Arabic & Seerah with expert teachers — completely online.
        </p>
        <p className="text-[#c9a96e] text-sm font-semibold mt-3 mb-4">
          Your first lesson is on us. No commitment.
        </p>
        <div className="flex gap-2">
          <a href="https://wa.me/201553135708" target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm py-2.5 rounded-xl font-medium transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
            WhatsApp
          </a>
          <button onClick={() => { onBook(); setVisible(false); }}
            className="flex-1 flex items-center justify-center gap-2 bg-[#1a3a2f] border border-[#c9a96e]/20 hover:border-[#c9a96e]/50 text-white text-sm py-2.5 rounded-xl font-medium transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            Message Us  
          </button>
        </div>
      </div>
    </motion.div>
  );
}