"use client";
import axios from "axios";
import { useState } from "react";

export default function Blogs() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const publishBlog = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/blog/create`, {
        title,
        content,
      });
      if (response.status == 200) {
        setTitle("");
        setContent("");
        alert("Blog created!");
        return;
      }
      alert("Error creating post, please try again.");
    } catch (error) {
      alert("Error creating post, please try again");
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className={`${loading ? "cursor-progress" : ""}`}>
      <div className="flex flex-col gap-4 bg-slate-900 p-6 rounded-lg max-w-[800px]">
        <h1 className="font-semibold text-3xl text-white">Manage Blogs</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-1 rounded-md bg-slate-800 text-white focus:outline-none"
            placeholder="Enter the blog title"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter the blog content"
            required
            className="h-[200px] max-h-[200px] px-4 py-1 rounded-md bg-slate-800 text-white focus:outline-none"
          />
        </div>
        <button
          className="bg-slate-600 px-5 font-semibold py-2 rounded-md max-w-max ml-auto"
          onClick={publishBlog}
          disabled={loading}
        >
          Publish
        </button>
      </div>
    </div>
  );
}
