import React from 'react';
import { ReactComponent as AddIcon } from '../assets/add-24.svg';

function ReactionIconBtn() {
  return (
    <button
      type="button"
      className="flex flex-row justify-center items-center px-2 py-1 gap-2 rounded-[32px] bg-black/[.54]"
    >
      <AddIcon className="w-[20px] h-[20px]" />
      <div className="text-white leading-[20px] font-regular">10</div>
    </button>
  );
}

export default ReactionIconBtn;
