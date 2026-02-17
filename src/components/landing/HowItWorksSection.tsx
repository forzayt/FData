import { Search, Eye, Download } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Search,
    title: "Browse",
    description: "Search and filter through our curated catalog of datasets across multiple domains.",
  },
  {
    icon: Eye,
    title: "Preview",
    description: "View sample data, metadata, and key statistics to evaluate dataset quality and relevance.",
  },
  {
    icon: Download,
    title: "Access",
    description: "Download in your preferred format — CSV, JSON, Parquet, or connect via API.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative py-32">
      <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] animate-aurora rounded-full bg-glow-teal/10 blur-[150px]" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            How it <span className="gradient-text">works</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Three simple steps to get the data you need.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-10 hidden h-px w-full translate-x-1/2 bg-gradient-to-r from-border to-transparent md:block" />
              )}
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 glow-purple">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="mb-2 font-display text-sm font-semibold uppercase tracking-widest text-primary">
                Step {i + 1}
              </div>
              <h3 className="mb-2 font-display text-xl font-bold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
