"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const programs = [
  "Quran Program",
  "Arabic Language",
  "Islamic Studies",
  "History Program",
];

export default function SignupPage() {
  const [form, setForm] = useState({
    parentName: "",
    email: "",
    phone: "",
    childName: "",
    childAge: "",
    program: programs[0], // Default to the first program
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    const whatsappMessage = `Hi, I'd like to book a free trial lesson for the ${form.program}. Here are my details:
- Parent Name: ${form.parentName}
- Email: ${form.email}
- Phone: ${form.phone}
- Child's Name: ${form.childName}
- Child's Age: ${form.childAge}`;
    const whatsappURL = `https://wa.me/201553135708?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0f1a14] flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md bg-[#1a3a2f] border border-[#a8c5a0]/15 rounded-3xl p-10"
      >
        <h1 className="text-[#a8c5a0]/60 text-sm mb-8">
          Start your child&apos;s learning journey
        </h1>
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}
        <div className="space-y-4">
          {[
            { label: "Your Name", name: "parentName", placeholder: "Mohamed", type: "text" },
            { label: "Email", name: "email", placeholder: "Mohamed@example.com", type: "email" },
            { label: "Phone Number", name: "phone", placeholder: "+17759865200", type: "text" },
            { label: "Child's Name", name: "childName", placeholder: "Mohamed", type: "text" },
            { label: "Child's Age", name: "childAge", placeholder: "8", type: "number" },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-[#a8c5a0]/70 text-xs mb-1.5">{f.label}</label>
              <input
                name={f.name}
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.name as keyof typeof form]}
                onChange={handleChange}
                className="w-full bg-[#152a20] border border-[#a8c5a0]/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#a8c5a0]/40 transition-colors"
              />
            </div>
          ))}
          <div>
            <label className="block text-[#a8c5a0]/70 text-xs mb-1.5">
              Programs you're interested in
            </label>
            <select
              name="program"
              value={form.program}
              onChange={handleChange}
              className="w-full bg-[#152a20] border border-[#a8c5a0]/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#a8c5a0]/40 transition-colors"
            >
              {programs.map((program) => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
          </div>
        </div>
        <motion.button
          onClick={handleSubmit}
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 bg-[#5a4a2f] border border-[#c9a96e]/20 text-[#c9a96e] py-3.5 rounded-xl text-sm font-medium hover:bg-[#6b5a3a] transition-colors disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Book a free Trial →"}
        </motion.button>
      </motion.div>
    </div>
  );
}