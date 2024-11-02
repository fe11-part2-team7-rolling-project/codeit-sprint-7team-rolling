import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';
import { ReactComponent as AddIcon } from '../../assets/add-24.svg';
import DropdownMenu from './DropdownMenu';
import {
  addRecipientReaction,
  getRecipientsReactions,
} from '../../api/recipientsApi';

function Reactions() {
  const { id } = useParams();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    async function fetchRecipientReactions() {
      try {
        const data = await getRecipientsReactions(id);
        setReactions(data.results);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      }
    }

    fetchRecipientReactions();
  }, [id]);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const onEmojiClick = async (event) => {
    const clickedEmoji = event.emoji;

    const previousReactions = [...reactions];

    // 기존에 같은 이모지가 있는지 확인
    const existingReactionIndex = reactions.findIndex(
      (reaction) => reaction.emoji === clickedEmoji,
    );

    let updatedReactions;
    if (existingReactionIndex !== -1) {
      updatedReactions = [...reactions];
      updatedReactions[existingReactionIndex].count += 1;
    } else {
      const newReaction = {
        id: Date.now(), // Optimistic Update를 위한 임시 고유 ID
        emoji: clickedEmoji,
        count: 1,
      };
      updatedReactions = [...reactions, newReaction];
    }

    setReactions(updatedReactions);

    try {
      const reactionData = {
        emoji: clickedEmoji,
        type: 'increase',
      };
      await addRecipientReaction(id, reactionData);

      const updatedData = await getRecipientsReactions(id);
      setReactions(updatedData.results);
    } catch (error) {
      setReactions(previousReactions);
      alert('리액션 등록에 실패했습니다. 다시 시도해 주세요.');
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
