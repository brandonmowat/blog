import React from "react"
import { Link } from "gatsby"
import "./layout.css"

const Layout = props => {
  const { location, title, children } = props
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <div className="header-content">
        <h1>
          <Link
            style={{
              boxShadow: "none",
              textDecoration: "none",
              color: "inherit",
            }}
            to="/"
          >
            <img src="../../MM.png" />
          </Link>
        </h1>
      </div>
    )
  } else {
    header = (
      <div className="header-content">
        <div className="blog-title">
          <Link
            style={{
              boxShadow: "none",
              textDecoration: "none",
              color: "inherit",
            }}
            to="/"
          >
            <img src="../../MM.png" />
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div>
      <header className="container">{header}</header>
      <main className="container">{children}</main>
      <footer className="container">made from scratch</footer>
    </div>
  )
}

export default Layout
