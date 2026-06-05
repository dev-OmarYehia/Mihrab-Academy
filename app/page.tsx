"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

// Palette
// bg-primary:    #0f0a1e  (deep midnight purple)
// bg-secondary:  #1a1035  (rich purple)
// bg-card:       #160d2e  (dark purple card)
// accent-gold:   #d4af6a  (warm gold)
// accent-lav:    #a78bca  (soft lavender)
// text-muted:    rgba(167,139,202,0.6)

const blogPosts = [
  {
    category: "ISLAMIC-SHARIA",
    title: "Eid al-Adha: Meaning, Rituals & Lessons",
    excerpt: "A Celebration of Faith, Sacrifice, and Gratitude. Every year, Muslims around the world come together to...",
    img: "https://images.unsplash.com/photo-1608501078713-8e445a709b39?w=600&auto=format&fit=crop",
  },
  {
    category: "HADITH",
    title: "Understanding Prophetic Wisdom",
    excerpt: "Delve into the profound wisdom of the Hadith and discover practical guidance for contemporary living.",
    img: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=600&auto=format&fit=crop",
  },
  {
    category: "PARENTING",
    title: "Nurturing Young Hearts",
    excerpt: "Learn effective parenting techniques grounded in Islamic principles to raise compassionate and knowledgeable children.",
    img: "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=600&auto=format&fit=crop",
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="font-serif bg-[#0f0a1e] text-white min-h-screen overflow-x-hidden">

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between px-10 py-5 fixed top-0 left-0 right-0 z-50 bg-[#1a1035]/80 backdrop-blur-md border-b border-[#d4af6a]/10"
      >
        <span className="text-[#d4af6a] font-bold tracking-widest text-sm uppercase">
          Mihrab Academy
        </span>
        <div className="hidden md:flex gap-8 text-sm text-white/70">
          {["Home", "Courses", "About Us", "Blog"].map((item, i) => (
            <motion.a
              key={item}
              href="#"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="hover:text-[#a78bca] transition-colors duration-200"
            >
              {item}
            </motion.a>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="bg-[#2d1f4e] hover:bg-[#3a2860] text-[#d4af6a] text-sm px-5 py-2 rounded-full border border-[#d4af6a]/20 transition-colors duration-200"
        >
          Start Learning
        </motion.button>
      </motion.nav>

      {/* ── Hero ── */}
      <section ref={heroRef} className="min-h-screen bg-[#1a1035] flex items-center px-10 md:px-20 pt-24 pb-16 relative overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-[#a78bca]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-72 h-72 rounded-full bg-[#d4af6a]/8 blur-3xl pointer-events-none" />
        <div className="absolute top-40 left-1/2 w-80 h-80 rounded-full bg-[#6b21a8]/15 blur-3xl pointer-events-none" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-12">
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex-1 max-w-xl">
            <motion.p variants={fadeUp} custom={0} className="text-[#a78bca] uppercase tracking-widest text-xs mb-6">
              Mihrab Academy
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-6xl leading-tight font-light text-white">
              Learn Qur&apos;an
              <br />with
              <br />
              <span className="text-[#d4af6a] italic">Proper Guidance</span>
            </motion.h1>
            <motion.div variants={fadeUp} custom={2} className="flex gap-4 mt-10">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#3a2860" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-[#2d1f4e] text-[#d4af6a] border border-[#d4af6a]/20 px-6 py-3 rounded-full text-sm transition-colors duration-200"
              >
                Explore Courses <span>→</span>
              </motion.button>
              <motion.button
                whileHover={{ color: "#a78bca" }}
                className="text-white/70 text-sm px-6 py-3 transition-colors duration-200"
              >
                Start Learning
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 max-w-lg w-full"
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/3] ring-1 ring-[#a78bca]/20">
              <img
                src="https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&auto=format&fit=crop"
                alt="Student reading Quran"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Vision ── */}
      <section className="bg-[#0f0a1e] px-10 md:px-20 py-28">
        <div className="flex flex-col md:flex-row items-center gap-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 max-w-lg w-full"
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/3] ring-1 ring-[#a78bca]/15">
              <motion.img
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6 }}
                src="https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&auto=format&fit=crop"
                alt="Grand mosque at dusk"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 max-w-xl"
          >
            <h2 className="text-5xl font-light text-white mb-8">Vision</h2>
            <div className="space-y-5 text-[#a78bca]/70 leading-relaxed text-base">
              <p>Mihrab is a comprehensive online learning platform that aims to teach the Holy Quran, Islam, and Arabic language skills.</p>
              <p>Experience a new and unique learning experience for your children online.</p>
              <p className="font-semibold text-white/90">Learn Quran, Islamic Studies, and Arabic online with trusted teachers.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Programs ── */}
      <section className="bg-[#0f0a1e] px-10 md:px-20 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#a78bca] uppercase tracking-widest text-xs mb-3">What We Offer</p>
          <h2 className="text-5xl font-light text-white">Our Programs</h2>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {[
            { title: "Qur'an Program", desc: "Learn Qur'an with proper tajweed and recitation from certified teachers.", icon: "☽" },
            { title: "Arabic Language", desc: "Master reading, writing and speaking Arabic at your own pace.", icon: "ع" },
            { title: "Islamic Studies", desc: "Understand Islamic beliefs, history, and practice with depth.", icon: "✦" },
          ].map((program) => (
            <motion.div
              key={program.title}
              variants={fadeUp}
              whileHover={{ y: -6, borderColor: "rgba(167,139,202,0.4)" }}
              className="bg-[#160d2e] border border-[#a78bca]/10 rounded-2xl p-8 transition-colors duration-300 group cursor-pointer"
            >
              <div className="text-[#d4af6a] text-3xl mb-5">{program.icon}</div>
              <h3 className="text-white text-xl font-medium mb-3">{program.title}</h3>
              <p className="text-[#a78bca]/60 text-sm leading-relaxed">{program.desc}</p>
              <div className="mt-6 text-[#d4af6a] text-sm group-hover:translate-x-2 transition-transform duration-300">Learn more →</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="bg-[#1a1035] px-10 md:px-20 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d1f4e]/40 to-transparent pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 relative"
        >
          <p className="text-[#a78bca] uppercase tracking-widest text-xs mb-3">Why Us</p>
          <h2 className="text-5xl font-light text-white">Why Choose Us</h2>
          <p className="text-[#a78bca]/50 mt-4 max-w-xl mx-auto text-sm">We provide a structured and modern way to learn Islamic knowledge effectively.</p>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto relative"
        >
          {[
            { title: "Qualified Teachers", desc: "Learn from experienced and certified instructors with decades of expertise." },
            { title: "Structured Learning", desc: "Step-by-step curriculum thoughtfully designed for all levels." },
            { title: "Flexible Schedule", desc: "Learn anytime from anywhere at your own pace." },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              whileHover={{ x: 4 }}
              className="border-t border-[#a78bca]/20 pt-6 cursor-default"
            >
              <h3 className="text-[#d4af6a] text-lg font-medium mb-3">{feature.title}</h3>
              <p className="text-[#a78bca]/60 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Knowledge & Inspiration ── */}
      <section className="bg-[#0f0a1e] px-10 md:px-20 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-5xl font-light text-white mb-4">Knowledge &amp; Inspiration</h2>
          <p className="text-[#a78bca]/50 text-sm max-w-xl mx-auto">Deepen your understanding with our latest insights on Seerah, Hadith, and Islamic life.</p>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.title}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-[#160d2e] rounded-2xl overflow-hidden border border-[#a78bca]/10 hover:border-[#a78bca]/30 transition-colors duration-300 group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[16/9]">
                <motion.img
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5 }}
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#2d1f4e] text-[#d4af6a] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-[#d4af6a]/20">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-white font-medium text-lg mb-2 leading-snug">{post.title}</h3>
                <p className="text-[#a78bca]/50 text-sm leading-relaxed mb-5">{post.excerpt}</p>
                <span className="text-[#d4af6a] text-sm group-hover:translate-x-1 inline-block transition-transform duration-200">
                  Read More &rsaquo;
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Get in Touch ── */}
      <section className="bg-[#0f0a1e] px-10 md:px-20 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto flex flex-col md:flex-row rounded-3xl overflow-hidden border border-[#a78bca]/15"
        >
          {/* Left panel */}
          <div className="bg-[#1a1035] p-10 md:w-2/5 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-light text-white mb-4">Get in Touch</h2>
              <p className="text-[#a78bca]/60 text-sm leading-relaxed mb-10">
                Have questions about our programs? Reach out to us and our admissions team will guide you.
              </p>
            </div>
            <div className="space-y-6">
              {[
                { icon: "📞", label: "Call Us", value: "+20 15 53135708" },
                { icon: "💬", label: "WhatsApp", value: "+20 15 53135708" },
                { icon: "✉️", label: "Email", value: "contact@mihrabacademy.org" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 cursor-pointer"
                >
                  <span className="text-[#d4af6a] text-lg mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-[#a78bca]/40 text-xs uppercase tracking-widest">{item.label}</p>
                    <p className="text-[#d4af6a] text-sm font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right form panel */}
          <div className="bg-[#0d0920] p-10 flex-1 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Full Name", placeholder: "Jane Smith" },
                { label: "Email Address", placeholder: "jane@example.com" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-[#a78bca]/70 text-xs mb-2">
                    {field.label} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full bg-[#160d2e] border border-[#a78bca]/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#a78bca]/40 transition-colors"
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-[#a78bca]/70 text-xs mb-2">Phone Number <span className="text-red-400">*</span></label>
              <input
                type="text"
                placeholder="555 123 4567"
                className="w-full bg-[#160d2e] border border-[#a78bca]/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#a78bca]/40 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[#a78bca]/70 text-xs mb-2">Message <span className="text-red-400">*</span></label>
              <textarea
                rows={4}
                placeholder="How can we help you?"
                className="w-full bg-[#160d2e] border border-[#a78bca]/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#a78bca]/40 transition-colors resize-none"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#2d1f4e" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#1a1035] border border-[#a78bca]/20 text-white py-3.5 rounded-lg text-sm font-medium tracking-wide transition-colors duration-200 hover:border-[#a78bca]/50"
            >
              Send Message
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#1a1035] px-10 md:px-20 pt-20 pb-10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#a78bca]/30 to-transparent" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 mb-16">
          <div>
            <h3 className="text-[#d4af6a] font-bold tracking-widest text-sm uppercase mb-5">Mihrab Academy</h3>
            <p className="text-[#a78bca]/50 text-sm leading-relaxed mb-8">
              Dedicated to spreading the authentic knowledge of the Quran and Sunnah, nurturing the next generation of mindful Muslims.
            </p>
            <blockquote className="border border-[#a78bca]/20 rounded-xl p-5 bg-[#160d2e]/50">
              <p className="text-[#d4af6a] italic text-sm leading-relaxed mb-2">
                &ldquo;And We have certainly made the Qur&apos;an easy for remembrance, so is there any who will remember?&rdquo;
              </p>
              <cite className="text-[#a78bca]/40 text-xs not-italic">— Surah Al-Qamar [54:17]</cite>
            </blockquote>
          </div>
          <div>
            <h4 className="text-[#a78bca]/40 uppercase tracking-widest text-xs mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {["About Us", "Our Programs", "Admissions", "Blog"].map((link) => (
                <li key={link}>
                  <motion.a href="#" whileHover={{ x: 4, color: "#d4af6a" }} className="text-[#a78bca]/70 text-sm transition-colors duration-200 inline-block">
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[#a78bca]/40 uppercase tracking-widest text-xs mb-6">Legal</h4>
            <ul className="space-y-4">
              {["Privacy Policy", "Terms of Service", "Student Portal"].map((link) => (
                <li key={link}>
                  <motion.a href="#" whileHover={{ x: 4, color: "#d4af6a" }} className="text-[#a78bca]/70 text-sm transition-colors duration-200 inline-block">
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-[#a78bca]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#a78bca]/30 text-xs">© 2026 Mihrab Academy. All rights reserved.</p>
          <div className="flex gap-5">
            {["f", "𝕏", "📷", "▶"].map((icon, i) => (
              <motion.a key={i} href="#" whileHover={{ y: -3, color: "#d4af6a" }} className="text-[#a78bca]/40 text-sm transition-colors duration-200">
                {icon}
              </motion.a>
            ))}
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <motion.a
        href="#"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.15 }}
        className="fixed bottom-6 right-6 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg z-50"
      >
        💬
      </motion.a>
    </div>
  );
}

