"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
function Navbar() {
  const isUserLoggedIn = true;
  const { data: session } = useSession();
  const router = useRouter();
  // console.log(session);
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  useEffect(() => {
    const setProvider = async () => {
      const res = await getProviders();
      setProviders(res);
      //   console.log(res);
    };
    setProvider();
  }, []);
  return (
    <nav className="w-full flex-between mb-15 pt-3">
      <Link href={"/"} className="flex flex-center gap-2">
        <Image
          width={40}
          height={40}
          src="/assets/images/logo.svg"
          alt="logo"
        ></Image>
        <p className="logo_text"> Prompt4U</p>
      </Link>

      {/* Desktop  Navigateion */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5 items-center">
            <Link href={"/create-prompt"} className="black_btn">
              {" "}
              Create Post
            </Link>

            <button
              type="button"
              onClick={() => {
                signOut();
                router.push("/");
              }}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href={`/profile/${session?.user?.id}`}>
              <Image
                width={30}
                height={30}
                style={{ borderRadius: "50%" }}
                src={session?.user.image}
                alt="profile"
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>

      {/* Mobile Nav */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div>
            <Image
              width={30}
              height={30}
              src={session?.user.image}
              style={{ borderRadius: "50%" }}
              alt="profile"
              onClick={() => setToggleDropDown((prev) => !prev)}
            ></Image>

            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href={`"/profile/${session?.user?.id}`}
                  className="dropdown_list"
                  onClick={() => setToggleDropDown(false)}
                >
                  {" "}
                  MY Profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className="dropdown_list"
                  onClick={() => setToggleDropDown(false)}
                >
                  {" "}
                  Create Rrompt
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    router.push("/", { scroll: false });
                  }}
                  className="mt-5 w-full black_btn"
                >
                  {" "}
                  SignOut
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
