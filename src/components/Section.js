import React from "react";
import PropTypes from "prop-types";

function Section({ point, title, description, imageName, align }) {
  return (
    <div className="bg-surface dark:bg-dark4 p-6 rounded-lg mb-8 mx-5 min-[376px]:p-8 min-[1025px]:w-[1200px]">
      <div
        className={`flex flex-col ${
          align === "left"
            ? "min-[1024px]:flex-row"
            : "min-[1024px]:flex-row-reverse"
        } justify-center`}
      >
        <div className="mb-4">
          <div className="text-white text-sm font-bold mb-2 px-3 py-1 bg-purple600 rounded-full inline-block">
            {point}
          </div>
          <h2 className="text-lg font-bold mb-2 mt-4 text-gray900 dark:text-gray300 leading-snug whitespace-pre-line min-[376px]:text-2xl">
            {title}
          </h2>
          <p className="text-gray500 dark:text-gray400 font-regular text-[15px] mb-4 whitespace-pre-line min-[376px]:text-lg">
            {description}
          </p>
        </div>
        <div className="flex justify-center min-[1025px]:justify-start">
          <img
            src={imageName}
            alt={`${point} 이미지`}
            className="w-[354px] min-[376px]:w-[720px] "
          />
        </div>
      </div>
    </div>
  );
}

Section.propTypes = {
  point: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired,
  align: PropTypes.oneOf(["left", "right"]),
};

Section.defaultProps = {
  align: "left",
};

export default Section;
