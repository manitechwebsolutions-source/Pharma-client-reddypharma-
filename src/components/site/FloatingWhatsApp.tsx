import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={waLink("Hi! I'd like to enquire about a medicine.")}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full text-white shadow-glow"
      style={{ backgroundColor: "oklch(0.65 0.17 145)" }}
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: "oklch(0.65 0.17 145)" }} />
      <MessageCircle className="h-6 w-6 relative" />
    </motion.a>
  );
}
