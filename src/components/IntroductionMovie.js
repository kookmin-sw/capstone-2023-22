import React from 'react';

import "./IntroductionMovie.css";


function IntroductionMovie() {
  return (
    <div className="message">
      <iframe width="750" height="500" src="https://www.youtube.com/embed/JS9QPI9w1qA" title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen></iframe>
    </div>
  );
}

export default IntroductionMovie;
