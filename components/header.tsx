"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogIn, LogOut, Heart, CookingPot } from "lucide-react";
import { motion } from "framer-motion";
import { supabase, signOut } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const NavItem = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) => (
  <li>
     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}> 
    <Link
      href={href}
      className="flex items-center text-sm font-medium transition-colors hover:text-primary"
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Link>
    </motion.div>
  </li>
);

function Header() {
  const [session, setSession] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

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

  const AuthButton = () => (
    <motion.button
      onClick={handleAuthAction}
      className="flex items-center text-sm font-medium transition-colors hover:text-primary" 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }} 
    >
      {session ? (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </>
      ) : (
        <>
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </>
      )}
    </motion.button>
  );

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight hover:text-yellow-300 transition duration-300"
          >
            NextBite
          </Link>
        </motion.div>

        <div className="flex items-center space-x-4">
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <NavItem href="/favorites" label="Favorites" icon={<Heart />} />
              <NavItem href="/about" label="About" icon={<CookingPot />} />
              {isClient && (
                <li>
                  <AuthButton />
                </li>
              )}
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
              <NavItem href="/favorites" label="Favorites" icon={<Heart />} />
              <NavItem href="/about" label="About" icon={<CookingPot />} />
              {isClient && <AuthButton />}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Header;
