"use client"; 

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ArticleDetailModal = ({ article, onClose }) => {
  return (
    <AnimatePresence>
      {article && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg p-6 max-w-md w-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">{article.title}</h2>
            <div className="w-full h-40 mb-4 overflow-hidden rounded-lg border border-gray-200 flex items-center justify-center">
              <motion.img
                src={article.image || "/placeholder.png"}
                alt={article.title}
                className="w-full h-full object-cover cursor-pointer"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <p className="text-gray-700 mb-4">{article.description}</p>
            <p className="text-lg font-bold text-green-600">{article.price} $</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={onClose}
            >
              Fermer
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleDetailModal;