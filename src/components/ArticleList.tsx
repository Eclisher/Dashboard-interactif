"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchArticles } from "@/lib/fetchArticles";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Search, Trash, Edit, PlusCircle, Star } from "lucide-react";
import ArticleForm from "./ArticleForm";

const ArticleList = () => {
  const queryClient = useQueryClient();
  const { data: articles = [] } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const addArticleMutation = useMutation({
    mutationFn: async (newArticle: any) => {
      const updatedArticles = [
        ...articles, 
        { ...newArticle, id: crypto.randomUUID() }
      ];
      localStorage.setItem(
        "articles",
        JSON.stringify(updatedArticles.filter(article => !article.id.startsWith("api")))
      );
      return updatedArticles;
    },
    onSuccess: (newArticles) => {
      queryClient.setQueryData(["articles"], newArticles);
      setShowForm(false);
    },
  });

  const deleteArticleMutation = useMutation({
    mutationFn: async (articleId: string) => {
      const updatedArticles = articles.filter((article: any) => article.id !== articleId);
      localStorage.setItem("articles", JSON.stringify(updatedArticles));
      return updatedArticles;
    },
    onSuccess: (newArticles) => {
      queryClient.setQueryData(["articles"], newArticles);
    },
  });
  

  const handleAddOrUpdateArticle = (article: any) => {
    if (editingArticle) {
      const updatedArticles = articles.map((a: any) =>
        a.id === article.id ? article : a
      );
      queryClient.setQueryData(["articles"], updatedArticles);
      setEditingArticle(null);
    } else {
      addArticleMutation.mutate(article);
    }
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cet article ?")) {
      deleteArticleMutation.mutate(id);
    }
  };

  const handleEditArticle = (article: any) => {
    setEditingArticle(article);
    setShowForm(true);
  };

  const categories = Array.from(
    new Set(articles.map((article: any) => article.category).filter(Boolean))
  );

  const uniqueArticles = Array.from(new Map(articles.map((a: any) => [a.id, a])).values());

  const filteredArticles = uniqueArticles.filter(
    (article: any) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || article.category === selectedCategory)
  );

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-end">
        <button
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          onClick={() => {
            setEditingArticle(null);
            setShowForm(true);
          }}
        >
          <PlusCircle size={20} /> Ajouter un article
        </button>
      </div>

      {showForm && (
        <ArticleForm
          onSubmit={handleAddOrUpdateArticle}
          initialData={editingArticle}
        />
      )}
      <div className="mb-4 flex items-center gap-4">
        <motion.div
          className="relative flex items-center border border-gray-300 rounded-md overflow-hidden"
          animate={{ width: searchExpanded ? "200px" : "40px" }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <Search
            size={20}
            className="cursor-pointer text-gray-600 hover:text-gray-800 p-2"
            onClick={() => setSearchExpanded((prev) => !prev)}
          />
          <motion.input
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: searchExpanded ? "160px" : "0px", opacity: searchExpanded ? 1 : 0 }}
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={() => !searchTerm && setSearchExpanded(false)}
            className="px-2 py-1 outline-none text-sm bg-transparent w-full"
          />
        </motion.div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md w-40 text-sm"
        >
          <option value="">Toutes catégories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredArticles.map((article: any, index: number) => (
          <motion.div 
            key={article.id} 
            className="h-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="border border-gray-300 rounded-lg h-full flex flex-col">
              <div className="h-40 flex justify-center items-center p-2">
                <motion.img
                  src={article.image || "/placeholder.png"}
                  alt={article.title}
                  className="max-h-full max-w-full object-contain"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <CardContent className="flex flex-col p-4 justify-between flex-grow">
                <div>
                  <CardTitle className="text-lg font-semibold">{article.title}</CardTitle>
                  <p className="text-xs text-gray-600">{article.category}</p>
                </div>

                <div className="mt-2 flex justify-between items-center">
                  <p className="text-lg font-bold text-green-600">{article.price} $</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="text-yellow-500" />
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <motion.button onClick={() => handleEditArticle(article)} className="text-blue-500">
                    <Edit size={18} /> Modifier
                  </motion.button>
                  <motion.button onClick={() => handleDeleteArticle(article.id)} className="text-red-500">
                    <Trash size={18} /> Supprimer
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ArticleList;
