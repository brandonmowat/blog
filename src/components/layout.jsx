import React, { useState } from "react"
import { Link } from "gatsby"

import { createArticle } from "../utils/article";
import { isLoggedIn as checkUserLoggedIn, logout} from "../utils/login";

import "./layout.css"

const Layout = props => {
  const { location, title, children, topicQuery, setTopicQuery } = props

  const [isLoggedIn, setIsLoggedIn] = useState(checkUserLoggedIn());

  const rootPath = `${__PATH_PREFIX__}/`

  let header

  const onLogOut = () => {
    logout().then(() => {
      setIsLoggedIn(false);
    })
  }

  const newPostHandler = () => {
    createArticle().then(res => {
      window.location.replace(`${window.location.origin}/new-post?id=${res.data._id}`)
    })
  }

  // We need to check the type of window because netlify is stupid
  if (typeof window !== "undefined" && window.location.pathname !== rootPath) {
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
        <h3 className="description">a blog written by Brandon Mowat</h3>
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
            onClick={() => setTopicQuery("")}
          >
            <img src="../../MM.png" />
          </Link>
          <h3 className="description">a blog written by Brandon Mowat</h3>
        </div>

        <div className="header-content">
          {isLoggedIn && (
            <>
            <button onClick={newPostHandler}>New Post</button>
            <button onClick={onLogOut}>Log Out</button>
            </>
          )}

          <div className="header-content__topics">
          <input
            className="SearchBar"
            placeholder="Search for topic like:"
            value={topicQuery} onChange={e => setTopicQuery(e.target.value)}/>
            <button onClick={() => setTopicQuery("cities")}>Urban Life</button>
            <button onClick={() => setTopicQuery("cooking")}>Cooking</button>
            <button onClick={() => setTopicQuery("software")}>Software</button>
            <button onClick={() => setTopicQuery("management")}>Management</button>
            <div></div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      {/* This is to connect to MailChimp. It should go in the <head> but i don't know where to do that yet lool */}
      <script id="mcjs">!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/e08b91b13d289ecf8346df79b/f97c44d12f7205ca24e7d36bb.js");</script>

      <div className="TopBarAccent" />

      <header>{header}</header>
      <main className="container">{children}</main>
      <footer className="container">made from scratch</footer>
    </div>
  )
}

export default Layout
