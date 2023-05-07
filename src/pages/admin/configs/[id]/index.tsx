import { serialize } from "@/lib/helper";
import clientPromise from "@/lib/mongodb";
import EditConfig from "@/components/views/edit_config";

export async function getServerSideProps({ params }: { params: any }) {
  const client = await clientPromise;
  const col = client.db("eureka-school").collection("configs");
  const id = params.id;
  const doc = await col.findOne({ name: id });

  return {
    props: { doc: serialize(doc) }, // will be passed to the page component as props
  };
}

export default function Page({ doc }: { doc: any }) {
  return <EditConfig doc={doc} />;
}
