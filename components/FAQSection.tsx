"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do you offer a guarantee?",
    answer: "Yes — we offer a 30-day money-back guarantee, no questions asked. If you're not satisfied, we'll refund you in full. You still get to keep the audit report and all the bonus materials."
  },
  {
    question: "How do I receive my report?",
    answer: "All audit results and bonuses are delivered via email. You'll get everything in one simple package — no logins, no dashboards, no hassle."
  },
  {
    question: "Who runs the audit?",
    answer: "Every audit is run by a real person using AI tools like ChatGPT, Claude, and Perplexity. We test live prompts, review the outputs, and compile the most relevant, actionable insights for your business. This isn't an automated dump — it's a focused analysis."
  },
  {
    question: "What's included in the $17 price?",
    answer: "You get the full LLM Visibility Audit plus all bonus tools at no extra cost. That includes the Visibility Cheat Sheet, Brand Tracker setup guide, PR-Ready Checklist, and industry research report — everything is included in the one-time fee."
  },
  {
    question: "Is this right for my business?",
    answer: "If AI visibility matters to you, yes. This is especially useful for local service providers, agencies, clinics, law firms, and consultants who rely on search-driven discovery. If you're not thinking about how AI assistants recommend businesses, this probably isn't for you."
  },
  {
    question: "What if I already rank well on Google?",
    answer: "That's great — but AI and Google rankings are not the same. While strong SEO helps, AI assistants use different signals. This audit shows you exactly how visible you are to AI tools, what's driving that visibility, and where the gaps are."
  }
];

export const FAQSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-orange-500/5 to-background">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                         linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-full px-6 py-2">
              <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Got Questions?</span>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Everything you need to know about the AI Visibility Audit
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-2 border-border/50 rounded-xl px-6 bg-card/50 backdrop-blur-sm hover:border-orange-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] data-[state=open]:border-orange-500/50 data-[state=open]:shadow-[0_0_40px_rgba(249,115,22,0.15)]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AccordionTrigger className="text-left hover:no-underline py-6 text-lg md:text-xl font-semibold hover:text-orange-500 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-foreground/80 leading-relaxed pb-6 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <p className="text-xl text-foreground/70 mb-6">
            Still have questions?{" "}
            <a 
              href="https://go.totalauthority.com/widget/bookings/totalauthority" 
              className="text-orange-500 font-semibold hover:text-orange-600 transition-colors underline decoration-2 underline-offset-4"
            >
              Reach out to us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
