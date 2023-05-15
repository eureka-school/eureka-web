import AdminLayout from "@/components/layouts/admin";
import { serialize } from "@/lib/helper";
import clientPromise from "@/lib/mongodb";
import prisma from "@/lib/prisma";
import Link from "next/link";

export async function getServerSideProps({}) {
  const client = await clientPromise;
  const col = client.db("eureka-school").collection("roles");
  const docs = await col.find().toArray();
  return {
    props: { docs: serialize(docs) }, // will be passed to the page component as props
  };
}

export default function Page({ docs }: { docs: [] }) {
  return (
    <AdminLayout>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Level</th>
              <th>
                <Link
                  href="/admin/roles/create"
                  className="btn btn-xs btn-primary"
                >
                  Create
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {docs.map(({ _id, name, level }, idx) => (
              <tr key={`role-${idx}`}>
                <th>{idx + 1}</th>
                <td>{name}</td>
                <td>{level}</td>
                <td>
                  <Link
                    className="btn btn-xs btn-primary"
                    href={`/admin/roles/${_id}`}
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
