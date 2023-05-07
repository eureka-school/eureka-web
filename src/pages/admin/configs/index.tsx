import AdminLayout from "@/components/layouts/admin";
import { serialize } from "@/lib/helper";

import clientPromise from "@/lib/mongodb";
import Link from "next/link";

export async function getServerSideProps({}) {
  const client = await clientPromise;
  const col = client.db("eureka-school").collection("configs");
  const docs = await col.find().toArray();

  return {
    props: { docs: serialize(docs) }, // will be passed to the page component as props
  };
}

export default function Page({ docs }: { docs: [] }) {
  console.log(docs);

  return (
    <AdminLayout>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th></th>
              <th></th>
              <th>
                <Link
                  href="/admin/configs/create"
                  className="btn btn-xs btn-primary"
                >
                  Create
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {docs.map(({ id, name, createdAt, updatedAt }, idx) => (
              <tr key={`role-${idx}`}>
                <th>{idx + 1}</th>
                <td>{name}</td>
                <td>{createdAt}</td>
                <td>{updatedAt}</td>
                <td>
                  <Link
                    className="btn btn-xs btn-primary"
                    href={`/admin/configs/${name}`}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
