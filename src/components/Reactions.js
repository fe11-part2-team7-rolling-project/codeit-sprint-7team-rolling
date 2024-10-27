import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { ReactComponent as AddIcon } from '../assets/add-24.svg';
import DropdownMenu from './DropdownMenu';
import ReactionIconBtn from './ReactionIconBtn';

function Reactions() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const onEmojiClick = (event, emojiObject) => {
    console.log('Selected emoji:', emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex flex-row relative gap-1 mx-5">
      <div className="flex flex-row gap-2">
        <ReactionIconBtn />
        <ReactionIconBtn />
        <ReactionIconBtn />
      </div>
      <DropdownMenu />
      <button
        type="button"
        onClick={toggleEmojiPicker}
        className="px-[6px] py-2 border rounded-[6px] border-gray300"
      >
        <AddIcon className="w-[20px] h-[20px]" />
      </button>
      {showEmojiPicker && (
        <div className="absolute top-full mt-2">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
}

export default Reactions;
