import Feed from "@components/Feed";
import React from "react";

function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="mex-md:hidden" />
        <span className="orange_gradient text-center">AI Powered Prompt</span>
      </h1>

      <p className="desc text-center">
        Promopt4U is an OpenSource AI Prompting Tool For the Modern world to
        discover , create and share crative prompt
      </p>

      {/* Feed */}
      <Feed />
    </section>
  );
}

export default Home;
