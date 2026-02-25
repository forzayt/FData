import { Search, BarChart3, Tags, Zap } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Search,
    title: "Powerful Search",
    description: "Find datasets by format or keyword with instant filtering and smart results.",
  },
  {
    icon: BarChart3,
    title: "Rich Metadata",
    description: "Explore detailed metadata, schemas, and statistics before downloading any dataset.",
  },
  {
    icon: Tags,
    title: "Curated Content",
    description: "Browse datasets across multiple domains, curated for quality and relevance.",
  },
  {
    icon: Zap,
    title: "Fast Access",
    description: "Quick download links and format options. Get data in CSV, JSON, Parquet, or SQL.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] animate-aurora-slow rounded-full bg-glow-purple/10 blur-[150px]" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Everything you need to find{" "}
            <span className="gradient-text">the right data</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            FData makes it effortless to discover, preview, and access high-quality datasets for your projects.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card gradient-border group p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
