import AdminLayout from "@/components/layouts/admin";
import prisma from "@/lib/prisma";
import clientPromise from "@/lib/mongodb";

export async function getServerSideProps({}) {
  const client = await clientPromise;
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
                <button className="btn btn-xs btn-primary">Create</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {docs.map(({ id, name }, idx) => (
              <tr key={`role-${idx}`}>
                <th>{idx}</th>
                <td>{name}</td>
                <td>
                  <a
                    className="btn btn-xs btn-primary"
                    href={`/admin/roles/${id}`}
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
