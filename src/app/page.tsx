"use client"; 

import ArticleList from "@/components/ArticleList";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="p-6">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Liste des Articles
      </motion.h1>
      <ArticleList />
    </main>
  );
}