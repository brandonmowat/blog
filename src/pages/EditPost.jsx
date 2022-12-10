import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby'; 
import TurndownService from 'turndown';

import Layout from '../components/layout';
import SEO from '../components/seo';

import { isLoggedIn as checkUserLoggedIn } from "../utils/login";
import { getRawArticle, updateArticle, deleteArticle } from "../utils/article";
import { handleSaveKeyboardShortcut } from "../utils/keyboardShortcut";

import '../templates/blog-post.css';

const EditPost = props => {
  const isLoggedIn = checkUserLoggedIn();


  // Article State Handlers
  const [article, _setArticle] = useState()
  const myArticleStateRef = React.useRef(article);
  const setArticle = data => {
    myArticleStateRef.current = data;
    _setArticle(data);
  };

  const handleSetArticleState = articleData => {
    setArticle({
      ...myArticleStateRef.current,
      ...articleData
    })
  }

  const articleBodyInputRef = useRef();

  const handleArticleBodyOnChange = (e) => {
    handleSetArticleState({ body: e.target.value })
    articleBodyInputRef.current.style.height = articleBodyInputRef.current.scrollHeight + "px"
  }

  const handleUpdateArticle = () => {
    updateArticle(myArticleStateRef.current)
  }

  const handleDeleteArticle = () => {
    const isConfirm = confirm(`Are you sure you want to delete the article: "${article?.title}"?`);

    // delete the article, then redirect back to index
    if (isConfirm) {
      deleteArticle(myArticleStateRef).then(() => {
        window.location.replace(window.location.origin)
      })
    }
  }

  const handleTogglePublishArticle = () => {
    updateArticle({
      ...myArticleStateRef.current,
      isPublished: !article.isPublished
    })
  }

  useEffect(() => {
    if (isLoggedIn) {
      var urlParams = new URLSearchParams(window.location.search);
      getRawArticle(urlParams.get("id")).then(res => {
        handleSetArticleState(res.data)
        articleBodyInputRef.current.style.height = articleBodyInputRef.current.scrollHeight + "px"
      })

      // Add keyboard shortcut for saving
      window.addEventListener("keydown", (e) => {
        handleSaveKeyboardShortcut(e, handleUpdateArticle)
      })
    }
  }, [])

  return (
    <Layout location={props.location} title="Matcha & Mochi">
      <input className="PostInput h1" value={article?.title} onChange={(e) => handleSetArticleState({ title: e.target.value })} placeholder="Title Goes Here" />
      <input className="PostInput h3" value={article?.description} onChange={(e) => handleSetArticleState({ description: e.target.value })} placeholder="Description goes here..." />
      <input className="PostInput date" type="datetime-local" value={article?.publishedDate} onChange={(e) => handleSetArticleState({publishedDate: e.target.value})} />
      <input className="PostInput p" value={article?.tags} onChange={(e) => handleSetArticleState({ tags: e.target.value })} placeholder="tags go here" />

      <textarea
        className="PostBody"
        name="text"
        ref={articleBodyInputRef}
        onChange={handleArticleBodyOnChange}
        value={article?.body}
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

    </Layout>
  );
};

const BlogPostToolbar = props => {
  return (
    <div className="BlogPostToolbar">
      <div className="actions">
        <button onClick={props.handleDeleteArticle}>Delete Article</button>
        <button onClick={props.handleUpdateArticle}>{props?.article?.isPublished ? "Save" : "Save Draft" }</button>
        <button className={`publishButton ${props?.article?.isPublished && "published"}`} onClick={props.handleTogglePublishArticle}>{props?.article?.isPublished ? "Unpublish Article" : "Publish Article"}</button>
      </div>
    </div>
  )
}

export default EditPost;
