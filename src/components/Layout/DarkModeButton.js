import React from "react";
import { MdLightMode } from "react-icons/md";
import useDark from "../../hooks/useDark";

function DarkModeButton() {
  const [, toggleDark] = useDark();

  return (
    <button
      type="button"
      className="text-gray700 dark:text-gray200 mr-2 p-2 text-2xl rounded-full font-regular"
      onClick={() => toggleDark()}
    >
      <MdLightMode />
    </button>
  );
}

export default DarkModeButton;
