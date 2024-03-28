"use client";
import React, { useEffect, useState } from "react";
import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
export default function EditPrompt() {
  const router = useRouter();
  const { data: session } = useSession();
  const serach_params = useSearchParams();
  const prompt_id = serach_params.get("id");
  const [submiting, setSubmiting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const handleUpdatePrompt = async (e) => {
    e.preventDefault();
    if (!prompt_id || prompt_id.length !== 24) {
      return alert("Prompt id Missing");
    }
    setSubmiting(true);

    try {
      const res = await fetch(`/api/prompt/${prompt_id}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmiting(false);
    }
  };

  useEffect(() => {
    const GetPromptDetails = async () => {
      const res = await fetch(`api/prompt/${prompt_id}`);
      const data = await res.json();
      setPost({
        prompt: data.prompt.prompt,
        tag: data.prompt.tag,
      });
      // console.log(data);
      // console.log(res);
    };

    if (prompt_id) {
      GetPromptDetails();
    }
  }, []);
  return (
    <>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submiting={submiting}
        handleSubmitPost={handleUpdatePrompt}
      />
    </>
  );
}
