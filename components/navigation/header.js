import { useState } from "react";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useQueryClient } from "react-query";
import SearchWrapper from "../search/search-wrapper";

function Header() {
  const [isAuthButtonDisabled, setIsAuthButtonDisabled] = useState(false);

  const { data: session, status } = useSession();

  const queryClient = useQueryClient();

  const handleSignIn = () => {
    signIn("google");
    setIsAuthButtonDisabled(true);
  };

  const handleSignOut = () => {
    queryClient.removeQueries("user", { exact: true });
    signOut();
    setIsAuthButtonDisabled(true);
  };

  return (
    <header className="flex items-center justify-center px-10 py-6 xl:justify-between">
      {/* search bar */}
      <SearchWrapper />

      {/* avatar and name */}
      <div className="items-center hidden space-x-6 text-gray-100 bg-gray-700 rounded xl:flex focus-within:border-2 focus-within:border-gray-200">
        {session && session.user.image ? (
          <div className="flex bg-gray-600 rounded-md ">
            <Image
              src={session.user.image}
              alt={session.user.name}
              width={50}
              height={50}
              className="rounded"
            />
          </div>
        ) : (
          <div className="p-2 bg-gray-600 rounded">
            <UserCircleIcon className="w-7 h-7" />
          </div>
        )}
        <div className="pr-5 text-gray-50">
          {status === "authenticated" ? (
            <button
              disabled={isAuthButtonDisabled}
              onClick={handleSignOut}
              className="text-lg font-bold disabled:cursor-not-allowed">
              Sign Out
            </button>
          ) : (
            <button
              disabled={isAuthButtonDisabled}
              onClick={handleSignIn}
              className="text-lg font-bold disabled:cursor-not-allowed">
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
