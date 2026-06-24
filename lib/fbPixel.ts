export const trackLead = () => {
    if (typeof window === "undefined") return;
  
    const analyticsWindow = window as typeof window & {
      fbq?: (...args: unknown[]) => void;
      gtag?: (...args: unknown[]) => void;
    };
  
    analyticsWindow.fbq?.("track", "Lead");
    analyticsWindow.gtag?.("event", "generate_lead");
  };