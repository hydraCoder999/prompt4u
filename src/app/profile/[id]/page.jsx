"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { notFound, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const { id } = useParams();

  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const user = useState({});

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const isDeleteConfirmed = confirm("Are Sure To delete this prompt");
    if (isDeleteConfirmed) {
      try {
        const res = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          const filteredPost = posts.filter((ele) => ele._id !== post._id);
          setPosts(filteredPost);
        }
      } catch (error) {
        // console.log(error);
      }
    }
  };
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/users/${id}/posts`);
      const data = await res.json();
      setPosts(data.prompts);
      // console.log(data);
      // console.log(res);
    };

    if (id.length === 24) {
      fetchPost();
    }
  }, [id]);

  if (id.length !== 24) {
    return notFound();
  }

  return (
    <Profile
      name={session?.user.id === id ? "My" : posts[0]?.creator?.username}
      desc={`Welcome To ${
        session?.user.id === id
          ? "Your"
          : `${posts[0]?.creator?.username || "User"}`
      } presonalized profile Page`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    ></Profile>
  );
}
