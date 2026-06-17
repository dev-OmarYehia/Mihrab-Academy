"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

// Animated counter hook
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

const stats = [
  { value: 500, suffix: "+", label: "STUDENTS ENROLLED" },
  { value: 30, suffix: "+", label: "EXPERT SCHOLARS" },
  { value: 20, suffix: "+", label: "COUNTRIES REACHED" },
  { value: 98, suffix: "%", label: "PARENT SATISFACTION" },
];

const values = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
      </svg>
    ),
    title: "Authentic Scholarship",
    desc: "Every lesson is grounded in traditional Islamic scholarship. Our teachers hold ijazas and have studied under recognised scholars — ensuring the knowledge passed to your family is genuine and sound.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    title: "Personal Connection",
    desc: "We reject the one-size-fits-all model. Each student is paired with a teacher who understands their pace, learning style, and goals — building a relationship that goes beyond the screen.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
      </svg>
    ),
    title: "Accessible to All",
    desc: "Whether you're in London, Toronto, or Sydney, Mihrab brings qualified Islamic education directly to your home. No travel, no barriers — just consistent, structured learning wherever you are.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4"/><path d="M12 14c-6 0-8 3-8 4v1h16v-1c0-1-2-4-8-4z"/>
      </svg>
    ),
    title: "Uncompromising Excellence",
    desc: "From teacher vetting to lesson structure and progress tracking, we hold every part of the experience to the highest standard — because your child's Islamic foundation deserves nothing less.",
  },
];

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(value);
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-light text-[#c9a96e] mb-2">
        {count}{suffix}
      </div>
      <div className="text-white/50 text-xs uppercase tracking-widest">{label}</div>
    </div>
  );
}

