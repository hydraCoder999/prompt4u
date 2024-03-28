import React from "react";
import PromptCard from "./PromptCard";

export default function PromptCardList({ data, handleTagClick }) {
  return (
    <section className="mt-10 ">
      {data.map((post, i) => {
        return (
          <PromptCard key={i} post={post} handleTagClick={handleTagClick} />
        );
      })}
    </section>
  );
}
