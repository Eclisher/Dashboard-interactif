import { motion } from "framer-motion";

type ArticleProps = {
  title: string;
  image: string;
  price: number;
  category: string;
};

const ArticleCard: React.FC<ArticleProps> = ({ title, image, price, category }) => {
  return (
    <motion.div 
      className="bg-white p-4 rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}
    >
      <img src={image} alt={title} className="w-full h-40 object-contain" />
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-500">{category}</p>
      <p className="text-blue-600 font-semibold">{price} €</p>
    </motion.div>
  );
};

export default ArticleCard;
