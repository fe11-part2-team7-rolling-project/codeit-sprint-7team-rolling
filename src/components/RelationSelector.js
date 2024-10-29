import React, { useState } from "react";

const options = ["친구", "지인", "동료", "가족"];

function RelationSelector() {
  const [relation, setRelation] = useState("지인");

  return (
    <div>
      <label htmlFor="relation">
        상대와의 관계
        <select value={relation} onChange={(e) => setRelation(e.target.value)}>
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

export default RelationSelector;
