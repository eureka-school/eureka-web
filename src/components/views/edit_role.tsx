import { useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../layouts/admin";
import Input from "../common/input";
import { ObjectId } from "mongodb";

interface Props {
  doc?: {
    _id?: ObjectId;
    name?: string;
    level?: number;
  };
  create?: boolean;
}
export default function EditRole({
  doc = { name: "", level: 10 },
  create = false,
}: Props) {
  const [name, setName] = useState(doc.name);
  const [level, setLevel] = useState(doc.level);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const url = create ? `/api/v2/roles` : `/api/v2/roles/${doc._id}`;
    const options = {
      method: create ? "POST" : "PUT",
      body: JSON.stringify({ name, level }),
    };
    const res = await fetch(url, options);
    const json = await res.json();
    if (json.success) {
      toast.success(create ? "Successfully created!" : "Successfully updated!");
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="card card-body bg-base-100 items-center">
        <form onSubmit={onSubmit}>
          <Input
            label="Name"
            value={name}
            placeholder="admin"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            label="Level"
            value={level}
            placeholder="0"
            onChange={(e) => {
              setLevel(e.target.value);
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
