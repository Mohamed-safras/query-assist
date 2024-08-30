import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import pineconeClient from "./pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { Index, RecordMetadata } from "@pinecone-database/pinecone";
import { PineconeConflictError } from "@pinecone-database/pinecone/dist/errors";
import { adminDB } from "../firebase/firebase_admin";
import { auth } from "@clerk/nextjs/server";
import { pineConeIndexName } from "../constants/pinecone.index";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";

const model = new ChatOpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
  modelName: "gpt-4o",
});

export const generateDocs = async (docId: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("user not found");
  }

  //   download file form URL
  const firebaseRef = await adminDB
    .collection("users")
    .doc(userId)
    .collection("files")
    .doc(docId)
    .get();

  const downloadUrl = firebaseRef.data()?.downloadUrl;

  if (!downloadUrl) throw new Error("Download URL not found");

  console.log(`download URL fetched successfully ${downloadUrl}`);

  const response = await fetch(downloadUrl);

  const data = await response.blob();

  //   load the PDF document from specified path

  const loader = new PDFLoader(data);

  const docs = await loader.load();

  console.log(docs);

  //   split the loaded document into smaller parts for easier processing
  const splitter = new RecursiveCharacterTextSplitter();

  const splitDocs = await splitter.splitDocuments(docs);

  console.log(`--- split into ${splitDocs.length} parts ---`);

  return splitDocs;
};

const nameSpaceExists = async (
  index: Index<RecordMetadata>,
  nameSpace: string
) => {
  if (nameSpace === null) throw new Error("No namespace value provided");

  const { namespaces } = await index.describeIndexStats();
  console.log(namespaces);
  return namespaces?.[nameSpace] !== undefined;
};

export async function generateEmbeddingInPineConeVectorStore(docId: string) {
  // check wheather user is authenticated or not
  const { userId } = await auth();

  if (!userId) throw new Error("User not found");

  // generateEmbeddings("hello world");
  let pineconeVectorStroe;
  console.log("... Generating embeddings for the split documents ...");

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPEN_AI_API_KEY,
  });
  console.log(await embeddings.embedQuery("hello"));

  const index = await pineconeClient.index(pineConeIndexName);

  console.log(index.namespace);
  console.log(index.describeIndexStats());

  const nameSpaceAlreadyExists = await nameSpaceExists(index, docId);

  if (nameSpaceAlreadyExists) {
    console.log(
      `--- Namespace ${docId} already exists , reusing existing embeddings`
    );

    pineconeVectorStroe = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      namespace: docId,
    });

    return pineconeVectorStroe;
  } else {
    // if the namespace does not exist , download the PDF from firestore via the started Download URl & generate the embeddings and store them in the Pinecone vector stroe

    const splitDocs = await generateDocs(docId);
    console.log(
      `--- storing the embeddings in namespace ${docId} in the ${index} pinecone vector store`
    );

    pineconeVectorStroe = await PineconeStore.fromDocuments(
      splitDocs,
      embeddings,
      {
        pineconeIndex: index,
        namespace: docId,
      }
    );

    return pineconeVectorStroe;
  }
}
