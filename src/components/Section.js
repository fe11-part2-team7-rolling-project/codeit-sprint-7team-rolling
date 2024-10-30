import React from 'react';
import PropTypes from 'prop-types';

function Section({ point, title, description, imageName, align }) {
  return (
    <div className="bg-surface p-6 rounded-lg w-full max-w-4xl mb-8">
      <div
        className={`flex flex-col ${
          align === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
        } items-center`}
      >
        <div className="md:w-1/2 p-4">
          <p className="text-white font-bold mb-2 px-3 py-1 bg-purple500 rounded-full inline-block">
            {point}
          </p>
          <h2 className="text-2xl font-semibold mb-2 text-gray800">{title}</h2>
          <p className="text-gray600 mb-4">{description}</p>
        </div>
        <div className="md:w-1/2 flex justify-center p-4">
          <img
            src={imageName}
            alt={`${point} 이미지`}
            className="w-full max-w-xs md:max-w-md"
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
  align: PropTypes.oneOf(['left', 'right']),
};

Section.defaultProps = {
  align: 'left',
};

export default Section;
