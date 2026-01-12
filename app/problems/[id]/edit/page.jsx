import { db } from "@/lib/db";
import CreateProblemForm from "@/modules/problems/components/create-problem-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const EditProblemPage = async ({ params }) => {
  // ✅ SAFE auth method for Server Components
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const problem = await db.problem.findUnique({
    where: { id: params.id },
  });

  if (!problem) {
    redirect("/problems");
  }

  return (
    <section className="mx-4 my-4">
      <CreateProblemForm initialData={problem} problemId={problem.id} />
    </section>
  );
};

export default EditProblemPage;
