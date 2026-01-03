import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, X } from "lucide-react";
import React from "react";
import { AiFillTikTok } from "react-icons/ai";

export const Footer = () => {
  return (
    <div className="p-10 bg-black mt-40 flex justify-between w-full flex-col lg:flex-row">
      <div className="w-full md:w-100">
        <Link to="/">
          <h1 className="text-white font-extrabold text-4xl">logbook</h1>
        </Link>

        <p className="text-white mt-2">
          Our goal is to create an open space where ideas are shared freely.
          From technology and world news to fashion, travel, and everyday
          thoughts, this platform brings together diverse voices to explore,
          discuss, and learn from one another.
        </p>

        <p className="text-muted mt-20">@2026 Logbook. All rights reserved</p>
      </div>

      <div className="text-muted-foreground flex flex-col lg:flex-row gap-10 lg:gap-50">
        <ul className="space-y-5">
          <li className="text-white font-bold">About</li>
          <li>Our Team</li>
          <li>Blog</li>
          <li>Info</li>
        </ul>

        <ul className="space-y-5">
          <li className="text-white font-bold">Support</li>
          <li>Contact</li>
          <li>FAQ</li>
          <li>Privacy</li>
        </ul>

        <div>
          <h1 className="text-white font-bold text-lg">Get Updates</h1>

          <Input
            className="bg-gray-400/20 border-none"
            placeholder="Enter email..."
          />

          <div className="flex gap-4 mt-4">
            <Button
              size="icon"
              className="rounded-full bg-gray-400/40 text-white border-none"
              variant="outline"
            >
              <Instagram />
            </Button>
            <Button
              size="icon"
              className="rounded-full bg-gray-400/40 text-white border-none"
              variant="outline"
            >
              <X />
            </Button>
            <Button
              size="icon"
              className="rounded-full bg-gray-400/40 text-white border-none"
              variant="outline"
            >
              <Facebook />
            </Button>
            <Button
              size="icon"
              className="rounded-full bg-gray-400/40 text-white border-none"
              variant="outline"
            >
              <AiFillTikTok />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
