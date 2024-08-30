"use client";
import { ROUTES } from "@/src/constants/common/routes";
import { StatusTex } from "@/src/constants/common/statusText";
import useUpload from "@/src/hooks/useUpload";
import {
  CheckCircleIcon,
  CircleArrowDown,
  HammerIcon,
  Key,
  RocketIcon,
  SaveIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = () => {
  const { status, fileId, progress, handelUpload } = useUpload();

  const router = useRouter();

  useEffect(() => {
    if (fileId) {
      router.push(`${ROUTES.DASH_BOARD}/files/${fileId}`);
    }
  }, [fileId, router]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (file) {
        await handelUpload(file);
      } else {
        // toast notfication ...s
      }
    },
    [handelUpload]
  );

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      accept: {
        "application/pdf": [".pdf"],
        // "application/image": [".png"],
      },
    });

  const uploadInProgress =
    progress !== null && progress >= 0 && progress <= 100;

  const statusIcons: { [Key in StatusTex]: JSX.Element } = {
    [StatusTex.UPLOADING]: <RocketIcon className="h-20 w-20 text-indigo-600" />,
    [StatusTex.UPLOADED]: (
      <CheckCircleIcon className="h-20 w-20 text-indigo-600" />
    ),
    [StatusTex.SAVING]: <SaveIcon className="h-20 w-20 text-indigo-600" />,
    [StatusTex.GENERATING]: (
      <HammerIcon className="h-20 w-20 text-indigo-600 animate-bounce" />
    ),
  };
  return (
    <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto">
      {/* loading */}
      {uploadInProgress && (
        <div className="mt-32 flex flex-col items-center justify-center gap-5">
          <div
            className={`radial-progress bg-indigo-300 text-white border-indigo-600 border-4 ${
              progress === 100 && "hidden"
            }`}
            role="progressbar"
            style={{
              // @ts-ignore
              "--value": progress,
              "--size": "12rem",
              "--thickness": "1.3rem",
            }}
          >
            {progress} %
          </div>

          {
            //@ts-ignore
            statusIcons[status!]
          }
          {status && <p>{status.toLocaleString()}</p>}
        </div>
      )}

      {!uploadInProgress && (
        <div
          {...getRootProps()}
          className={`p-10 border-2 border-dashed mt-10 w-[90%] border-indigo-600 text-indigo-600 rounded-lg h-96 flex items-center justify-center text-center ${
            isFocused || isDragAccept ? "bg-indigo-300" : "bg-indigo-100"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center">
            {isDragActive ? (
              <>
                <RocketIcon className="h-20 w-20 animate-ping" />
                <p>Drop the files here ...</p>
              </>
            ) : (
              <>
                <CircleArrowDown className="h-20 w-20 animate-bounce" />
                <p>Drag {"n"} drop some files here, or click to select files</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
