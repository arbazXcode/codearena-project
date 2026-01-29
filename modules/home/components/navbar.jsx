"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Layout,
  User,
  Menu,
  X,
  PlusSquare,
  LogIn,
  Sparkles,
  Terminal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

// Ensure this matches your Prisma enum, or just use string check if simpler
const UserRole = {
  ADMIN: "ADMIN",
};

const navLinks = [
  { name: "Problems", href: "/problems", icon: Code2 },
  { name: "About", href: "/about", icon: Terminal },
  { name: "Profile", href: "/profile", icon: User },
];

const Navbar = ({ userRole }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const linkHoverVariants = {
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 400 } },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
        className={`fixed top-4 left-0 right-0 z-50 mx-auto w-[95%] max-w-6xl transition-all duration-300 ease-in-out ${
          isScrolled ? "translate-y-0" : "translate-y-0"
        }`}
      >
        <div
          className={`relative rounded-2xl border px-4 py-3 shadow-lg transition-all duration-300 md:px-6 
            ${
              isScrolled
                ? "bg-white/80 dark:bg-black/60 border-neutral-200/50 dark:border-white/10 backdrop-blur-xl shadow-xl"
                : "bg-white/50 dark:bg-black/40 border-transparent dark:border-white/5 backdrop-blur-md"
            }`}
        >
          <div className="flex items-center justify-between">
            {/* --- Logo Section --- */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg shadow-amber-500/20 transition-transform group-hover:scale-105">
                {/* Fallback to icon if logo.svg is missing or use Image */}
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="invert brightness-0"
                  onError={(e) => (e.currentTarget.style.display = "none")} // Fallback logic
                />
                <Sparkles
                  className="absolute text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  size={16}
                />
              </div>
              <span className="hidden text-xl font-bold tracking-tight text-neutral-800 dark:text-white sm:block">
                Code<span className="text-amber-500">Arena</span>
              </span>
            </Link>

            {/* --- Desktop Navigation --- */}
            <div className="hidden items-center gap-1 md:flex">
              <div className="flex items-center rounded-full bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/5 p-1 backdrop-blur-sm">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.href} href={link.href}>
                      <motion.div
                        variants={linkHoverVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? "text-neutral-950 dark:text-white"
                            : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-full bg-white dark:bg-neutral-800 shadow-sm"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                          <link.icon size={16} />
                          {link.name}
                        </span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* --- Actions Section --- */}
            <div className="flex items-center gap-3">
              {/* Admin Button (Only visible if signed in & admin) */}
              <SignedIn>
                {userRole === UserRole.ADMIN && (
                  <Link href="/create-problem" className="hidden sm:block">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 border-amber-500/20 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
                    >
                      <PlusSquare size={16} />
                      <span className="hidden lg:inline">Create</span>
                    </Button>
                  </Link>
                )}
              </SignedIn>

              <div className="hidden sm:flex items-center gap-2">
                <ModeToggle />
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center gap-2">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white sm:flex"
                    >
                      Log in
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button
                      size="sm"
                      className="bg-amber-500 text-neutral-950 hover:bg-amber-400 dark:bg-amber-500 dark:hover:bg-amber-400 font-semibold shadow-[0_0_15px_-3px_rgba(245,158,11,0.4)] transition-all hover:scale-105"
                    >
                      Sign up
                    </Button>
                  </SignUpButton>
                </SignedOut>

                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          "h-9 w-9 ring-2 ring-white/10 transition-all hover:ring-amber-500/50",
                      },
                    }}
                  />
                </SignedIn>

                {/* Mobile Menu Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-neutral-500 dark:text-neutral-400"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* --- Mobile Menu Dropdown --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-2xl border border-neutral-200 bg-white/90 p-4 shadow-xl backdrop-blur-xl dark:border-neutral-800 dark:bg-black/90 md:hidden"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                    }`}
                  >
                    <link.icon size={18} />
                    {link.name}
                  </Link>
                ))}

                <div className="my-2 h-px bg-neutral-200 dark:bg-neutral-800" />

                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-sm text-neutral-500">Theme</span>
                  <ModeToggle />
                </div>

                <SignedIn>
                  {userRole === UserRole.ADMIN && (
                    <Link
                      href="/create-problem"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-amber-600 hover:bg-amber-500/10 dark:text-amber-400"
                    >
                      <PlusSquare size={18} />
                      Create Problem
                    </Link>
                  )}
                </SignedIn>

                <SignedOut>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <SignInButton>
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </SignInButton>
                    <SignUpButton>
                      <Button className="w-full bg-amber-500 hover:bg-amber-400 text-black">
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </div>
                </SignedOut>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
