import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { isLoggedIn as checkUserLoggedIn } from "../utils/login";
import { getRawArticle, updateArticle, deleteArticle } from "../utils/article";

import './blog-post.css';

const BlogPostTemplate = props => {
  const { article } = props.pageContext;
  const isLoggedIn = checkUserLoggedIn();

  const [articleTitle, setArticleTitle] = useState(article.title)
  const [articleDescription, setArticleDescription] = useState(article.description)
  const [articleBody, setArticleBody] = useState(article.body)

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
        {article.title}
      </h1>
      <h3
        style={{
          textAlign: 'center',
        }}
      >
        {article.description}
      </h3>
      <p
        style={{
          textAlign: 'center',
        }}
      >
        {new Date(article.publishedDate || article.created).toDateString()}
      </p>

      <div className="articleBodyContainer" dangerouslySetInnerHTML={{ __html: article.body }} />

      <hr style={{}} />

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
