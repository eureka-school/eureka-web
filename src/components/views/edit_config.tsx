import AdminLayout from "@/components/layouts/admin";
import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Content, OnChangeStatus } from "vanilla-jsoneditor";

interface Props {
  doc?: {
    [x: string]: any;
    name: string;
  };
  create?: boolean;
}

const JSONEditorReact = dynamic(() => import("@/components/common/editor"), {
  ssr: false,
});

export default function EditConfig({
  doc = { name: "" },
  create = false,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [jsonContent, setJsonContent] = useState<any>({
    json: { ...doc },
  });
  const handler = useCallback(
    (content: Content, previousContent: Content, status: OnChangeStatus) => {
      setJsonContent(content);
    },
    [jsonContent]
  );

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const url = create
      ? `/api/v2/configs/${doc.name}`
      : `/api/v2/configs/${doc.name}`;
    const parsed = JSON.parse(jsonContent.text);
    const payload = {
      ...parsed,
      createdAt: doc.createdAt,
    };

    const options = {
      method: create ? "POST" : "PUT",
      body: JSON.stringify(payload),
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
          <JSONEditorReact content={jsonContent} onChange={handler} />
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
