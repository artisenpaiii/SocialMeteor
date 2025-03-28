import React, { useEffect } from "react";
import { NavLink as NavLinkInterace } from "/imports/api/interaces";
import NavLink from "./components/NavLink";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { House, UserRound } from "lucide-react";
import { Meteor } from "meteor/meteor";
import { User } from "../api/User/user";

const IconList: Record<string, React.ComponentType<{ className?: string }>> = {
  Home: House,
  Profile: UserRound,
};

const RootLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navLinks: NavLinkInterace[] = [
    { url: "/", name: "Home" },
    { url: "/profile", name: "Profile" },
  ];

  const { user, loading } = useTracker(() => {
    const handle = Meteor.subscribe("userData");
    const ready = handle.ready();
    return {
      user: ready ? (Meteor.user() as User) : null,
      loading: !ready,
    };
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [loading, user]);

  return (
    <main className="grid grid-cols-7 h-screen overflow-hidden">
      <div className="flex flex-col bg-background-100 w-full h-full col-span-2 p-7 border-r-2 border-primary-hover">
        <h1 className="text-4xl text-text-main font-bold uppercase mb-2">
          Meteor Social
        </h1>
        <ul className="flex flex-col space-y-2">
          {navLinks.map((link, index) => {
            const Icon = IconList[link.name]
            return ( 
                <NavLink
                  key={index}
                  name={link.name}
                  url={link.url}
                  active={link.url === location.pathname}
                  Icon={Icon}
                />
            );
          })}
        </ul>
      </div>
      {
        user && (
          <Outlet context={{ user }} />
        )
      }
      <button
        onClick={() => {
          Meteor.logout();
          navigate("/auth");
        }}
      >
        Log out
      </button>
    </main>
  );
};

export default RootLayout;
