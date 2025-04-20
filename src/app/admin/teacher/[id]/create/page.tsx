import CreateNewShiftCard from "@/components/teacher/CreateNewShiftCard";


// export async function generateStaticParams() {
//     return [];
// }

export default async function createNewShiftByTeacher({ params} :{ params: Promise<{id: string}>}) {
    const { id  } = await params;

    return (
        <>
          <h1>新規シフトの作成</h1>
          <CreateNewShiftCard teacherId={Number(id)} />
        </>
    )
    

}
