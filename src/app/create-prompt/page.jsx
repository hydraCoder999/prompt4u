"use client";
import React, { useState } from "react";
import Form from "@components/Form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { data } from "autoprefixer";
export default function page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [submiting, setSubmiting] = useState(false);

  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          ...post,
          userId: session?.user.id,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      // console.log(error);
    } finally {
      setSubmiting(false);
    }
  };

  if (session?.user) {
    return (
      <>
        <Form
          type="create"
          post={post}
          setPost={setPost}
          submiting={submiting}
          handleSubmitPost={handleSubmitPost}
        />
      </>
    );
  } else {
    return router.push("/", { scroll: false });
  }
}
