"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ parentName: "", email: "", password: "", phone: "", childName: "", childAge: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setError(""); setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, childAge: Number(form.childAge) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      localStorage.setItem("mihrab_token", data.token);
      localStorage.setItem("mihrab_user", JSON.stringify(data.user));
      router.push("/booking");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0f1a14] flex items-center justify-center px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        className="w-full max-w-md bg-[#1a3a2f] border border-[#a8c5a0]/15 rounded-3xl p-10">
        <h1 className="text-3xl font-light text-white mb-1">Create Account</h1>
        <p className="text-[#a8c5a0]/60 text-sm mb-8">Start your child&apos;s learning journey</p>
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm px-4 py-3 rounded-xl mb-6">{error}</div>}
        <div className="space-y-4">
          {[{ label: "Your Name", name: "parentName", placeholder: "Ahmed Ali", type: "text" },
            { label: "Email", name: "email", placeholder: "ahmed@example.com", type: "email" },
            { label: "Password", name: "password", placeholder: "••••••••", type: "password" },
            { label: "Phone Number", name: "phone", placeholder: "+20 15 53135708", type: "text" },
            { label: "Child's Name", name: "childName", placeholder: "Yusuf", type: "text" },
            { label: "Child's Age", name: "childAge", placeholder: "8", type: "number" },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-[#a8c5a0]/70 text-xs mb-1.5">{f.label}</label>
              <input name={f.name} type={f.type} placeholder={f.placeholder}
                value={form[f.name as keyof typeof form]} onChange={handleChange}
                className="w-full bg-[#152a20] border border-[#a8c5a0]/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#a8c5a0]/40 transition-colors" />
            </div>
          ))}
        </div>
        <motion.button onClick={handleSubmit} disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="w-full mt-6 bg-[#5a4a2f] border border-[#c9a96e]/20 text-[#c9a96e] py-3.5 rounded-xl text-sm font-medium hover:bg-[#6b5a3a] transition-colors disabled:opacity-50">
          {loading ? "Creating account..." : "Create Account →"}
        </motion.button>
        <p className="text-center text-[#a8c5a0]/40 text-xs mt-6">
          Already have an account? <Link href="/login" className="text-[#c9a96e] hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}