import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SiteLayout, Section } from "@/components/site/Layout";
import { SITE, waLink } from "@/lib/site";

export const Route = createFileRoute("/request")({
  head: () => ({
    meta: [
      { title: "Request Medicine — Reddy Pharmacy" },
      { name: "description", content: "Request any medicine from Reddy Pharmacy. Upload your prescription and get a quick response on WhatsApp." },
      { property: "og:title", content: "Request Medicine — Reddy Pharmacy" },
      { property: "og:url", content: "/request" },
    ],
    links: [{ rel: "canonical", href: "/request" }],
  }),
  component: RequestPage,
});

function RequestPage() {
  const [submitting, setSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const phone = form.get("phone") as string;
    const medicine = form.get("medicine") as string;
    const message = (form.get("message") as string) || "";

    const text = `New medicine request:\n\nName: ${name}\nPhone: ${phone}\nMedicine: ${medicine}\n\nNotes: ${message}${fileName ? `\n\nPrescription file: ${fileName} (please share via this chat)` : ""}`;

    // Open WhatsApp + mailto
    window.open(waLink(text), "_blank");
    //window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("New medicine request")}&body=${encodeURIComponent(text)}`;

    toast.success("Request sent! We'll respond on WhatsApp shortly.");
    (e.target as HTMLFormElement).reset();
    setFileName("");
    setSubmitting(false);
  };

  return (
    <SiteLayout>
      <Section className="!max-w-3xl">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Quick & easy</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold">Request medicine</h1>
          <p className="mt-3 text-muted-foreground">Fill the form — we'll confirm availability and delivery on WhatsApp.</p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={onSubmit}
          className="mt-10 glass rounded-3xl p-6 md:p-10 shadow-card space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="name">Your name</Label>
              <Input id="name" name="name" required placeholder="Ravi Kumar" className="mt-2 h-11 rounded-xl" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" required type="tel" placeholder="+91 98xxxxxxxx" className="mt-2 h-11 rounded-xl" />
            </div>
          </div>

          <div>
            <Label htmlFor="medicine">Medicine name</Label>
            <Input id="medicine" name="medicine" required placeholder="e.g. Paracetamol 500mg x 10" className="mt-2 h-11 rounded-xl" />
          </div>

          {/* <div>
            <Label>Prescription (optional)</Label>
            <label className="mt-2 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/50 hover:bg-secondary cursor-pointer p-8 transition-colors">
              <Upload className="h-6 w-6 text-primary" />
              <span className="text-sm text-muted-foreground">
                {fileName || "Click to upload (JPG, PNG, PDF)"}
              </span>
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
              />
            </label>
          </div>*/}

          <div>
            <Label htmlFor="message">Notes</Label>
            <Textarea id="message" name="message" rows={4} placeholder="Anything else we should know?" className="mt-2 rounded-xl" />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            size="lg"
            className="w-full rounded-full bg-gradient-to-r from-primary to-primary-glow shadow-glow h-12 text-base"
          >
            {submitting ? "Sending…" : "Send request"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            On submit, we'll open WhatsApp with your request prefilled — and a backup email draft.
          </p>
        </motion.form>
      </Section>
    </SiteLayout>
  );
}
