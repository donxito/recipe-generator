import React from "react";
import Image from "next/image";
import { Typography, List, Button } from "antd";
import { Recipe as RecipeType } from "@/types/types";
import { motion } from "framer-motion";


const { Title, Text } = Typography;

interface RecipeProps {
  recipe: RecipeType;
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
        <div className="relative h-48">
          <Image
            alt={recipe.label}
            src={recipe.image}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h3 className="text-white text-2xl font-bold text-center px-4 opacity-95">
              {recipe.label}
            </h3>
          </div>
        </div>
        <div className="p-6">
          <Title level={4} className="mb-4 text-gray-800">
            Ingredients:
          </Title>
          <List
            dataSource={recipe.ingredients.slice(0, 5)}
            renderItem={(ingredient, index) => (
              <List.Item key={index} className="py-1 border-b border-gray-200 last:border-b-0">
                <Text className="text-gray-600">{ingredient.text}</Text>
              </List.Item>
            )}
          />
          {recipe.ingredients.length > 5 && (
            <Text className="text-gray-500 mt-2 block">
              +{recipe.ingredients.length - 5} more ingredients
            </Text>
          )}
          <Button
            type="primary"
            href={recipe.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 border-none"
          >
            View Full Recipe
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Recipe;
