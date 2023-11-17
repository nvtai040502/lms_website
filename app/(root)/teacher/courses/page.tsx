import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/data-table/columns";

const CoursePage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      <DataTable columns={columns} data={courses} />
    </div>
  )
}
export default CoursePage;