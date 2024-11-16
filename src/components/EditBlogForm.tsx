"use client";

import { baseURL } from "@/lib/footballApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

// Server action with result type
async function updateBlog(prevState: any, formData: FormData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();

  if (!title || !content) {
    return {
      success: false,
      message: "Title and content are required",
    };
  }

  try {
    const response = await fetch(`${baseURL}/api/blog/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title, content }),
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Failed to update blog",
      };
    }

    return {
      success: true,
      message: "Blog updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error updating blog. Please try again.",
    };
  }
}

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg max-w-sm
        ${type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}
    >
      <div className="flex justify-between items-center">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-6 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2
          ${
            pending
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
          }`}
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Updating...
        </span>
      ) : (
        "Update Blog"
      )}
    </button>
  );
}

export default function EditBlogForm({
  blog,
}: {
  blog: {
    blogId: number;
    blogTitle: string;
    blogDescription: string;
  };
}) {
  const router = useRouter();
  const [state, formAction] = useFormState(updateBlog, null);
  const [showToast, setShowToast] = useState(false);

  if (state && !showToast) {
    setShowToast(true);
    if (state.success) {
      setTimeout(() => {
        router.push("/admin/manage/blogs");
      }, 2000);
    }
  }

  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Edit Blog</h1>

        <form action={formAction} className="space-y-6">
          <input type="hidden" name="id" value={blog.blogId} />

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              defaultValue={blog.blogTitle}
              className="w-full px-4 py-2 rounded-md bg-secondary text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              required
              defaultValue={blog.blogDescription}
              rows={15}
              className="w-full px-4 py-2 rounded-md bg-secondary text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <SubmitButton />

            <a
              href="/admin/manage/blogs"
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 inline-flex items-center"
            >
              Cancel
            </a>
          </div>
        </form>

        {showToast && (
          <Toast
            message={state?.message || ""}
            type={state?.success ? "success" : "error"}
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </div>
  );
}
