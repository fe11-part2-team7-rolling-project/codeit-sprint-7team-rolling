import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';
import { ReactComponent as AddIcon } from '../../assets/add-24.svg';
import DropdownMenu from './DropdownMenu';
import {
  addRecipientReaction,
  getRecipientsReactions,
} from '../../api/recipientsApi';
import useDark from "../../hooks/useDark";

function Reactions() {
  const { id } = useParams();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [reactions, setReactions] = useState([]);
  const [isDark] = useDark();
  const theme = isDark ? "dark" : "light";

  useEffect(() => {
    async function fetchRecipientReactions() {
      try {
        const data = await getRecipientsReactions(id);
        setReactions(data.results);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchRecipientReactions();
  }, [id]);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const onEmojiClick = async (event) => {
    const reactionData = {
      emoji: event.emoji,
      type: 'increase',
    };

    try {
      await addRecipientReaction(id, reactionData);
      const updatedData = await getRecipientsReactions(id);
      setReactions(updatedData.results);
    } catch (error) {
      console.error('Error posting reaction:', error);
    } finally {
      setShowEmojiPicker(false);
    }
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
        <AddIcon className="w-[20px] h-[20px] text-[#181818] dark:text-gray200" />
      </button>

      {showEmojiPicker && (
        <div className="absolute top-full mt-2">
          <EmojiPicker onEmojiClick={onEmojiClick} theme={theme} />
        </div>
      )}
    </div>
  );
}

export default Reactions;
