import React, { useState } from "react";

function RelationSelector() {
  const [relation, setRelation] = useState("지인");
  const options = ["친구", "지인", "동료", "가족"];

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="relation">상대와의 관계</label>
      <select
        id="relation"
        value={relation}
        onChange={(e) => setRelation(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RelationSelector;
