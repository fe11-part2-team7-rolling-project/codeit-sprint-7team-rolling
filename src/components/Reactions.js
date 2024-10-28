import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { ReactComponent as AddIcon } from '../assets/add-24.svg';
import DropdownMenu from './DropdownMenu';
import reactionData from '../data/reactionsData.json';

function Reactions() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    setReactions(reactionData.results);
  }, []);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const onEmojiClick = (event, emojiObject) => {
    console.log('Selected emoji:', emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const visibleReactions = reactions.slice(0, 3);
  const dropdownReactions = reactions.slice(3);

  return (
    <div className="flex flex-row relative gap-5 pl-5 pr-6 border-r border-gray200">
      <div className="flex flex-row gap-2 my-auto">
        {visibleReactions.map((reaction) => (
          <div
            key={reaction.id}
            className="flex flex-row justify-center items-center px-2 py-1 gap-2 rounded-[32px] bg-black/[.54]"
          >
            <div className="text-[18px]">{reaction.emoji}</div>
            <div className="text-[14px] text-white leading-[20px] font-regular">
              {reaction.count}
            </div>
          </div>
        ))}
      </div>
      {dropdownReactions.length > 0 && (
        <DropdownMenu reactions={dropdownReactions} />
      )}
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
