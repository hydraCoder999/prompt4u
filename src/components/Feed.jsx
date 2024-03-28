"use client";
import React, { useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";

export default function Feed() {
  const [searchtext, setSearchText] = useState("");
  const [post, setPost] = useState([]);
  const [filterdPost, setFilteredPost] = useState([]);

  const handleSearchChange = (e) => {
    const searchTextValue = e.target.value;
    setSearchText(searchTextValue);
  };

  useEffect(() => {
    if (searchtext === "") {
      setFilteredPost(post);
    } else {
      const filtered = post.filter((p) => {
        return (
          p.prompt.toLowerCase().includes(searchtext.toLowerCase()) ||
          p.tag.toLowerCase().includes(searchtext.toLowerCase()) ||
          p.creator.username.toLowerCase().includes(searchtext.toLowerCase())
        );
      });
      setFilteredPost(filtered);
    }
  }, [searchtext, post]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      // console.log(data.prompts);
      setPost(data.prompts);
      setFilteredPost(data.prompts);
      // console.log(data);
      // console.log(res);
    };

    fetchPost();
  }, []);
  return (
    <section className="feed ">
      <form action="" className="w-[70%]  ralative flex-center ">
        <input
          type="text"
          placeholder="Search for a tag or username.."
          value={searchtext}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={filterdPost}
        handleTagClick={setSearchText}
      ></PromptCardList>
    </section>
  );
}
