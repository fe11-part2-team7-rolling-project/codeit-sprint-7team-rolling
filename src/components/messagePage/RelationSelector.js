import React, { useState } from "react";
import PropTypes from "prop-types";

const options = ["친구", "지인", "동료", "가족"];

function RelationSelector({ onSelectRelation }) {
  const [relation, setRelation] = useState("지인");

  const handleRelationChange = (e) => {
    setRelation(e.target.value);
    onSelectRelation(e.target.value);
  };

  return (
    <div className="mb-24 w-[320px] h-[35px] flex flex-col gap-[12px]">
      <label htmlFor="RelationSelector">
        <h1 className="text-[#181818] font-bold text-[24px] leading-[36px] tracking-tight mb-3">
          상대와의 관계
        </h1>
        <select
          id="RelationSelector"
          value={relation}
          onChange={handleRelationChange}
          className="w-[320px] h-[50px] rounded-[8px] border border-[#CCCCCC] px-4 py-3 text-[#555555] font-normal text-[16px] leading-[26px] tracking-tight"
        >
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
