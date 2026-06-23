"use client";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { trackLeadAndOpenWhatsApp } from "@/lib/fbPixel";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const posts = [
  {
    slug: "how-to-memorize-quran",
    category: "QURAN",
    title: "How to Memorize Quran Fast & Easily",
    excerpt: "The Quran is the word of Allah and memorizing it is one of the greatest blessings a Muslim can achieve. With the right method, anyone can memorize it step by step.",
    img: "/blog/quran.png",
    readTime: "4 min read",
  },
  {
    slug: "islamic-history",
    category: "ISLAMIC HISTORY",
    title: "Islamic History: A Journey of Faith, Civilization & Achievement",
    excerpt: "Islamic history is one of the most remarkable and influential histories in the world — a story of faith, leadership, sacrifice, knowledge, and civilization that changed humanity forever.",
    img: "/blog/islamic-history.png",
    readTime: "12 min read",
  },
  {
    slug: "hijri-calendar",
    category: "HADITH & SEERAH",
    title: "The Hijri Calendar: The Sacred Journey and Temporal Anchor of Islam",
    excerpt: "For over a billion Muslims, time is measured not just by cycles of the sun, but by a profound historical turning point that altered the course of human history.",
    img: "/blog/hijri-calendar.jpeg",
    readTime: "7 min read",
  },
];

export default function BlogPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ parentName: string } | null>(null);
  useEffect(() => {
    let mounted = true;
    const init = async () => {
      try {
        const s = localStorage.getItem("mihrab_user");
        if (s && mounted) setUser(JSON.parse(s));
      } catch {}
    };
    init();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="font-serif bg-white text-gray-900 min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <Link href="/" className="text-[#c9a96e] font-bold tracking-widest text-sm uppercase">Mihrab Academy</Link>
        <div className="hidden md:flex gap-8 text-sm text-gray-600">
          {[["Home", "/"], ["Courses", "/#programs"], ["About Us", "/about"], ["Blog", "/blog"]].map(([l, h]) => (
            <Link key={l} href={h} className={`hover:text-[#c9a96e] transition-colors ${l === "Blog" ? "text-[#c9a96e]" : ""}`}>{l}</Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => window.open("https://wa.me/201553135708?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20trial%20lesson!", "_blank")}
            className="bg-[#5a4a2f] hover:bg-[#6b5a3a] text-[#c9a96e] text-sm px-5 py-2 rounded-full border border-[#c9a96e]/20 transition-colors">
            Start Learning
          </motion.button>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#1a3a2f] pt-32 pb-16 px-10 md:px-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="text-[#c9a96e] uppercase tracking-widest text-xs mb-4">Our Blog</p>
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-4">Knowledge &amp; Inspiration</h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto">Deepen your understanding with our latest insights on Seerah, Hadith, and Islamic life.</p>
        </motion.div>
      </section>

      {/* Posts Grid */}
      <section className="bg-white px-10 md:px-20 py-20">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {posts.map((post) => (
            <motion.div key={post.slug} variants={fadeUp} whileHover={{ y: -6 }}
              onClick={() => router.push(`/blog/${post.slug}`)}
              className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden cursor-pointer group hover:border-[#c9a96e]/20 transition-all duration-300">
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/9]">
                <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }}
                  src={post.img} alt={post.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-[#1a3a2f]/90 text-[#c9a96e] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-[#c9a96e]/20">
                  {post.category}
                </span>
              </div>
              {/* Content */}
              <div className="p-6">
                <h2 className="text-gray-900 font-medium text-lg mb-3 leading-snug">{post.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">{post.readTime}</span>
                  <span className="text-[#c9a96e] text-sm group-hover:translate-x-1 transition-transform duration-200">Read More &rsaquo;</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a3a2f] px-10 md:px-20 py-10 border-t border-[#c9a96e]/10">
        <div className="flex justify-between items-center">
          <span className="text-[#c9a96e] font-bold tracking-widest text-sm uppercase">Mihrab Academy</span>
          <p className="text-gray-300 text-xs">© 2026 Mihrab Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}