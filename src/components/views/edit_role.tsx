import { useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../layouts/admin";
import Input from "../common/input";

interface Props {
  doc?: { name?: string };
  create?: boolean;
}
export default function EditRole({
  doc = { name: "" },
  create = false,
}: Props) {
  const [data, setData] = useState(doc as any);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const url = create ? `/api/v2/roles` : `/api/v2/roles/${data._id}`;
    const options = {
      method: create ? "POST" : "PUT",
      body: JSON.stringify(data),
    };
    const res = await fetch(url, options);
    const json = await res.json();
    if (json.success) {
      toast.success(create ? "Successfully created!" : "Successfully updated!");

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
          <Input
            label="Name"
            value={data.level}
            placeholder="0"
            onChange={(e) => {
              setData({ ...data, level: e.target.value });
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
