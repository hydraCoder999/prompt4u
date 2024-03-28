import Link from "next/link";
import React from "react";

export default function Form({
  type,
  post,
  submiting,
  setPost,
  handleSubmitPost,
}) {
  return (
    <section className="w-full max-w-full flex-start flex-col mt-5">
      <h1 className="head_text text-left">
        <span className="blue_gradient capitalize">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world and let your imagination
        run wild with the AI-Powered platform.
      </p>

      {/* Main Form */}

      <form
        action=""
        onSubmit={handleSubmitPost}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label htmlFor="">
          {" "}
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            name="prompt"
            id="text_area"
            cols="30"
            rows="10"
            value={post.prompt}
            onChange={(e) =>
              setPost({
                ...post,
                prompt: e.target.value,
              })
            }
            placeholder="Write Your Prompt here..."
            className="form_textarea"
            required
          ></textarea>
        </label>

        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tags {` `}
            <span className="font-normal">(#product ,#idea , #webdev )</span>
          </span>

          <input
            type="text"
            value={post.tag}
            onChange={(e) => {
              setPost({
                ...post,
                tag: e.target.value,
              });
            }}
            placeholder="#product ,#idea"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end max-3 mb-5 gap-4">
          <Link href={"/"} className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white uppercase"
            type="submit"
            disabled={submiting}
          >
            {submiting === false ? `${type}...` : `Submiting`}
          </button>
        </div>
      </form>
    </section>
  );
}
