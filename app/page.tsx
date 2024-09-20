"use client";

import React from "react";
import RecipePage from "./recipes/RecipePage";
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';
import { Utensils, Search, Heart, User } from "lucide-react";

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), { ssr: false });

const FeatureItem = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <MotionDiv
    className="flex flex-col items-center text-center p-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="bg-primary text-primary-foreground p-3 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </MotionDiv>
);

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <MotionDiv 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Discover Delicious Recipes</h1>
          </MotionDiv>
          <MotionDiv 
            className="text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p>Turn your ingredients into culinary masterpieces with this recipe API</p>
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <RecipePage />
          </MotionDiv>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose NexBite?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureItem 
              icon={<Search className="w-6 h-6" />}
              title="Smart Search"
              description="Find recipes based on ingredients you have at home."
            />
            <FeatureItem 
              icon={<Utensils className="w-6 h-6" />}
              title="Diverse Recipes"
              description="Explore a wide range of cuisines and dietary options."
            />
            <FeatureItem 
              icon={<Heart className="w-6 h-6" />}
              title="Save Favorites"
              description="Keep track of your beloved recipes for quick access."
            />
            <FeatureItem 
              icon={<User className="w-6 h-6" />}
              title="Personalized Experience"
              description="Get recommendations tailored to your taste preferences."
            />
          </div>
        </div>
      </section>

     
    </main>
  );
}