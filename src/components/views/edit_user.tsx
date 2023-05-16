import { useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../layouts/admin";
import Input from "../common/input";
import { ObjectId } from "mongodb";
import useSWR from "swr";
import Dropzone from "../common/dropzone";
import Select from "../common/select";

interface Props {
  doc?: {
    _id?: ObjectId;
    name?: string;
    avatar?: string;
    roleId: ObjectId | null;
    phone?: string;
    email?: string;
    username: string;
  };
  create?: boolean;
}
export default function EditUser({
  doc = {
    name: "",
    avatar: "",
    roleId: null,
    phone: "",
    email: "",
    username: "",
  },
  create = false,
}: Props) {
  const [name, setName] = useState(doc.name);
  const [avatar, setAvatar] = useState(doc.avatar);
  const [roleId, setRoleId] = useState(doc.roleId);
  const [email, setEmail] = useState(doc.email);
  const [username, setUsername] = useState(doc.username);
  const [phone, setPhone] = useState(doc.phone);

  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useSWR("/api/v2/roles");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const url = create ? `/api/v2/users` : `/api/v2/users/${doc._id}`;
    const options = {
      method: create ? "POST" : "PUT",
      body: JSON.stringify({ name, avatar, roleId, email, username, phone }),
    };
    const res = await fetch(url, options);
    const json = await res.json();
    console.log(json);

    if (json.success) {
      toast.success(create ? "Successfully created!" : "Successfully updated!");
    }
    setLoading(false);
  };
  return (
    <AdminLayout>
      <div className="card card-body bg-base-100 items-center">
        <form onSubmit={onSubmit}>
          <div className="text-center">
            {avatar ? (
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img className="bg-base-300" src={avatar} />
                </div>
              </div>
            ) : (
              <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                  <span className="text-3xl uppercase">
                    {username ? username[0] : "?"}
                  </span>
                </div>
              </div>
            )}

            <Dropzone
              uploadHandler={(data: any) => {
                console.log("data", data);
                setAvatar(
                  `https://eureka-school.s3.us-east-005.backblazeb2.com/${data.Key}`
                );
              }}
              text="Upload avatar"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Name"
              value={name}
              placeholder="Anakin Skywalker"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              label="Phone"
              value={phone}
              placeholder="09123456789"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <Input
              label="Username"
              value={username}
              placeholder="anakin"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Input
              label="Email"
              value={email}
              placeholder="anakin@jedi.org"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Select
              label="Role"
              value={roleId}
              options={isLoading ? [{}] : data.data}
              onChange={(e) => {
                setRoleId(e.target.value);
              }}
            />
          </div>
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
