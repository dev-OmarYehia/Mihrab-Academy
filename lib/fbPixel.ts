// lib/fbPixel.ts
// Small helper so every "Book a Free Trial" / "Start Learning" button
// fires a Meta Pixel "Lead" event before opening WhatsApp.

declare global {
    interface Window {
      fbq?: (...args: unknown[]) => void;
    }
  }
  
  export const trackLeadAndOpenWhatsApp = (message: string) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead");
    }
    const url = `https://wa.me/201553135708?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };