import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function PromptCard({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [copy, setCopy] = useState("");

  const handleCopy = () => {
    setCopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopy("");
    }, 3000);
  };

  return (
    <div className="prompt-card   p-4">
      {" "}
      <div className="flex justify-between items-center cursor-pointer gap-2">
        <div
          className="flex gap-3"
          onClick={() => {
            router.push(`/profile/${post?.creator?._id}`);
          }}
        >
          <Image
            src={post?.creator?.image}
            alt="user_image"
            width={30}
            height={30}
            className="rounded-full object-contain"
          ></Image>

          <div className="flex flex-col flex-wrap">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post?.creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post?.creator?.email}
            </p>
          </div>
        </div>

        <div
          className="copy_btn"
          onClick={() => {
            handleCopy();
          }}
        >
          <Image
            src={
              copy === post?.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy"
            width={12}
            height={12}
          ></Image>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post?.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => {
          handleTagClick && handleTagClick(post?.tag);
        }}
      >
        {post.tag}
      </p>
      {session?.user?.id === post?.creator?._id && pathname !== "/" && (
        <>
          <div className="my-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm cursor-pointer green_gradient"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm cursor-pointer red_gradient"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        </>
      )}
    </div>
  );
}
