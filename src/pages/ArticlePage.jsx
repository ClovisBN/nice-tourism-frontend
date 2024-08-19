// src/pages/ArticleListPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosConfig";

const ArticlePage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axiosInstance.get("/articles");
        console.log(response.data); // Ajoutez ceci pour voir ce que l'API renvoie
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="article-list">
      {articles.map((article) => (
        <div key={article.id} className="article">
          <h2>
            <Link to={`/articles/${article.id}`}>{article.name}</Link>
          </h2>
          <p>{article.description}</p>
          {article.image && <img src={article.image} alt={article.name} />}
        </div>
      ))}
    </div>
  );
};

export default ArticlePage;
