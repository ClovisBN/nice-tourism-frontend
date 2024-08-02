// src/pages/ArticlePage.jsx
import React from "react";
import RichTextEditor from "../components/RichTextEditor";

const ArticlePage = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Article Title</h1>
      <RichTextEditor />
    </div>
  );
};

export default ArticlePage;
