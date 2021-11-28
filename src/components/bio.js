/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import './bio.css';

function Bio() {
  return (
    <div
      className="Bio"
    >
      <p>
              Written by
        {' '}
        <strong>Brandon Mowat</strong>
        <br></br>
<span>building useful things at Ada, in the city of Toronto</span>
<br></br>

      </p>
    </div>
  );
}

export default Bio;
