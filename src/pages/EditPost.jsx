import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby'; 
import TurndownService from 'turndown';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { isLoggedIn as checkUserLoggedIn } from "../utils/login";
import { getRawArticle, updateArticle, deleteArticle } from "../utils/article";
import { handleSaveKeyboardShortcut } from "../utils/keyboardShortcut";

import '../templates/blog-post.css';

const EditPost = props => {
  const isLoggedIn = checkUserLoggedIn();

  const [article, setArticle] = useState()

  const [articleTitle, setArticleTitle] = useState("")
  const [articleDescription, setArticleDescription] = useState("")
  const [articleBody, setArticleBody] = useState("")
  const [articleTags, setArticleTags] = useState("")
  const articleBodyInputRef = useRef();

  const handleArticleBodyOnChange = (e) => {
    setArticleBody(e.target.value)
    articleBodyInputRef.current.style.height = articleBodyInputRef.current.scrollHeight + "px"
  }

  const handleUpdateArticle = () => {
    updateArticle({
      ...article,
      title: articleTitle,
      body: articleBody,
      tags: articleTags,
      description: articleDescription
    })
  }

  const handleDeleteArticle = () => {
    const isConfirm = confirm(`Are you sure you want to delete the article: "${articleTitle}"?`);

    // delete the article, then redirect back to index
    if (isConfirm) {
      deleteArticle(article).then(() => {
        window.location.replace(window.location.origin)
      })
    }
  }

  const handleTogglePublishArticle = () => {
    updateArticle({
      ...article,
      title: articleTitle,
      body: articleBody,
      tags: articleTags,
      description: articleDescription,
      isPublished: !article.isPublished
    })
  }

  useEffect(() => {
    if (isLoggedIn) {
      var urlParams = new URLSearchParams(window.location.search);
      getRawArticle(urlParams.get("id")).then(res => {
        setArticle(res.data)
        setArticleBody(res.data.body)
        setArticleDescription(res.data.description)
        setArticleTitle(res.data.title)
        setArticleTags(res.data.tags)
        articleBodyInputRef.current.style.height = articleBodyInputRef.current.scrollHeight + "px"
      })
      
      // Add keyboard shortcut for saving
      window.addEventListener("keydown", (e) => {handleSaveKeyboardShortcut(e, handleUpdateArticle)})
    }
  }, [])

  return (
    <Layout location={props.location} title="Matcha & Mochi">
      <input className="PostInput h1" value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} placeholder="Title Goes Here" />
      <input className="PostInput h3" value={articleDescription} onChange={(e) => setArticleDescription(e.target.value)} placeholder="Description goes here..." />
      <input className="PostInput p" value={articleTags} onChange={(e) => setArticleTags(e.target.value)} placeholder="tags go here" />

      <textarea
        className="PostBody"
        name="text"
        ref={articleBodyInputRef}
        onChange={handleArticleBodyOnChange}
        value={articleBody}
        placeholder="Make Your Masterpiece..."
      ></textarea>


      {isLoggedIn &&
        <BlogPostToolbar
          article={article}
          handleDeleteArticle={handleDeleteArticle}
          handleUpdateArticle={handleUpdateArticle}
          handleTogglePublishArticle={handleTogglePublishArticle}
        />
      }

      <hr style={{}} />
      <Bio />

    </Layout>
  );
};

const BlogPostToolbar = props => {
  return (
    <div className="BlogPostToolbar">
      <div className="actions">
        <button onClick={props.handleDeleteArticle}>Delete Article</button>
        <button onClick={props.handleUpdateArticle}>{props?.article?.isPublished ? "Save" : "Save Draft" }</button>
        <button className={`publishButton ${props?.article?.isPublished && "published"}`} onClick={props.handleTogglePublishArticle}>{props?.article?.isPublished ? "Unpublish Article" : "Publich Article"}</button>
      </div>
    </div>
  )
}

export default EditPost;
