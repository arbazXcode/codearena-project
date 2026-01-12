import { db } from "@/lib/db";
import { currentUserRole, getCurrentUser } from "@/modules/auth/actions";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const userRole = await currentUserRole();
        const user = await getCurrentUser();

        if (userRole !== UserRole.ADMIN) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        const body = await request.json();

        const updatedProblem = await db.problem.update({
            where: { id },
            data: {
                title: body.title,
                description: body.description,
                difficulty: body.difficulty,
                tags: body.tags,
                examples: body.examples,
                constraints: body.constraints,
                hints: body.hints,
                editorial: body.editorial,
                testCases: body.testCases,
                codeSnippets: body.codeSnippets,
                referenceSolutions: body.referenceSolutions,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Problem updated successfully",
            data: updatedProblem,
        });
    } catch (error) {
        console.error("UPDATE PROBLEM ERROR:", error);
        return NextResponse.json(
            { error: "Failed to update problem" },
            { status: 500 }
        );
    }
}
