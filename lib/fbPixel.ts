// lib/fbPixel.ts
// Fires a Meta Pixel "Lead" event whenever someone clicks a
// "Book a Free Trial" / "Start Learning" button.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const trackLead = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead");
  }
};