// src/components/CardContext.js
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { getRecipients } from '../api/recipientsApi';

const CardContext = createContext();

export function useCardContext() {
  return useContext(CardContext);
}

export function CardProvider({ children }) {
  const [cards, setCards] = useState([]);

  // 카드 데이터를 불러오는 useEffect
  useEffect(() => {
    async function fetchCards() {
      try {
        const data = await getRecipients(1); // 예시로 id 1 사용 (실제 id로 수정 필요)
        setCards(data.recentMessages || []);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    }

    fetchCards();
  }, []);

  // 특정 카드를 삭제하는 함수
  const deleteCard = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  // useMemo로 value 객체 메모이제이션
  const value = useMemo(() => ({ cards, deleteCard }), [cards]);

  return (
    <CardContext.Provider value={value}>
      {children}
    </CardContext.Provider>
  );
}

CardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
