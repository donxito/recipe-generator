"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';
import { Utensils, Heart, User, Smartphone, Coffee, Linkedin, Github, Globe } from 'lucide-react';
import Link from 'next/link';

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), { ssr: false });

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <MotionDiv
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-card text-card-foreground p-4 rounded-lg shadow-md"
  >
    <div className="flex items-center mb-2">
      {icon}
      <h3 className="text-lg font-semibold ml-2">{title}</h3>
    </div>
    <p>{description}</p>
  </MotionDiv>
);

const SocialLink = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => (
  <MotionDiv
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <Link href={href} target="_blank" rel="noopener noreferrer" 
      className="flex items-center justify-center p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
      {icon}
      <span className="sr-only">{label}</span>
    </Link>
  </MotionDiv>
);

const AboutPage = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const features = [
    { icon: <Utensils className="w-6 h-6" />, title: "Ingredient-based Search", description: "Find recipes with what you have in your kitchen!" },
    { icon: <Heart className="w-6 h-6" />, title: "Favorites", description: "Save and organize your go-to recipes." },
    { icon: <User className="w-6 h-6" />, title: "Personalization", description: "Get tailored recommendations based on your taste." },
    { icon: <Smartphone className="w-6 h-6" />, title: "Mobile-Friendly", description: "Cook with ease, whether you're on desktop or mobile." },
  ];

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            <MotionDiv
              initial={{ rotate: -5 }}
              animate={{ rotate: 5 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block"
            >
              🍳
            </MotionDiv>
            {" "}About Recipe Generator{" "}
            <MotionDiv
              initial={{ rotate: 5 }}
              animate={{ rotate: -5 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block"
            >
              🥗
            </MotionDiv>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg text-center mb-6">
              Welcome to Recipe Generator, where coding meets cooking! 🚀👨‍🍳 This app is my digital kitchen, whipped up to showcase my full-stack development skills and my passion for good food.
            </p>
          </MotionDiv>

          <h2 className="text-2xl font-semibold mb-4 text-center">🌟 Key Ingredients 🌟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {features.map((feature, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <FeatureCard {...feature} />
              </MotionDiv>
            ))}
          </div>

          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-center mb-4">
              This project is my way of blending my love for coding with the joy of cooking. It&apos;s designed to showcase my skills in:
            </p>
            <ul className="list-disc list-inside text-center mb-6">
              <li>React and Next.js for a snappy front-end</li>
              <li>TypeScript for type-safe coding</li>
              <li>Tailwind CSS for sleek, responsive design</li>
              <li>Supabase for robust back-end functionality</li>
              <li>RESTful API integration for recipe data</li>
            </ul>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">🔗 Let&apos;s Connect!</h2>
            <div className="flex justify-center space-x-4 mb-6">
              <SocialLink 
                href="https://www.linkedin.com/in/miguelchito-reactdeveloper" 
                icon={<Linkedin className="w-6 h-6" />} 
                label="LinkedIn"
              />
              <SocialLink 
                href="https://github.com/donxito" 
                icon={<Github className="w-6 h-6" />} 
                label="GitHub"
              />
              <SocialLink 
                href="https://mchito.vercel.app" 
                icon={<Globe className="w-6 h-6" />} 
                label="Portfolio"
              />
            </div>
          </MotionDiv>

          <div className="text-center">
            <Button
              onClick={() => setShowEasterEgg(!showEasterEgg)}
              variant="outline"
              className="mt-4"
            >
              <Coffee className="mr-2 h-4 w-4" /> Buy me a coffee?
            </Button>
          </div>

          {showEasterEgg && (
            <MotionDiv
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 bg-primary/10 rounded-lg text-center"
            >
              <p className="font-semibold">Easter Egg Unlocked! 🎉</p>
              <p>Thanks for exploring! While I can&apos;t actually accept coffee through this app, your interest means a lot. Feel free to connect with me on LinkedIn, check out my GitHub for more projects, or visit my portfolio website to see more of my work!</p>
            </MotionDiv>
          )}
        </CardContent>
      </Card>
    </MotionDiv>
  );
};

export default AboutPage;