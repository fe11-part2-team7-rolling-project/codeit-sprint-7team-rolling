import PropTypes from "prop-types";
import React, { useState } from "react";

function CardProfileImg({ message }) {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading && <div className="w-7 h-7 rounded-full skeleton" />}
      <img
        style={{ display: loading ? "none" : "block" }}
        onLoad={() => {
          setLoading(false);
        }}
        key={message.id}
        src={message.profileImageURL}
        alt={message.sender}
        className="w-7 h-7 rounded-full border-2 border-white"
      />
    </div>
  );
}

CardProfileImg.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    profileImageURL: PropTypes.string,
    sender: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardProfileImg;
