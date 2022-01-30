import React, { useState } from "react"
import { Link } from "gatsby"

import Bio from '../components/bio';

import { createArticle } from "../utils/article";
import { isLoggedIn as checkUserLoggedIn, logout} from "../utils/login";
import { isSubscribed as MCisSubscribed } from "../utils/MailChimpSubscriber";

import addToMailchimp from 'gatsby-plugin-mailchimp'

import "./layout.css"

const Layout = props => {
  const { location, title, children, topicQuery, setTopicQuery } = props

  const [isLoggedIn, setIsLoggedIn] = useState(checkUserLoggedIn());

  // MailChimp Subscriber state stuff
  const [isSubscribed, setIsSubscribed] = useState(MCisSubscribed);
  const [subscriberEmailInput, setSubscriberEmailInput] = useState("");

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

  // MailChimp Sign Up
  const _handleMCSignUp = async (e) => {
    e.preventDefault();
    const mcRes = await addToMailchimp(subscriberEmailInput)

    const {result, msg} = mcRes;

    console.log(mcRes)

    // Error subscribing, Already Subscribed
    if (result === "error" && msg.includes("is already subscribed")) {
      console.log("Looks like you're already subscribed!")
      setIsSubscribed(true)
      localStorage.setItem("subscriberEmail", subscriberEmailInput)
    }

    // Subscribing was successful!
    if (result === "success") {
      setIsSubscribed(true)
      localStorage.setItem("subscriberEmail", subscriberEmailInput)
    }

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
      <div className="TopBarAccent" />

      <header>{header}</header>
      <main className="container">{children}</main>

      <footer>

        <div className="container">
        <form onSubmit={_handleMCSignUp} className="NewsletterSignUpForm">

          {isSubscribed && <h4>🎉Thanks for Subscribing! 🎉</h4>}

          {!isSubscribed && <>
            <h4>💌 Stay Up To Date 💌</h4>

            <input type="email" value={subscriberEmailInput} placeholder="Your email, please?" onChange={(e)=> {setSubscriberEmailInput(e.target.value)}} />
            <button type="submit">Sign Me Up</button>
          </>}

        </form>
        
        <Bio/>

        made from scratch

        </div>
        
      </footer>
    </div>
  )
}

export default Layout
