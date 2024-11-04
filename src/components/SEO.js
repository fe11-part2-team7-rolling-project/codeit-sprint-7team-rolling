import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import rollingImg from '../assets/Rolling_Img.png';

function SEO({ title, description }) {
  return (
    <Helmet>
      <title>롤링 - To.{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`롤링 - TO.${title}`} />
      <meta property="og:image" content={rollingImg} />
      <meta property="og:image:width" content="260" />
      <meta property="og:image:height" content="260" />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="ko_KR" />
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SEO;
