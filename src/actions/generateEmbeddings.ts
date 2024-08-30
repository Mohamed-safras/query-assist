"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { ROUTES } from "../constants/common/routes";
import { generateEmbeddingInPineConeVectorStore } from "../lib/langchain";

export default async function generateEmbeddings(docId: string) {
  auth().protect();

  //   turn a PDF to embeddings [0.22331,0.11111,....]

  await generateEmbeddingInPineConeVectorStore(docId);
  revalidatePath(`${ROUTES.DASH_BOARD}`);

  return { completed: true };
}
