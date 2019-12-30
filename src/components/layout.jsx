import React from 'react';
import { Link } from 'gatsby';
import './layout.css';

const Layout = (props) => {
  const { location, title, children } = props;
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  if (location.pathname === rootPath) {
    header = (
      <div className="header-content header-content--bottom">
        <h1>
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to="/"
          >
            {title}
          </Link>
        </h1>
      </div>
    );
  } else {
    header = (
      <div className="header-content header-content--top">
        <div className="blog-title">
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to="/"
          >
            {title}
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <header className="container">{header}</header>
      <main className="container">{children}</main>
      <footer className="container">
          made with craft
      </footer>
    </div>
  );
};

export default Layout;
