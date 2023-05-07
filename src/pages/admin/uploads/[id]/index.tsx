import AdminLayout from "@/components/layouts/admin";
import prisma from "@/lib/prisma";
import Input from "@/components/common/input";
import toast from "react-hot-toast";
import { useState } from "react";

export async function getServerSideProps({ params }: { params: any }) {
  const id = parseInt(params.id);
  const doc = await prisma.role.findUnique({ where: { id: id } });
  return {
    props: { doc }, // will be passed to the page component as props
  };
}

export default function Page({ doc }: { doc: [] }) {
  const [data, setData] = useState(doc as any);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log("submit", data);

    const url = `/api/roles/${data.id}`;
    const options = {
      method: "PUT",
      body: JSON.stringify(data),
    };
    const res = await fetch(url, options);
    const json = await res.json();
    if (json.success) {
      toast.success("Successfully updated!");
      console.log("toast");

      setData(json.data);
    }
    setLoading(false);
  };
  return (
    <AdminLayout>
      <div className="card card-body bg-base-100 items-center">
        <form onSubmit={onSubmit}>
          <Input
            label="Name"
            value={data.name}
            placeholder="admin"
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
          />
          <div className="text-center">
            <button
              className={
                loading
                  ? "btn btn-primary loading my-10"
                  : "btn btn-primary my-10"
              }
              type="submit"
              onClick={onSubmit}
              disabled={loading}
            >
              {loading ? "Loading" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
