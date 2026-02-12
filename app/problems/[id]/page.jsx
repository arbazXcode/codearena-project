import { auth } from "@clerk/nextjs/server";
import {
  getProblemById,
  getAllSubmissionByCurrentUserForProblem,
} from "@/modules/problems/actions";
import ProblemClient from "./ProblemClient";

export default async function ProblemPage({ params }) {
  // ✅ unwrap params (IMPORTANT)
  const { id } = await params;

  // 1️⃣ Fetch problem (PUBLIC)
  const problemRes = await getProblemById(id);
  if (!problemRes.success || !problemRes.data) {
    return <div className="p-6">Problem not found</div>;
  }

  // 2️⃣ Auth OPTIONAL
  const { userId } = auth();
  let submissionHistory = [];

  if (userId) {
    const submissionsRes = await getAllSubmissionByCurrentUserForProblem(id);

    if (submissionsRes.success) {
      submissionHistory = submissionsRes.data;
    }
  }

  return (
    <ProblemClient
      problem={problemRes.data}
      submissionHistory={submissionHistory}
    />
  );
}
