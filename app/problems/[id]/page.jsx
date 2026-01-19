import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getProblemById,
  getAllSubmissionByCurrentUserForProblem,
} from "@/modules/problems/actions";
import ProblemClient from "./ProblemClient";

export default async function ProblemPage({ params }) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const problemRes = await getProblemById(params.id);
  if (!problemRes.success) redirect("/");

  const submissionsRes = await getAllSubmissionByCurrentUserForProblem(
    params.id,
  );

  return (
    <ProblemClient
      problem={problemRes.data}
      submissionHistory={submissionsRes.success ? submissionsRes.data : []}
    />
  );
}
