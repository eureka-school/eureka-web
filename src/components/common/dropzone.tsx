import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Dropzone({ uploadHandler }: { uploadHandler: any }) {
  const onDrop = useCallback(async (acceptedFiles: any) => {
    // Do something with the files
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    const url = "/api/uploads";
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const { success, data } = await res.json();
    uploadHandler(data);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}
