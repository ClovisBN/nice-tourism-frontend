// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ArticlePage from "./pages/ArticlePage";
import PersistentMap from "./components/Map/PersistentMap";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateArticlePage from "./pages/CreateArticlePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import AdminLayout from "./pages/Layouts/AdminLayout";
import UserLayout from "./pages/Layouts/UserLayout";
import VisitorLayout from "./pages/Layouts/VisitorLayout";
import UserListPage from "./pages/UserListPage";
import RoleBasedRedirect from "./components/RoleBasedRedirect"; // Importez votre composant
import "./styles/global.css";
import { AppProvider } from "./context/AppContext";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Pages accessibles par tous */}
          <Route element={<VisitorLayout />}>
            <Route path="/" element={<PersistentMap />} />
            <Route path="/article" element={<ArticlePage />} />
            <Route path="/articles/:id" element={<ArticleDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Pages accessibles uniquement par les utilisateurs */}
          <Route element={<UserLayout />}>
            <Route path="/map" element={<PersistentMap />} />
            <Route path="/user/article" element={<ArticlePage />} />
            <Route path="/user/articles/:id" element={<ArticleDetailPage />} />
          </Route>

          {/* Pages accessibles uniquement par les administrateurs */}
          <Route element={<AdminLayout />}>
            <Route
              path="/admin/articles/create"
              element={<CreateArticlePage />}
            />
            <Route path="/admin/users" element={<UserListPage />} />
          </Route>

          {/* Route de type catch-all pour rediriger les utilisateurs */}
          <Route path="*" element={<RoleBasedRedirect />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
