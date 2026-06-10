"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Booking {
  id: string; event_type_name: string; lesson_time: string;
  meeting_link: string; status: string; reminder_sent: boolean;
}
interface User { parentName: string; email: string; childName: string; }

const CalendlyEmbed = ({ url }: { url: string }) => {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true; document.body.appendChild(s);
    return () => { document.body.removeChild(s); };
  }, []);
  return (
    <div
      className="calendly-inline-widget w-full rounded-2xl overflow-hidden"
      data-url={url}
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
};

export default function BookingPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tab, setTab] = useState<"book" | "my-lessons">("book");
  const [loading, setLoading] = useState(true);

  // ── Fix: use initializer function to avoid setState-in-effect ──
  useEffect(() => {
    let mounted = true;
    const init = async () => {
      try {
        const saved = localStorage.getItem("mihrab_user");
        if (!saved) {
          router.push("/login");
          return;
        }
        const parsed = JSON.parse(saved) as User;
        if (mounted) {
          setUser(parsed);
          setLoading(false);
        }
      } catch {
        router.push("/login");
      }
    };
    init();
    return () => { mounted = false; };
  }, [router]);

  // ── Load bookings once user is set ────────────────────────────
  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem("mihrab_token");
    fetch(`${API}/api/booking/my-bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setBookings(d.bookings || []))
      .catch(() => {});
  }, [user]);

  if (loading || !user) return (
    <div className="min-h-screen bg-[#0f1a14] flex items-center justify-center">
      <div className="text-[#a8c5a0] animate-pulse text-sm">Loading...</div>
    </div>
  );

  const CALENDLY_URL = `https://calendly.com/your-academy/free-lesson?name=${encodeURIComponent(user.parentName)}&email=${encodeURIComponent(user.email)}`;

  return (
    <div className="min-h-screen bg-[#0f1a14] px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[#a8c5a0] text-xs uppercase tracking-widest mb-2">Welcome back</p>
            <h1 className="text-4xl font-light text-white">
              Assalamu Alaikum, <span className="text-[#c9a96e]">{user.parentName}</span>
            </h1>
            <p className="text-[#a8c5a0]/60 text-sm mt-1">
              Booking for <strong className="text-white">{user.childName}</strong>
            </p>
          </div>
          <Link href="/" className="text-[#a8c5a0]/60 text-sm hover:text-white transition-colors">← Home</Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-[#1a3a2f] p-1 rounded-xl w-fit">
          {(["book", "my-lessons"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm transition-colors ${
                tab === t
                  ? "bg-[#5a4a2f] text-[#c9a96e] border border-[#c9a96e]/20"
                  : "text-[#a8c5a0]/60 hover:text-white"
              }`}>
              {t === "book" ? "Book a Lesson" : "My Lessons"}
            </button>
          ))}
        </div>

        {/* Book tab */}
        {tab === "book" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-[#1a3a2f] border border-[#a8c5a0]/10 rounded-2xl p-6">
            <p className="text-[#a8c5a0]/60 text-sm mb-6">
              Choose a time that works. You&apos;ll get a confirmation email and a reminder 24 hours before the lesson.
            </p>
            <CalendlyEmbed url={CALENDLY_URL} />
          </motion.div>
        )}

        {/* My Lessons tab */}
        {tab === "my-lessons" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {bookings.length === 0 ? (
              <div className="text-center py-16 bg-[#1a3a2f] border border-[#a8c5a0]/10 rounded-2xl">
                <p className="text-5xl mb-4">📚</p>
                <p className="text-white/70 text-sm">No lessons booked yet.</p>
                <button onClick={() => setTab("book")} className="mt-4 text-[#c9a96e] text-sm hover:underline">
                  Book your first lesson →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div key={b.id} className="bg-[#1a3a2f] border border-[#a8c5a0]/10 rounded-2xl p-6 flex items-center justify-between">
                    <div>
                      <p className="text-[#c9a96e] font-medium">{b.event_type_name}</p>
                      <p className="text-white/70 text-sm mt-1">
                        {new Date(b.lesson_time).toLocaleString("en-US", {
                          weekday: "long", month: "long", day: "numeric",
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </p>
                      <span className={`mt-2 inline-block text-xs px-2 py-0.5 rounded-full ${
                        b.status === "scheduled"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-[#a8c5a0]/10 text-[#a8c5a0]"
                      }`}>
                        {b.status}
                      </span>
                    </div>
                    {b.meeting_link && (
                      <a href={b.meeting_link} target="_blank" rel="noopener noreferrer"
                        className="bg-[#5a4a2f] border border-[#c9a96e]/20 text-[#c9a96e] text-sm px-4 py-2 rounded-full hover:bg-[#6b5a3a] transition-colors">
                        Join →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}