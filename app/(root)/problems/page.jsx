import { db } from "@/lib/db";
import { getAllProblems } from "@/modules/problems/actions";
import ProblemsTable from "@/modules/problems/components/problem-table";
import { currentUser } from "@clerk/nextjs/server";
import { AlertCircle, Code2, Sparkles } from "lucide-react";
import React from "react";

const ProblemsPage = async () => {
  const user = await currentUser();

  let dbUser = null;

  if (user) {
    dbUser = await db.user.findUnique({
      where: { clerkId: user.id },
      select: { id: true, role: true },
    });
  }

  const { data: problems, error } = await getAllProblems();

  // --- Modern Error State ---
  if (error) {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-950 px-4">
        {/* Background Grid Pattern for Error Page */}
        <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative z-10 max-w-md w-full text-center p-8 rounded-3xl border border-red-200 dark:border-red-900/50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-xl shadow-red-500/5">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10 mb-6">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            System Interruption
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">{error}</p>
        </div>
      </div>
    );
  }

  // --- Modern Main UI ---
  return (
    <div className="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300 selection:bg-amber-500/30 selection:text-amber-900 dark:selection:text-amber-200">
      {/* Background Grid Pattern (Matches your About Page) */}
      <div className="fixed inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      {/* Radial Gradient overlay */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,191,36,0.08),transparent_50%)] pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 py-24 max-w-7xl">
        {/* --- Page Header --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-amber-500/10 border border-neutral-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-mono mb-6 uppercase tracking-widest shadow-sm dark:shadow-none">
              <Sparkles size={14} />
              <span>Explore Challenges</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-600">
                Arena
              </span>{" "}
              Awaits.
            </h1>

            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Sharpen your skills with our curated collection of algorithms and
              data structures. Filter by difficulty, track your progress, and
              master the patterns.
            </p>
          </div>

          {/* Quick Stat Card */}
          <div className="hidden md:flex items-center gap-5 bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm backdrop-blur-md">
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500">
              <Code2 size={24} />
            </div>
            <div className="pr-4">
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                Total Problems
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {problems?.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* --- Table Container --- */}
        <div className="relative rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/60 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-none overflow-hidden">
          {/* Subtle top highlight gradient */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>

          <div className="p-4 sm:p-6 md:p-8">
            <ProblemsTable problems={problems} user={dbUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemsPage;
