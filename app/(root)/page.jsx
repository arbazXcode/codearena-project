import {
  Code2,
  Trophy,
  Users,
  Zap,
  ChevronRight,
  Play,
  Star,
  Cpu,
  Globe,
  TrendingUp,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { onBoardUser } from "@/modules/auth/actions";

export default async function Home() {
  await onBoardUser();

  const features = [
    {
      icon: <Code2 className="w-6 h-6 text-amber-500" />,
      title: "Interactive Coding",
      description:
        "Practice with real-world coding challenges and get instant feedback in our isolated sandboxes.",
    },
    {
      icon: <Trophy className="w-6 h-6 text-amber-500" />,
      title: "Track Progress",
      description:
        "Monitor your improvement with detailed analytics, heatmaps, and achievement systems.",
    },
    {
      icon: <Users className="w-6 h-6 text-amber-500" />,
      title: "Global Community",
      description:
        "Learn from thousands of developers worldwide, share solutions, and discuss optimizations.",
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: "Real-time Feedback",
      description:
        "Get instant verdicts on your solutions with test-case-level feedback and performance metrics.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Problems Solved", icon: Terminal },
    { number: "10K+", label: "Active Developers", icon: Users },
    { number: "25+", label: "Languages Supported", icon: Globe },
    { number: "99.9%", label: "Uptime", icon: Cpu },
  ];

  const problemCategories = [
    {
      level: "Beginner",
      title: "Easy Problems",
      description: "Perfect for mastering syntax and basic logic.",
      count: "500+ Problems",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      level: "Intermediate",
      title: "Medium Problems",
      description: "Challenge yourself with essential data structures.",
      count: "800+ Problems",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      level: "Advanced",
      title: "Hard Problems",
      description: "Complex algorithms for competitive programming.",
      count: "300+ Problems",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.15),transparent_50%)] pointer-events-none"></div>

      {/* --- Hero Section --- */}
      <section className="relative z-10 pt-40 pb-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-8 uppercase tracking-widest shadow-[0_0_10px_-4px_rgba(245,158,11,0.5)]">
            <Star className="w-3 h-3" />
            <span>Join 10,000+ Developers</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8 leading-tight">
            Master{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
              Algorithms.
            </span>
            <br />
            Build{" "}
            <span className="relative z-10">
              Careers
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-amber-500 opacity-60 -z-10"
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
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            The modern platform for data structures and algorithms. Real-time
            execution, interview patterns, and a community that ships code.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link href="/problems">
              <Button
                size="lg"
                className="h-14 px-8 text-lg font-semibold bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl shadow-[0_0_20px_-5px_rgba(245,158,11,0.4)] transition-all hover:scale-105 active:scale-95"
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                Start Coding
              </Button>
            </Link>

            <Link href="/problems">
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg bg-transparent border-neutral-700 hover:bg-neutral-800 text-foreground rounded-xl transition-all"
              >
                Explore Problems
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Stats Glass Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-4 rounded-2xl bg-card/50 border border-border backdrop-blur-sm">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 hover:bg-white/5 rounded-xl transition-colors"
              >
                <div className="flex justify-center mb-2 text-neutral-500">
                  <stat.icon size={20} />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.number}
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Features Grid --- */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to{" "}
              <span className="text-amber-500">Excel</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We stripped away the clutter. No ads, no distractions. Just a
              pure, high-performance environment for mastering code.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-3xl border border-border bg-card/40 hover:bg-card/80 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Problem Categories --- */}
      <section className="relative z-10 py-24 px-6 bg-card/20 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Choose your Challenge
              </h2>
              <p className="text-muted-foreground">
                Curated paths for every skill level.
              </p>
            </div>
            <a
              href="/problems"
              className="hidden md:flex items-center gap-2 text-amber-500 hover:text-amber-400 font-medium transition-colors"
            >
              View all problems <ChevronRight size={16} />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {problemCategories.map((category, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-3xl border bg-card/50 backdrop-blur-sm hover:-translate-y-1 transition-all duration-300 ${category.border}`}
              >
                <div
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-bold mb-6 ${category.bg} ${category.color}`}
                >
                  {category.level}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-8 h-12">
                  {category.description}
                </p>
                <div
                  className={`flex items-center gap-2 font-mono text-sm ${category.color}`}
                >
                  <Code2 size={16} />
                  {category.count}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/problems">
              <Button variant="ghost" className="text-amber-500">
                View all problems
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="relative z-10 py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-amber-500/20 blur-[100px] rounded-full pointer-events-none" />

          <h2 className="relative text-4xl md:text-6xl font-bold text-foreground mb-8 tracking-tight">
            Ready to enter the <span className="text-amber-500">Arena?</span>
          </h2>
          <p className="relative text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
            Join the platform where developers transform into engineers. Start
            solving your first problem today.
          </p>
          <Link href="/problems">
            <Button
              size="lg"
              className="relative h-14 px-10 text-lg font-bold bg-white text-neutral-950 hover:bg-neutral-200 rounded-xl shadow-xl transition-all hover:scale-105"
            >
              Start for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
