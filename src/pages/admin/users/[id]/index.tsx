import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { serialize } from "@/lib/helper";
import EditUser from "@/components/views/edit_user";

export async function getServerSideProps({ params }: { params: any }) {
  const client = await clientPromise;
  const col = client.db("eureka-school").collection("users");
  const id = new ObjectId(params.id);
  const doc = await col.findOne({ _id: id });
  return {
    props: { doc: serialize(doc) }, // will be passed to the page component as props
  };
}

export default function Page({ doc }: { doc: any }) {
  return <EditUser doc={doc} />;
}
