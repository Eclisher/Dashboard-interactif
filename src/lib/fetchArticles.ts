export const fetchArticles = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des articles");
    }
    return response.json();
  };
  