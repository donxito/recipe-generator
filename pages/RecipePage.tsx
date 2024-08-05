"use client";

import React, { useState } from "react";
import { Layout, Row, Col, Spin, Alert } from 'antd';
import { ErrorBoundary } from "react-error-boundary";
import fetchRecipes from "../lib/fetchRecipes";
import Recipe from "../components/Recipe";
import { Recipe as RecipeType } from "@/types/types";
import SearchBar from "@/components/SearchBar";

const { Content } = Layout;

const RecipePage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await fetchRecipes(query);
      setRecipes(results);
    } catch (error) {
      setError("Error fetching recipes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Content style={{ padding: '0 50px' }}>
        <SearchBar
          query={query}
          setQuery={setQuery}
          searchRecipes={searchRecipes}
        />

        {loading && <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />}

        {error && <Alert message={error} type="error" showIcon style={{ margin: '20px 0' }} />}

        <ErrorBoundary fallback={<Alert message="Something went wrong" type="error" showIcon />}>
          <Row gutter={[16, 16]}>
            {recipes.map((recipe, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Recipe recipe={recipe} />
              </Col>
            ))}
          </Row>
        </ErrorBoundary>
      </Content>
    </Layout>
  );
};

export default RecipePage;
