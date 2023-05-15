import prisma from "@/lib/prisma";
import EditRole from "@/components/views/edit_role";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { serialize } from "@/lib/helper";

export async function getServerSideProps({ params }: { params: any }) {
  const client = await clientPromise;
  const col = client.db("eureka-school").collection("roles");
  const id = new ObjectId(params.id);
  const doc = await col.findOne({ _id: id });
  return {
    props: { doc: serialize(doc) }, // will be passed to the page component as props
  };
}

export default function Page({ doc }: { doc: any }) {
  return <EditRole doc={doc} />;
}
