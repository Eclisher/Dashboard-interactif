"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "@/lib/fetchArticles";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ArticleList = () => {
  const { data: articles, error, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

  if (isLoading) return <p className="text-center text-gray-500 font-[Verdana]">Chargement des articles...</p>;
  if (error) return <p className="text-center text-red-500 font-[Verdana]">Erreur : {error.message}</p>;

  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={`inline-block ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {articles.map((article: any, index: number) => (
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

               
                <div className="mt-1">{renderStars(article.rating || 0)}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ArticleList;
