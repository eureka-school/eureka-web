import { signIn, signOut, useSession } from "next-auth/react";
import defaultConfig from "@/lib/config.json";
import Image from "next/image";
import useSWR from "swr";

interface TemplateProps {
  config: any;
  session?: any;
  user?: any;
}
const Template = ({ config, session, user }: TemplateProps) => (
  <div className="navbar bg-base-100 text-primary-content shadow-lg px-10">
    <div className="flex-1">
      <a className="normal-case text-xl" href="/">
        <Image
          className="inline-block rounded-full"
          alt="logo"
          src={
            "https://eureka-school.s3.us-east-005.backblazeb2.com/Eureka-1.png"
          }
          width={42}
          height={42}
          priority
        />
        <span className="ml-2">{config.appName}</span>
      </a>
    </div>
    <div className="flex-none gap-2">
      <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered"
        />
      </div>
      {session ? (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src={
                  user.profile.avatar
                    ? user.profile.avatar
                    : config.navbar.defaultImg
                }
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">{user.username}</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button onClick={() => signOut()}>Logout</button>
            </li>
          </ul>
        </div>
      ) : (
        <button className="btn gap-2 btn-sm" onClick={() => signIn()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          Login
        </button>
      )}
    </div>
  </div>
);

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user as any;
  const { data: configResponse, isLoading } = useSWR("/api/configs/default");

  if (isLoading) {
    return <Template config={defaultConfig} user={user} session={session} />;
  }
  const config = configResponse.data;
  return <Template user={user} config={config} session={session} />;
}
