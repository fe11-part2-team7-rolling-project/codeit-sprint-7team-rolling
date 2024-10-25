import React, { useState } from "react";

const RelationSelector = () => {
  const [relation, setRelation] = useState("지인");
  const options = ["친구", "지인", "동료", "가족"];

  return (
    <div>
      <label>상대와의 관계</label>
      <select value={relation} onChange={(e) => setRelation(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RelationSelector;
