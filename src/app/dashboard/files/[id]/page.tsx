import React from "react";

const ChatToFilePage = ({ params }: { params: { id: string } }) => {
  console.log(params);
  return <div>ChatToFilePage {params?.id}</div>;
};

export default ChatToFilePage;
