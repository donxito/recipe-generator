import React from 'react';
import Image from 'next/image';
import { Card, Typography, List, Button } from 'antd';
import { Recipe as RecipeType } from "@/types/types";

const { Title, Text } = Typography;

interface RecipeProps {
  recipe: RecipeType;
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  return (
    <Card
      cover={
        <Image
          alt={recipe.label}
          src={recipe.image}
          width={200}
          height={100}
          style={{ objectFit: 'cover' }}
        />
      }
      hoverable
    >
      <Title level={3}>{recipe.label}</Title>
      <Title level={4}>Ingredients:</Title>
      <List
        dataSource={recipe.ingredients}
        renderItem={(ingredient, index) => (
          <List.Item key={index}>
            <Text>{ingredient.text}</Text>
          </List.Item>
        )}
      />
      <Button type="primary" href={recipe.url} target="_blank" rel="noopener noreferrer">
        View Recipe
      </Button>
    </Card>
  );
}

export default Recipe;
