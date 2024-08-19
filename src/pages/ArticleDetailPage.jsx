// src/pages/ArticleDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosConfig";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axiosInstance.get(`/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching the article:", error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article-detail">
      <h1>{article.name}</h1>
      <p>{article.description}</p>
      {article.image && <img src={article.image} alt={article.name} />}
    </div>
  );
};

export default ArticleDetailPage;
