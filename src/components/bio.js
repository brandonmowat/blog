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
        {' '}
who lives and works at Ada in Toronto -- building useful things.
        {' '}
        <a href="https://twitter.com/brandonmowat">
                You should follow him on Twitter
        </a>
      </p>
    </div>
  );
}

export default Bio;
