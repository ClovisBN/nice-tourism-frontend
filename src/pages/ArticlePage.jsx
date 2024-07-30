// src/pages/ArticlePage.jsx
import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const ArticlePage = () => {
  const { setIsMapVisible } = useAppContext();

  useEffect(() => {
    setIsMapVisible(false);
    return () => setIsMapVisible(true); // Remettre la carte visible lors de la navigation
  }, [setIsMapVisible]);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Article Title</h1>
      <p>This is the article content.</p>
    </div>
  );
};

export default ArticlePage;
