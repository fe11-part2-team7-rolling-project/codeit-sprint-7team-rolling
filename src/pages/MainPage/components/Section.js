import React from 'react';
import Card from './Card';
import EmojiSection from './EmojiSection';

function Section({ point, title, description, cards, emojiSection }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8 w-full max-w-4xl">
      <div className="flex flex-col md:flex-row items-start md:items-center">
        <div className="md:w-3/5">
          <p className="text-purple-500 font-bold mb-2">{point}</p>
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex space-x-4 overflow-x-scroll md:overflow-hidden">
            {cards.map((card, index) => (
              <Card
                key={index}
                from={card.from}
                text={card.text}
                date={card.date}
                profileImage={card.profileImage}
              />
            ))}
          </div>
          {emojiSection && <EmojiSection />}
        </div>
      </div>
    </div>
  );
}

export default Section;
