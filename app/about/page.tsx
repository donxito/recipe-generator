"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">About This App</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Welcome to Recipe Generator! This application is designed to help you discover and create delicious recipes based on the ingredients you have at home.
          </p>
          <p className="mt-4">
            Key Features:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Search for recipes by ingredients.</li>
            <li>Save your favorite recipes for easy access.</li>
            <li>User authentication for personalized experience.</li>
            <li>Responsive design for seamless use on any device.</li>
          </ul>
          <p className="mt-4">
            Our goal is to make cooking easier and more enjoyable by providing you with a platform to explore new recipes and share your culinary creations with others. 
          </p>
          <p className="mt-4">
            Thank you for using Recipe Generator! We hope you enjoy your cooking journey.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;