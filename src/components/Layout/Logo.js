import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../../assets/logo.svg";

function Logo() {
  return (
    <Link to="/" className="cursor-pointer">
      <LogoIcon className="w-[107px] h-[30px] text-[#4A494F] dark:text-white"/>
    </Link>
  );
}

export default Logo;
