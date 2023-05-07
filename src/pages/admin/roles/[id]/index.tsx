import prisma from "@/lib/prisma";
import EditRole from "@/components/views/edit_role";

export async function getServerSideProps({ params }: { params: any }) {
  const id = parseInt(params.id);
  const doc = await prisma.role.findUnique({ where: { id: id } });
  return {
    props: { doc }, // will be passed to the page component as props
  };
}

export default function Page({ doc }: { doc: any }) {
  return <EditRole doc={doc} />;
}
