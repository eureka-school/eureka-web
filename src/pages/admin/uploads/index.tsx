import Dropzone from "@/components/common/dropzone";
import AdminLayout from "@/components/layouts/admin";
import { serialize, uploadLocation } from "@/lib/helper";
import clientPromise from "@/lib/mongodb";
import Image from "next/image";
import toast from "react-hot-toast";

export async function getServerSideProps({}) {
  const client = await clientPromise;
  const col = client.db("eureka-school").collection("uploads");
  const docs = await col.find().toArray();
  return {
    props: { docs: serialize(docs), base_url: process.env.BUCKET_BASE_URL }, // will be passed to the page component as props
  };
}

export default function Page({
  docs,
  base_url,
}: {
  docs: [];
  base_url: string;
}) {
  const uploadHandler = (data: any) => {
    toast.success("Successfully uploaded!");
  };

  return (
    <AdminLayout>
      <div className="overflow-x-auto w-full">
        <div className="text-center">
          <p className="text-bold">Upload</p>
          <Dropzone uploadHandler={uploadHandler} />
        </div>
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Key</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {docs.map(({ _id, Key }, idx) => (
              <tr key={`role-${idx}`}>
                <th>{idx + 1}</th>
                <td>
                  <a href={`${base_url}/${Key}`} target="_blank">
                    {Key}
                  </a>
                </td>
                <td>
                  <Image
                    src={`${base_url}/${Key}`}
                    alt={Key}
                    width={256}
                    height={64}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-xs btn-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${base_url}/${Key}`
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
