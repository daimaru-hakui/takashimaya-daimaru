import { db } from "@/firebase/server";
import { Project } from "@/types";
import { format } from "date-fns";
import { NextResponse } from "next/server";

export async function GET() {
  const ref = db
    .collection("projects")
    .where("isCompleted", "==", true)
    .where("deletedAt", "==", null)
    .orderBy("createdAt", "desc")
  const snapshot = await ref.get();
  let data: Project[] = [];
  snapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
      createdAt: format(new Date(doc.data().createdAt.toDate()), "yyyy-MM-dd"),
    } as Project);
  });

  return NextResponse.json(data, { status: 200 });
}
