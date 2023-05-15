import AdminLayout from "@/components/layouts/admin";
import { serialize } from "@/lib/helper";
import clientPromise from "@/lib/mongodb";
import prisma from "@/lib/prisma";
import Link from "next/link";

export async function getServerSideProps({}) {
  const client = await clientPromise;
  const col = client.db("eureka-school").collection("users");
  const docs = await col
    .aggregate([
      {
        $lookup: {
          from: "roles",
          localField: "roleId",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $addFields: {
          role: {
            $arrayElemAt: ["$role", 0],
          },
        },
      },
      {
        $project: {
          password: 0,
        },
      },
    ])
    .toArray();

  return {
    props: { docs: serialize(docs) }, // will be passed to the page component as props
  };
}

export default function Page({ docs }: { docs: any[] }) {
  return (
    <AdminLayout>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Role</th>
              <th>
                <Link
                  href="/admin/users/create"
                  className="btn btn-xs btn-primary"
                >
                  Create
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {docs.map(({ _id, username, role }, idx) => (
              <tr key={`role-${idx}`}>
                <th>{idx + 1}</th>
                <td>{username}</td>
                <td>{role.name}</td>
                <td>
                  <Link
                    className="btn btn-xs btn-primary"
                    href={`/admin/users/${_id}`}
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