export default function AboutPage() {
  const router = useRouter();
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

  return (
    <div className="font-serif bg-[#0f1a14] text-white min-h-screen overflow-x-hidden">

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="flex items-center justify-between px-10 py-5 fixed top-0 left-0 right-0 z-50 bg-[#1a3a2f]/80 backdrop-blur-md border-b border-[#c9a96e]/10"
      >
        <Link href="/" className="text-[#c9a96e] font-bold tracking-widest text-sm uppercase">Mihrab Academy</Link>
        <div className="hidden md:flex gap-8 text-sm text-white/70">
          {[["Home", "/"], ["Courses", "#"], ["About Us", "/about"], ["Blog", "#"]].map(([label, href]) => (
            <Link key={label} href={href}
              className={`hover:text-[#c9a96e] transition-colors duration-200 ${label === "About Us" ? "text-[#c9a96e]" : ""}`}>
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/booking" className="text-[#c9a96e] text-sm border border-[#c9a96e]/20 px-4 py-2 rounded-full hover:bg-[#5a4a2f] transition-colors">My Lessons</Link>
              <button onClick={logout} className="text-white/50 text-sm hover:text-white transition-colors">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white/60 text-sm hover:text-white transition-colors">Sign In</Link>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/signup")}
                className="bg-[#5a4a2f] hover:bg-[#6b5a3a] text-[#c9a96e] text-sm px-5 py-2 rounded-full border border-[#c9a96e]/20 transition-colors">
                Start Learning
              </motion.button>
            </>
          )}
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <section className="min-h-[70vh] bg-[#1a3a2f] flex flex-col items-center justify-center text-center px-10 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a2f] to-[#0f1a14] pointer-events-none" />
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-[#c9a96e]/5 blur-3xl pointer-events-none" />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-white/40 text-sm mb-8">
            <Link href="/" className="hover:text-[#c9a96e] transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white/70">About Us</span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-[#c9a96e] uppercase tracking-widest text-xs mb-6">Our Story</motion.p>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9 }}
            className="text-5xl md:text-7xl font-light text-white max-w-4xl leading-tight mb-6">
            Where Tradition Meets<br />
            <span className="text-[#c9a96e] italic">Modern Learning</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Mihrab Academy was founded on one conviction — that every Muslim family, wherever they are in the world, deserves access to authentic, structured Islamic education.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Built on a Simple Belief ── */}
      <section className="bg-[#0f1a14] px-10 md:px-20 py-28">
        <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">
          {/* Image with badge */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}
            className="flex-1 max-w-lg w-full relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <motion.img whileHover={{ scale: 1.04 }} transition={{ duration: 0.6 }}
                src="/vision.jpeg"
                alt="Grand mosque at dusk" className="w-full h-full object-cover" />
            </div>

          </motion.div>

          {/* Text */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }}
            className="flex-1 max-w-xl">
            <p className="text-[#c9a96e] uppercase tracking-widest text-xs mb-4">About the Platform</p>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-8 leading-tight">Built on a Simple Belief</h2>
            <div className="space-y-5 text-white/60 leading-relaxed text-base">
              <p>We started Mihrab Academy because we saw a growing need — Muslim families in the West searching for qualified scholars to teach their children, but struggling to find consistent, trustworthy, and engaging online education.</p>
              <p>The word <em className="text-white font-semibold not-italic">mihrab</em> refers to the prayer niche — the sacred focal point of a mosque, the direction a student faces their teacher. It embodies everything we stand for: intentionality, reverence, and connection to the divine through knowledge.</p>
              <p>Our platform connects students of all ages with certified, native Arabic-speaking scholars who bring the traditional method of learning — at the feet of a real teacher — directly into your home.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="bg-[#0d1510] px-10 md:px-20 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-16">
          <p className="text-[#c9a96e] uppercase tracking-widest text-xs mb-4">What We Stand For</p>
          <h2 className="text-5xl font-light text-white">Our Core Values</h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {values.map((v) => (
            <motion.div key={v.title} variants={fadeUp}
              whileHover={{ y: -6, borderColor: "rgba(201,169,110,0.3)" }}
              className="bg-[#152a20]/60 border border-white/5 rounded-2xl p-7 transition-all duration-300">
              <div className="text-[#c9a96e] mb-5 w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center">
                {v.icon}
              </div>
              <h3 className="text-white font-medium text-lg mb-3 leading-snug">{v.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-[#1a3a2f] px-10 md:px-20 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-16">
          <p className="text-[#c9a96e] uppercase tracking-widest text-xs mb-4">Our Growing Community</p>
          <h2 className="text-5xl font-light text-white">Mihrab by the Numbers</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-4xl mx-auto">
          {stats.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0d1510] px-10 md:px-20 py-28 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f1a14]/50 pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative max-w-3xl mx-auto">
          <p className="text-[#c9a96e] uppercase tracking-widest text-xs mb-6">Begin the Journey</p>
          <h2 className="text-4xl md:text-6xl font-light text-white leading-tight mb-6">
            Ready to Give Your Child an<br />Authentic Islamic Education?
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Book a free trial lesson today — no commitment, no pressure. Just a real teacher, a real student, and the beginning of something meaningful.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => router.push(user ? "/booking" : "/signup")}
              className="flex items-center justify-center gap-2 bg-[#1a3a2f] border border-[#c9a96e]/30 hover:border-[#c9a96e]/60 text-white px-8 py-4 rounded-full text-sm font-medium transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
              </svg>
              Book a Free Trial
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/#programs")}
              className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-full text-sm font-medium transition-colors">
              View Our Courses
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#1a3a2f] px-10 md:px-20 pt-20 pb-10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 mb-16">
          <div>
            <h3 className="text-[#c9a96e] font-bold tracking-widest text-sm uppercase mb-5">Mihrab Academy</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-8">Dedicated to spreading the authentic knowledge of the Quran and Sunnah, nurturing the next generation of mindful Muslims.</p>
            <blockquote className="border border-[#c9a96e]/20 rounded-xl p-5 bg-[#152a20]/50">
              <p className="text-[#c9a96e] italic text-sm leading-relaxed mb-2">&ldquo;And We have certainly made the Qur&apos;an easy for remembrance, so is there any who will remember?&rdquo;</p>
              <cite className="text-white/30 text-xs not-italic">— Surah Al-Qamar [54:17]</cite>
            </blockquote>
          </div>
          <div>
            <h4 className="text-white/30 uppercase tracking-widest text-xs mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {[["About Us", "/about"], ["Our Programs", "#"], ["Admissions", "#"], ["Blog", "#"]].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-white/60 text-sm hover:text-[#c9a96e] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white/30 uppercase tracking-widest text-xs mb-6">Legal</h4>
            <ul className="space-y-4">
              {["Privacy Policy", "Terms of Service", "Student Portal"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-white/60 text-sm hover:text-[#c9a96e] transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-[#c9a96e]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">© 2026 Mihrab Academy. All rights reserved.</p>
          <div className="flex gap-5">
            {[{ icon: "facebook", href: "https://facebook.com" }, { icon: "twitter", href: "https://x.com" }, { icon: "instagram", href: "https://instagram.com" }, { icon: "youtube", href: "https://youtube.com" }].map(({ icon, href }) => (
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
    </div>
  );
}