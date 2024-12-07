"use client";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <section className="text-center space-y-4 bg-slate-700 px-4 py-6 rounded-2xl">
        <h1 className="text-4xl font-bold">
          About <span className="text-teal-400">MatchMemo</span>
        </h1>
        <div className="bg-slate-500 h-[2px]"></div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          MatchMemo is your go-to platform for real-time football updates,
          comprehensive match statistics, and in-depth analysis.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4 bg-slate-700 p-4 rounded-xl">
          <h2 className="text-2xl font-semibold text-teal-400">Our Mission</h2>
          <p className="text-muted-foreground">
            At MatchMemo, we&apos;re passionate about bringing the excitement of
            football to fans worldwide. Our mission is to provide accurate,
            real-time updates and in-depth analysis, enhancing the way fans
            experience the beautiful game.
          </p>
        </div>
        <div className="space-y-4 bg-slate-700 p-4 rounded-xl">
          <h2 className="text-2xl font-semibold text-teal-400">Our Vision</h2>
          <p className="text-muted-foreground">
            We envision a world where every football fan has access to
            comprehensive, real-time match information at their fingertips.
            MatchMemo aims to be the ultimate companion for football
            enthusiasts, from casual viewers to die-hard supporters.
          </p>
        </div>
      </section>

      <section className="text-center space-y-6 bg-slate-700 p-4 rounded-xl">
        <h2 className="text-3xl font-semibold">Connect With Us</h2>
        <div className="bg-slate-500 h-[2px]"></div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest news, features, and announcements from
          MatchMemo. Follow us on social media and join our community of
          football enthusiasts.
        </p>
        <div className="bg-slate-500 h-[2px]"></div>
        <div className="flex justify-center space-x-4">
          <button className="p-2 border rounded-full bg-blue-500 hover:bg-blue-600">
            <Facebook className="h-5 w-5" />
            <span className="sr-only">Facebook</span>
          </button>
          <button className="p-2 border rounded-full bg-blue-400 hover:bg-blue-500">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </button>
          <button className="p-2 border rounded-full bg-pink-600 hover:bg-pink-800">
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </button>
          <button className="p-2 border rounded-full bg-blue-700 hover:bg-blue-900">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </button>
        </div>
      </section>
    </div>
  );
}
