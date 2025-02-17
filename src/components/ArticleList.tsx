"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "@/lib/fetchArticles";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star, Search } from "lucide-react";

const ArticleList = () => {
  const { data: articles, error, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchExpanded, setSearchExpanded] = useState(false);

  if (isLoading) return <p className="text-center text-gray-500 font-[Verdana]">Chargement des articles...</p>;
  if (error) return <p className="text-center text-red-500 font-[Verdana]">Erreur : {error.message}</p>;

  const categories = Array.from(new Set(articles.map((article: any) => article.category)));

  const filteredArticles = articles.filter(
    (article: any) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || article.category === selectedCategory)
  );

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center gap-4 relative">
        <motion.div
          className="relative flex items-center border border-gray-300 rounded-md overflow-hidden"
          animate={{ width: searchExpanded ? "200px" : "40px" }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <Search
            size={50}
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
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredArticles.map((article: any, index: number) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            className="h-full"
          >
            <Card className="border border-gray-300 rounded-lg transition-shadow h-full flex flex-col aspect-[3/4] relative overflow-hidden">
              <CardContent className="p-3 flex flex-col justify-between h-full font-[Verdana]">
                <motion.img
                  src={article.image}
                  alt={article.title}
                  className="h-36 w-auto max-w-full mx-auto object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                />

                <p className="text-md font-bold text-green-600 text-center mt-3">{article.price} $</p>

                <div className="absolute bottom-3 left-3 bg-white bg-opacity-80 p-2 rounded-md">
                  <CardTitle className="text-xs font-semibold">{article.title}</CardTitle>
                  <p className="text-xs text-gray-600">{article.category}</p>

                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="text-yellow-500" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
