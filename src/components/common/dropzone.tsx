import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Dropzone({ uploadHandler }: { uploadHandler: any }) {
  const onDrop = useCallback(
    async (acceptedFiles: any) => {
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
    },
    [uploadHandler]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="text-center border-2 border-neutral-400 border-dashed rounded-xl max-w-xl mx-auto p-10 my-3 bg-base-300">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag n drop some files here, or click to select files</p>
      )}
    </div>
  );
}
