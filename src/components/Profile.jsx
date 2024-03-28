import React from "react";
import PromptCard from "./PromptCard";
export default function Profile({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}) {
  return (
    <section className="w-full mt-10">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>

      <p className="my-10">{desc}</p>

      {data.length !== 0 ? (
        <section className="mt-10 feed">
          {data.map((post, i) => {
            return (
              <PromptCard
                key={i}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            );
          })}
        </section>
      ) : (
        <h1 className="text-center text-4xl bold text-upper">
          Not Prompt Found Please Create a Prompts !!
        </h1>
      )}
    </section>
  );
}
