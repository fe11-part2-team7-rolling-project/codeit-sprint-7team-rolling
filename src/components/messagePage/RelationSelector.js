import React, { useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";

const options = ["친구", "지인", "동료", "가족"];

function RelationSelector({ onSelectRelation }) {
  const [relation, setRelation] = useState("지인");

  const handleRelationChange = (e) => {
    setRelation(e.target.value);
    onSelectRelation(e.target.value); // 부모 컴포넌트에 전달
  };

  return (
    <div>
      <label htmlFor="relation">
        상대와의 관계
        <select value={relation} onChange={handleRelationChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

RelationSelector.propTypes = {
  onSelectRelation: PropTypes.func.isRequired,
};

export default RelationSelector;
