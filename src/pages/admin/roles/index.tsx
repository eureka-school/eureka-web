import AdminLayout from "@/components/layouts/admin";
import prisma from "@/lib/prisma";
import Link from "next/link";

export async function getServerSideProps({}) {
  const docs = await prisma.role.findMany({});
  return {
    props: { docs }, // will be passed to the page component as props
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
            {docs.map(({ id, name }, idx) => (
              <tr key={`role-${idx}`}>
                <th>{idx + 1}</th>
                <td>{name}</td>
                <td>
                  <Link
                    className="btn btn-xs btn-primary"
                    href={`/admin/roles/${id}`}
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
