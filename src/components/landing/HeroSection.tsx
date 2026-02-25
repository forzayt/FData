import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { GridScan } from "./GridScan";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Interactive Background */}
      <div className="absolute inset-0 z-0">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#392e4e"
          gridScale={0.1}
          scanColor="#00FFFF"    //change to cyan  // the scanner light color
          scanOpacity={0.4}
          scanDuration={4.0}
          scanDelay={3.0}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Aurora glow effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] animate-aurora rounded-full bg-glow-purple/20 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] animate-aurora-slow rounded-full bg-glow-blue/15 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 h-[350px] w-[350px] animate-aurora rounded-full bg-glow-teal/10 blur-[120px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-glow-teal animate-pulse-glow" />
            Open datasets for every use case
          </div>

          <h1 className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Discover & Access{" "}
            <span className="gradient-text">Datasets</span>{" "}
            for Any Use Case
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Browse high-quality datasets for multiple use cases and domains.
            Review, filter, and access data in the format you need.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/datasets">
              <Button size="lg" className="group gap-2 bg-primary px-8 text-base hover:bg-primary/90">
                Explore Datasets
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="border-border/50 px-8 text-base backdrop-blur-sm hover:bg-secondary/50">
                Learn More
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-8"
        >
          {[
            { value: "15+", label: "Datasets" },
            { value: "50+", label: "Sources" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-bold gradient-text md:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
