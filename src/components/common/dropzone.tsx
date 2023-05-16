import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Dropzone({
  uploadHandler,
  text = "Drag n drop some file here, or click to select file",
}: {
  uploadHandler: any;
  text?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      setUploading(true);
      // Do something with the files
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      const url = "/api/v2/uploads";
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const { success, data } = await res.json();
      uploadHandler(data);
      setUploading(false);
    },
    [uploadHandler]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="text-center border-2 border-neutral-400 border-dashed rounded-xl max-w-xl mx-auto p-10 my-3 bg-base-300"
    >
      <input {...getInputProps()} />
      {uploading ? (
        <p>Uploading ...</p>
      ) : isDragActive ? (
        <p>Drop the file here ...</p>
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
}
