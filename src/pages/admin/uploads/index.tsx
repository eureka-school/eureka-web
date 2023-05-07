import AdminLayout from "@/components/layouts/admin";
import { serialize } from "@/lib/helper";
import s3 from "@/lib/s3";
import Image from "next/image";
import toast from "react-hot-toast";

export async function getServerSideProps({}) {
  const params = {
    Bucket: process.env.BUCKET_NAME,
  };
  const res = await s3.listObjects(params).promise();
  console.log(res.Contents);

  return {
    props: { docs: serialize(res.Contents ? res.Contents : []) }, // will be passed to the page component as props
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
            {docs.map(({ id, Key }, idx) => (
              <tr key={`role-${idx}`}>
                <th>{idx + 1}</th>
                <td>
                  <a
                    href={`https://eureka-school.s3.us-east-005.backblazeb2.com/${Key}`}
                    target="_blank" 
                  >
                    {Key}
                  </a>
                </td>
                <td>
                  <Image
                    src={`https://eureka-school.s3.us-east-005.backblazeb2.com/${Key}`}
                    alt={Key}
                    width={128}
                    height={64}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-xs btn-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://eureka-school.s3.us-east-005.backblazeb2.com/${Key}`
                      );
                      toast.success("Copied to the clipboard!");
                    }}
                  >
                    Copy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
