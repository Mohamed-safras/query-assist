import { useState } from "react";
import { Status } from "../types/status";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { StatusTex } from "../constants/common/statusText";
import { doc, setDoc } from "firebase/firestore";
import generateEmbeddings from "../actions/generateEmbeddings";

const useUpload = () => {
  const [progress, setProgress] = useState<number | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status | null>(null);

  const { user } = useUser();
  const router = useRouter();

  const handelUpload = async (file: File) => {
    if (!file || !user) return;

    // TODO: free/pro limitation

    const fileIdToUploadTo = uuidv4();

    const storageRef = ref(
      storage,
      `users/${user.id}/files/${fileIdToUploadTo}`
    );

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setStatus(StatusTex.UPLOADING);
        setProgress(percent);
      },
      (error) => {
        console.error("Error uploading file", error);
      },
      async () => {
        setStatus(StatusTex.UPLOADED);
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setStatus(StatusTex.SAVING);

        await setDoc(doc(db, "users", user.id, "files", fileIdToUploadTo), {
          name: file.name,
          size: file.size,
          type: file.type,
          downloadUrl,
          ref: uploadTask.snapshot.ref.fullPath,
          createAt: new Date(), //set up server time zone
        });

        setStatus(StatusTex.GENERATING);

        // generating AI embeddings
        await generateEmbeddings(fileIdToUploadTo);

        setFileId(fileIdToUploadTo);
      }
    );
  };

  return {
    handelUpload,
    progress,
    fileId,
    status,
  };
};

export default useUpload;
