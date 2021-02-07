import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import TurndownService from 'turndown';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { isLoggedIn as checkUserLoggedIn } from "../utils/login";
import { getRawArticle, updateArticle, deleteArticle } from "../utils/article";

import '../templates/blog-post.css';

const EditPost = props => {
  const isLoggedIn = checkUserLoggedIn();

  const [article, setArticle] = useState()

  const [articleTitle, setArticleTitle] = useState("")
  const [articleDescription, setArticleDescription] = useState("")
  const [articleBody, setArticleBody] = useState("")

  const [articleTags, setArticleTags] = useState("")


  const handleUpdateArticle = () => {
    var turndownService = new TurndownService()
    console.log(turndownService.turndown(articleBody))
    updateArticle({
      ...article,
      title: articleTitle,
      body: turndownService.turndown(articleBody),
      tags: articleTags,
      description: articleDescription
    })
  }

  const handleDeleteArticle = () => {
    const isConfirm = confirm(`Are you sure you want to delete the article: "${articleTitle}"?`);

    if (isConfirm) deleteArticle(article)
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
      })
    }
  }, [])

  return (
    <Layout location={props.location} title="Matcha & Mochi">
      <h1
        style={{
          textAlign: 'center',
        }}
      >
        <ContentEditable html={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} />
      </h1>
      <h3
        style={{
          textAlign: 'center',
        }}
      >
        <ContentEditable html={articleDescription} onChange={(e) => setArticleDescription(e.target.value)} />
      </h3>
      <p
        style={{
          textAlign: 'center',
        }}
      >
        <ContentEditable html={articleTags} onChange={(e) => setArticleTags(e.target.value)} />
      </p>
      {/* <p
        style={{
          textAlign: 'center',
        }}
      >
        {new Date(article.publishedDate || article.created).toDateString()}
      </p> */}

      <ContentEditable html={articleBody} onChange={(e) => setArticleBody(e.target.value)} />

      {isLoggedIn &&
        <div className="editorToolbar" >
          <button onClick={() => handleDeleteArticle()}>Delete Article</button>
          <button onClick={() => handleUpdateArticle()}>save</button>
        </div>
      }

      <hr style={{}} />
      <Bio />

    </Layout>
  );
};

class ContentEditable extends React.Component {
  ref = React.createRef()

  render() {
    return <pre id="contenteditable"
      onInput={this.emitChange}
      onBlur={this.emitChange}
      contentEditable
      ref={this.ref}
      dangerouslySetInnerHTML={{ __html: this.props.html }}></pre>;
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== this.ref.current.innerHTML;
  }

  componentDidUpdate() {
    if (this.props.html !== this.ref.current.innerHTML) {
      this.ref.current.innerHTML = this.props.html;
    }
  }

  emitChange = () => {
    console.log(this.ref)

    var html = this.ref.current.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html
        }
      });
    }
    this.lastHtml = html;
  }
};

export default EditPost;
