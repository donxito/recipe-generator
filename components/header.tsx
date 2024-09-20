"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogIn, LogOut, Heart, CookingPot, Home } from "lucide-react";
import { motion } from "framer-motion";
import { supabase, signOut } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import NavItem from "./NavItem";
import AnimatedFoodIcon from "./AnimatedFoodIcon";



function Header() {
  const [session, setSession] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  // Auth state change listener
  useEffect(() => {
    setIsClient(true);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);


  // Handle auth actions
  const handleAuthAction = async () => {
    if (session) {
      const error = await signOut();
      if (error) {
        toast({
          title: "Error",
          description: "Failed to sign out",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "You have been signed out",
        });
        router.push("/");
      }
    } else {
      router.push("/signin");
    }
  };

  // Auth button
  const AuthButton = () => (
    <motion.button
      onClick={handleAuthAction}
      className="flex items-center text-sm font-medium transition-colors hover:text-text-yellow-300" 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }} 
    >
      {session ? (
        <>
          <LogOut className="mr-2 h-6 w-6" />
          Logout
        </>
      ) : (
        <>
          <LogIn className="mr-2 h-6 w-6" />
          Login
        </>
      )}
    </motion.button>
  );


  // handle reload with logo click
  const handleReload = () => {
    router.push("/");
    //window.location.reload(); // reload the page
  }

  return (
    <motion.header 
      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <AnimatedFoodIcon />
          <Link
            href="/"
            className="text-3xl font-bold tracking-tight hover:text-yellow-300 transition duration-300"
            onClick={handleReload}
          >
            NextBite
          </Link>
        </motion.div>

        <div className="flex items-center space-x-4">
          <nav className="hidden md:block">
          <ul className="flex space-x-4 list-none">
              <NavItem
                href="/"
                label="Home"
                icon={<Home className="h-5 w-5" />}
                isActive={pathname === "/"}
              />
              <NavItem
                href="/favorites"
                label="Favorites"
                icon={<Heart className="h-5 w-5" />}
                isActive={pathname === "/favorites"}
              />
              <NavItem
                href="/about"
                label="About"
                icon={<CookingPot className="h-5 w-5" />}
                isActive={pathname === "/about"}
              />
              {isClient && <AuthButton />}
            </ul>
          </nav>
          <ThemeToggle />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col space-y-4 mt-8">
              <NavItem
                href="/"
                label="Home"
                icon={<Home className="h-5 w-5" />}
                isActive={pathname === "/"}
              />
              <NavItem
                href="/favorites"
                label="Favorites"
                icon={<Heart className="h-5 w-5" />}
                isActive={pathname === "/favorites"}
              />
              <NavItem
                href="/about"
                label="About"
                icon={<CookingPot className="h-5 w-5" />}
                isActive={pathname === "/about"}
              />
              {isClient && <AuthButton />}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}

export default Header;
