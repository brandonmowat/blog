import React, { useState } from "react"
import { Link } from "gatsby"
import "./layout.css"

const Layout = props => {
  const { location, title, children, topicQuery, setTopicQuery } = props


  const rootPath = `${__PATH_PREFIX__}/`

  console.log(rootPath, window.location.pathname)
  let header

  if (window.location.pathname !== rootPath) {
    header = (
      <div className="container header">
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
  } else {
    header = (
      <div className="container header">
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
          <h3 className="description">a blog written by Brandon Mowat</h3>
        </div>
        <div className="header-content">
          <input
            className="SearchBar"
            placeholder="Search for something..."
            value={topicQuery} onChange={e => setTopicQuery(e.target.value)}/>
          <div className="header-content-topics">
            <button onClick={() => setTopicQuery("running")}>Running</button>
            <button onClick={() => setTopicQuery("cooking")}>Cooking</button>
            <button onClick={() => setTopicQuery("ada")}>Ada</button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <header>{header}</header>
      <main className="container">{children}</main>
      <footer className="container">made from scratch</footer>
    </div>
  )
}

export default Layout
