"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const articleSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  category: z.string().min(2, "Veuillez entrer une catégorie valide"),
  price: z
    .number({ invalid_type_error: "Veuillez entrer un nombre valide" })
    .min(1, "Le prix doit être supérieur à 0"),
  image: z.string().url("Veuillez entrer une URL d'image valide"),
});

type ArticleFormData = z.infer<typeof articleSchema>;

const ArticleForm = ({
  onSubmit,
  initialData,
}: {
  onSubmit: (article: any) => void;
  initialData?: any;
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: initialData?.title || "",
      category: initialData?.category || "",
      price: initialData?.price || 0,
      image: initialData?.image || "",
    },
  });
  useEffect(() => {
    if (initialData && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [initialData]);

  const handleFormSubmit = (data: ArticleFormData) => {
    onSubmit({ id: initialData?.id || Date.now(), ...data });
    setSuccessMessage(initialData ? "Article modifié avec succès !" : "Article ajouté avec succès !");
    reset();
    setTimeout(() => setIsFormVisible(false), 1500);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <AnimatePresence>
        {isFormVisible && (
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-4 p-6 border border-gray-200 rounded-lg bg-white shadow-md transition-all duration-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Titre</label>
              <input
                type="text"
                placeholder="Titre de l'article"
                {...register("title")}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Catégorie</label>
              <input
                type="text"
                placeholder="Catégorie"
                {...register("category")}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Prix (€)</label>
              <input
                type="number"
                placeholder="Prix"
                {...register("price", { valueAsNumber: true })}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">URL de l'image</label>
              <input
                type="text"
                placeholder="https://exemple.com/image.jpg"
                {...register("image")}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
            </div>

            <motion.button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {initialData ? "Modifier l'article" : "Ajouter l'article"}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {successMessage && (
          <motion.div
            className="mt-4 p-4 bg-green-500 text-white font-semibold text-center rounded-lg shadow-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>
      {!isFormVisible && (
        <motion.button
          onClick={() => setIsFormVisible(true)}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Ajouter un nouvel article
        </motion.button>
      )}
    </div>
  );
};

export default ArticleForm;
