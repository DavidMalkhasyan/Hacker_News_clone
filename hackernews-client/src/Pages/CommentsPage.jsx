import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Comment from "../Components/Comment";

const CommentsPage = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        <h1>Comments Page</h1>
        <Comment />
      </div>
    </>
  );
};

export default CommentsPage;