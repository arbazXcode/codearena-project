"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Cpu,
  Globe,
  Zap,
  Layers,
  Terminal,
  ArrowRight,
  CheckCircle2,
  Trophy,
  Users,
} from "lucide-react";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50 },
  },
};

// --- Sub-Components ---

const StatCard = ({ label, value, icon: Icon }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm">
    <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500">
      <Icon size={24} />
    </div>
    <div>
      <h4 className="text-2xl font-bold text-white">{value}</h4>
      <p className="text-sm text-neutral-400">{label}</p>
    </div>
  </div>
);

const FeatureCard = ({ title, desc, icon: Icon, className = "" }) => (
  <motion.div
    variants={itemVariants}
    className={`group relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 transition-all duration-300 hover:border-amber-500/50 hover:bg-neutral-900/80 ${className}`}
  >
    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-500/10 blur-3xl transition-all group-hover:bg-amber-500/20" />

    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800 text-amber-400 shadow-inner group-hover:scale-110 transition-transform duration-300">
      <Icon size={24} />
    </div>

    <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
    <p className="text-neutral-400 leading-relaxed">{desc}</p>
  </motion.div>
);

const TechBadge = ({ label }) => (
  <div className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-neutral-300 transition hover:border-amber-500/40 hover:text-amber-400 cursor-default">
    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
    {label}
  </div>
);

// --- Main Page Component ---

export default function AboutPage() {
  return (
    <div className="min-h-screen selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Radial Gradient overlay */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.05),transparent_70%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* --- Hero Section --- */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center mb-32"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-8 uppercase tracking-widest"
          >
            <Terminal size={12} />
            <span>System Online v2.0</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-tight"
          >
            Forged for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
              Engineers.
            </span>
            <br />
            Designed for{" "}
            <span className="text-white relative">
              Mastery
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-amber-500 opacity-60"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            CodeArena strips away the noise. No ads, no clutter. Just a pure,
            high-performance environment to master Data Structures & Algorithms.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="/problems"
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_-5px_rgba(245,158,11,0.4)]"
            >
              Start Coding <ArrowRight size={18} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 text-white px-8 py-4 rounded-xl font-medium transition-all hover:bg-neutral-800 hover:border-neutral-700"
            >
              <Globe size={18} /> View Source
            </a>
          </motion.div>
        </motion.div>

        {/* --- Stats Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32"
        >
          <StatCard label="Active Problems" value="500+" icon={Code2} />
          <StatCard label="Total Submissions" value="1.2M" icon={Zap} />
          <StatCard label="Active Developers" value="12k" icon={Users} />
        </motion.div>

        {/* --- Bento Grid Features --- */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why CodeArena?
              </h2>
              <p className="text-neutral-400 max-w-md">
                We optimized every pixel for clarity, speed, and understanding.
              </p>
            </div>
            <div className="hidden md:block h-px w-32 bg-neutral-800 mb-6"></div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Large Card spanning 2 cols */}
            <FeatureCard
              className="md:col-span-2"
              title="Real-time Execution Engine"
              desc="Experience zero-latency code execution. Our isolated sandbox environment runs your code against hundreds of test cases in milliseconds, providing instant feedback and memory usage analytics."
              icon={Cpu}
            />

            {/* Standard Card */}
            <FeatureCard
              title="Curated Patterns"
              desc="Don't just solve random problems. Follow our structured learning paths designed to teach you the underlying patterns of DS&A."
              icon={Layers}
            />

            {/* Standard Card */}
            <FeatureCard
              title="Distraction Free"
              desc="A UI designed by minimalists. No banners, no popups. Just you, the editor, and the problem statement."
              icon={CheckCircle2}
            />

            {/* Large Card spanning 2 cols */}
            <FeatureCard
              className="md:col-span-2"
              title="Global Leaderboards"
              desc="Compete with developers worldwide. Rank up from Novice to Grandmaster as you solve increasingly complex algorithmic challenges."
              icon={Trophy}
            />
          </motion.div>
        </div>

        {/* --- Tech Stack & Philosophy --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
          <div className="relative">
            {/* Abstract Visual Decoration */}
            <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-amber-500/20 blur-[100px]" />

            <h2 className="text-3xl font-bold text-white mb-6 relative z-10">
              Built on Modern Primitives
            </h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed relative z-10">
              CodeArena is engineered for performance. We leverage the latest
              web technologies to ensure a seamless, app-like experience right
              in your browser.
            </p>

            <div className="flex flex-wrap gap-3 relative z-10">
              <TechBadge label="Next.js 15" />
              <TechBadge label="React 19" />
              <TechBadge label="Prisma" />
              <TechBadge label="PostgreSQL" />
              <TechBadge label="Tailwind v4" />
              <TechBadge label="Clerk Auth" />
            </div>
          </div>

          <div className="relative rounded-2xl border border-neutral-800 bg-neutral-950/50 p-8 md:p-12 backdrop-blur-md">
            {/* Decorative Code Snippet UI */}
            <div className="flex items-center gap-2 mb-6 border-b border-neutral-800 pb-4">
              <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
              <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
              <span className="ml-2 font-mono text-xs text-neutral-500">
                philosophy.js
              </span>
            </div>
            <div className="font-mono text-sm space-y-2">
              <p className="text-purple-400">
                const <span className="text-blue-400">mission</span> ={" "}
                <span className="text-neutral-300">{"{"}</span>
              </p>
              <p className="pl-4 text-neutral-400">
                focus: <span className="text-green-400">"clarity"</span>,
              </p>
              <p className="pl-4 text-neutral-400">
                goal: <span className="text-green-400">"mastery"</span>,
              </p>
              <p className="pl-4 text-neutral-400">
                distractions: <span className="text-orange-400">null</span>,
              </p>
              <p className="text-neutral-300">{"};"}</p>
              <br />
              <p className="text-neutral-500">
                // We believe that great engineering starts with
              </p>
              <p className="text-neutral-500">
                // understanding the fundamentals deeply.
              </p>
            </div>
          </div>
        </div>

        {/* --- CTA Section --- */}
        <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/50 p-12 md:p-24 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-950/10 to-amber-900/20" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to enter the Arena?
            </h2>
            <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
              Join thousands of developers leveling up their skills today.
            </p>
            <a
              href="/problems"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 px-10 py-5 text-lg font-bold text-neutral-950 transition-transform hover:scale-105 shadow-lg shadow-amber-500/20"
            >
              Start Solving Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
