import React from "react";
import { NavLink } from "/imports/api/interaces";
import { Link } from "react-router-dom";

interface NavLinkProps extends NavLink {
  active: boolean;
  Icon: React.ComponentType<{
    className?: string;
  }>;
}

const NavLink = ({ url, name, active, Icon }: NavLinkProps) => {
  return (
    <li className="group flex flex-row gap-3 items-center cursor-pointer">
      <Icon
        className={`w-6 h-6 transition-colors ${
          active
            ? "text-primary-200"
            : "text-gray-700 group-hover:text-primary-100"
        }`}
      />

      <Link
        className={`text-xl font-bold uppercase transition-colors w-fit ${
          active
            ? "text-text-main"
            : "text-gray-700 group-hover:text-text-main"
        }`}
        to={url}
      >
        {name}
      </Link>
    </li>
  );
};


export default NavLink;
