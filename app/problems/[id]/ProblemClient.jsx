"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Editor from "@monaco-editor/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Play,
  Send,
  Code2,
  FileText,
  Lightbulb,
  History,
  ArrowLeft,
  ChevronRight,
  Settings2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { getJudge0LanguageId } from "@/lib/judge0";
import { toast } from "sonner";
import Link from "next/link";
// import { executeCode, getAllSubmissionByCurrentUserForProblem } from "@/modules/problems/actions"; // Keep your imports
import { SubmissionDetails } from "@/modules/problems/components/submission-details";
import { TestCaseTable } from "@/modules/problems/components/test-case-table";
import { SubmissionHistory } from "@/modules/problems/components/submission-history";

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "EASY":
      return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    case "MEDIUM":
      return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    case "HARD":
      return "text-rose-500 bg-rose-500/10 border-rose-500/20";
    default:
      return "text-zinc-500 bg-zinc-500/10 border-zinc-500/20";
  }
};

const ProblemClient = ({ problem, submissionHistory }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionHistoryState, setSubmissionHistoryState] = useState(
    submissionHistory || [],
  );
  const [executionResponse, setExecutionResponse] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const { theme } = useTheme();

  useEffect(() => {
    if (problem && problem.codeSnippets[selectedLanguage]) {
      setCode(problem.codeSnippets[selectedLanguage]);
    }
  }, [selectedLanguage, problem]);

  // --- Logic remains unchanged ---
  const handleRun = async () => {
    try {
      setIsRunning(true);
      const language_id = getJudge0LanguageId(selectedLanguage);
      const stdin = problem.testCases.map((tc) => tc.input);
      const expected_outputs = problem.testCases.map((tc) => tc.output);
      const res = await executeCode(
        code,
        language_id,
        stdin,
        expected_outputs,
        problem.id,
      );

      setExecutionResponse(res);
      if (res.success) toast.success(res.message);
    } catch (error) {
      console.error("Error running code:", error);
      toast.error(error.message);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const language_id = getJudge0LanguageId(selectedLanguage);
      const stdin = problem.testCases.map((tc) => tc.input);
      const expected_outputs = problem.testCases.map((tc) => tc.output);
      const res = await executeCode(
        code,
        language_id,
        stdin,
        expected_outputs,
        problem.id,
      );

      if (!res.success) {
        toast.error(res.error || "Submission failed");
        return;
      }

      setExecutionResponse(res);
      const historyRes = await getAllSubmissionByCurrentUserForProblem(
        problem.id,
      );
      if (historyRes.success) setSubmissionHistory(historyRes.data);

      if (res.submission.status === "Accepted") {
        toast.success("Accepted");
      } else {
        toast.error("Wrong Answer");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error submitting solution");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-300 overflow-hidden">
      {/* --- Top Navigation Bar --- */}
      <header className="h-14 flex-none border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 backdrop-blur px-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <Link href="/problems">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
              {problem?.title}
            </span>
            <Badge
              variant="outline"
              className={cn(
                "rounded-md px-2 py-0.5 text-xs font-medium border-0",
                getDifficultyColor(problem?.difficulty),
              )}
            >
              {problem?.difficulty}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Settings2 className="w-4 h-4" />
          </Button>
          <ModeToggle />
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-xs">
            U
          </div>
        </div>
      </header>

      {/* --- Main Workspace (Split View) --- */}
      <div className="flex-1 flex overflow-hidden">
        {/* --- LEFT PANEL: Problem Description --- */}
        <div className="w-1/2 flex flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col min-h-0"
          >
            {/* Tab Header */}
            <div className="flex-none border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 px-2">
              <TabsList className="h-10 bg-transparent p-0 gap-6">
                <TabsTrigger
                  value="description"
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-transparent data-[state=active]:text-amber-500 px-2 text-xs font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                >
                  <FileText className="w-4 h-4 mr-2" /> Description
                </TabsTrigger>
                <TabsTrigger
                  value="editorial"
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-transparent data-[state=active]:text-amber-500 px-2 text-xs font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                >
                  <Lightbulb className="w-4 h-4 mr-2" /> Editorial
                </TabsTrigger>
                <TabsTrigger
                  value="submissions"
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-transparent data-[state=active]:text-amber-500 px-2 text-xs font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                >
                  <History className="w-4 h-4 mr-2" /> Submissions
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Scrollable Content Area */}
            <ScrollArea className="flex-1">
              <div className="p-6 max-w-3xl mx-auto pb-20">
                <TabsContent
                  value="description"
                  className="mt-0 space-y-8 animate-in fade-in-50 duration-300"
                >
                  {/* Title & Tags */}
                  <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                      {problem?.title}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                      {problem?.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium border border-zinc-200 dark:border-zinc-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description Text */}
                  <div className="prose prose-zinc dark:prose-invert max-w-none text-sm leading-7">
                    {problem?.description}
                  </div>

                  {/* Examples */}
                  <div className="space-y-4">
                    {problem?.examples[selectedLanguage] && (
                      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4 overflow-hidden">
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                          <div className="w-1 h-4 bg-amber-500 rounded-full" />{" "}
                          Example 1
                        </h3>
                        <div className="space-y-3 text-sm font-mono">
                          <div>
                            <span className="text-zinc-500 select-none">
                              Input:
                            </span>
                            <div className="mt-1 p-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-800 dark:text-zinc-200">
                              {problem?.examples[selectedLanguage].input}
                            </div>
                          </div>
                          <div>
                            <span className="text-zinc-500 select-none">
                              Output:
                            </span>
                            <div className="mt-1 p-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-800 dark:text-zinc-200">
                              {problem?.examples[selectedLanguage].output}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Constraints */}
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                      Constraints
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-600 dark:text-zinc-400 marker:text-zinc-400">
                      {problem?.constraints
                        .split("\n")
                        .map((c, i) => c.trim() && <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="editorial" className="mt-0">
                  <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
                    <Lightbulb className="w-12 h-12 mb-4 opacity-20" />
                    <p>{problem.editorial || "Editorial coming soon."}</p>
                  </div>
                </TabsContent>

                <TabsContent value="submissions" className="mt-0">
                  <SubmissionHistory submissions={submissionHistoryState} />
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </div>

        {/* --- RIGHT PANEL: Editor & Console --- */}
        <div className="w-1/2 flex flex-col bg-white dark:bg-[#1e1e1e]">
          {/* Editor Toolbar */}
          <div className="flex-none h-12 flex items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1e1e1e]">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Code
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Select
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
              >
                <SelectTrigger className="h-7 w-[140px] text-xs bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JAVASCRIPT">JavaScript</SelectItem>
                  <SelectItem value="PYTHON">Python</SelectItem>
                  <SelectItem value="JAVA">Java</SelectItem>
                  <SelectItem value="CPP">C++</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 relative">
            <Editor
              height="100%"
              language={
                selectedLanguage.toLowerCase() === "javascript"
                  ? "javascript"
                  : selectedLanguage.toLowerCase()
              }
              value={code}
              onChange={(value) => setCode(value || "")}
              theme={theme === "dark" ? "vs-dark" : "light"}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              }}
            />

            {/* Floating Action Buttons (Bottom Right of Editor) */}
            <div className="absolute bottom-4 right-6 flex gap-3 z-10">
              <Button
                onClick={handleRun}
                disabled={isRunning}
                variant="secondary"
                size="sm"
                className="shadow-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700"
              >
                {isRunning ? (
                  <div className="w-4 h-4 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Play className="w-4 h-4 mr-2 text-zinc-600 dark:text-zinc-300" />
                )}
                Run
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                size="sm"
                className="shadow-lg bg-green-600 hover:bg-green-700 text-white border-transparent"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                Submit
              </Button>
            </div>
          </div>

          {/* Console / Test Cases Panel (Collapsible feel) */}
          <div className="h-[250px] flex-none border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col">
            {/* Console Header */}
            <div className="flex items-center gap-6 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800">
              <button className="text-xs font-medium text-zinc-900 dark:text-white border-b-2 border-amber-500 pb-2 -mb-2.5">
                Test Cases
              </button>
              <button className="text-xs font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 pb-2 -mb-2.5">
                Console
              </button>
            </div>

            <ScrollArea className="flex-1 p-4">
              {/* Logic to show results vs test cases */}
              {executionResponse?.submission ? (
                <div className="space-y-4">
                  <div
                    className={cn(
                      "flex items-center gap-2 text-sm font-semibold",
                      executionResponse.submission.status === "Accepted"
                        ? "text-green-500"
                        : "text-red-500",
                    )}
                  >
                    {executionResponse.submission.status === "Accepted" ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                    {executionResponse.submission.status}
                  </div>
                  <SubmissionDetails
                    submission={executionResponse.submission}
                  />
                  <TestCaseTable
                    testCases={executionResponse.submission.testCases}
                  />
                </div>
              ) : (
                <div className="flex gap-4">
                  {problem.testCases.map((testCase, index) => (
                    <div
                      key={index}
                      className="flex-1 min-w-[200px] space-y-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
                    >
                      <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                        Case {index + 1}
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-zinc-400">Input =</div>
                        <div className="text-sm font-mono bg-zinc-100 dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800">
                          {testCase.input}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-zinc-400">Expected =</div>
                        <div className="text-sm font-mono bg-zinc-100 dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800">
                          {testCase.output}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemClient;
