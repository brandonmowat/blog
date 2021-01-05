import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { isLoggedIn as checkUserLoggedIn } from "../utils/login";
import { getRawArticle, updateArticle, createArticle } from "../utils/article";

import './blog-post.css';

const BlogPostTemplate = props => {
  const { article } = props.pageContext;
  const isLoggedIn = checkUserLoggedIn();

  const [articleTitle, setArticleTitle] = useState(article.title)
  const [articleDescription, setArticleDescription] = useState(article.description)
  const [articleBody, setArticleBody] = useState(article.body)

  const handleUpdateArticle = () => {
    updateArticle({ ...article,
      title: articleTitle,
      body: articleBody,
      tags: "",
      publishedDate: "2021-01-04T17:46:31Z",
      description: articleDescription
    })
  }


  useEffect(() => {
    if (isLoggedIn) {
      getRawArticle(article._id).then(res => {
        setArticleBody(res.data.body)
        setArticleDescription(res.data.description)
        setArticleTitle(res.data.title)
      })
    }
  }, [])

  return (
    <Layout location={props.location} title="Matcha & Mochi">
      <SEO
        title={article.title}
        description={article.description}
        tags={article.tags}
      />
      <h1
        style={{
          textAlign: 'center',
        }}
      >
        {isLoggedIn ?
          <ContentEditable html={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} /> :
          article.title}
      </h1>
      <h3
        style={{
          textAlign: 'center',
        }}
      >
        {isLoggedIn ?
          <ContentEditable html={articleDescription} onChange={(e) => setArticleDescription(e.target.value)} /> :
          article.description}
      </h3>
      <p
        style={{
          textAlign: 'center',
        }}
      >
        {new Date(article.publishedDate || article.created).toDateString()}
      </p>

      {isLoggedIn ?
        <ContentEditable html={articleBody} onChange={(e) => setArticleBody(e.target.value)} /> :
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
      }

      {isLoggedIn &&
        <div className="editorToolbar" >
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

export default BlogPostTemplate;
