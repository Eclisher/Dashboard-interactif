import ArticleList from "@/components/ArticleList";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Liste des Articles</h1>
      <ArticleList />
    </main>
  );
}
