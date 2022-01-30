/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';

import { getAllRawArticles } from "../utils/article";
import { isLoggedIn } from '../utils/login';

import '../components/layout.css';
import './pages.css';


const AllPosts = props => {
  const [topicQuery, setTopicQuery] = useState("");
  const { pageContext } = props;


  const articlesTemp = pageContext.articles
  articlesTemp.sort((a, b) => (new Date(a.publishedDate || a.created) < new Date(b.publishedDate || b.created) ? 1 : -1));
  const [articles, setArticles] = useState(articlesTemp)


  useEffect(() => {
    if (isLoggedIn()) {
      getAllRawArticles().then(res => {
        const articlesTemp = res.data
        articlesTemp.sort((a, b) => (new Date(a.publishedDate || a.created) < new Date(b.publishedDate || b.created) ? 1 : -1));
        setArticles(articlesTemp)
      })
    }
  }, []);

  if (!articles) {
    return <div>no posts</div>;
  }

  return (
    <Layout location="/" title="Macha & Mochi" topicQuery={topicQuery} setTopicQuery={setTopicQuery}>
      <SEO
        title="All posts"
        keywords={[
          'blog',
          'gatsby',
          'javascript',
          'react',
          'running',
          'matcha',
          'mochi',
        ]}
      />

      <h1>Full Blog Archive</h1>

      {
        topicQuery ?
        <SearchResults articles={articles} topicQuery={topicQuery} /> :
        <MainArticleView articles={articles} />
      }

    </Layout>
  );
};

const getArticleLink = (article) => {
  if (isLoggedIn()) {
    return `new-post?id=${article._id}`
  }

  const title = article.title.replace(/[^\w\s]/gi, '').replace(/\s+/gi, "-")

  return `/article/${title}-${article._id}`;
}

const MainArticleView = props => {

  const { articles } = props;
  const firstArticle = articles[0];
  const restArticles = articles.slice(1);

  return (<>
    <div className="row">
      <span className="LatestPostLabel">Latest Post</span>
    </div>

    <Link className="Post FeaturedArticle" to={getArticleLink(firstArticle)}>
      <section>
        <div className="row">
          <div className="col-2">
            <h5 className="FeaturedArticle__date">
              {new Date(firstArticle.publishedDate || firstArticle.created).toDateString()}
            </h5>
          </div>
          <div className="col-4">
            <h3><span>{firstArticle.title}</span></h3>
            <h5>{firstArticle.description}</h5>
          </div>
        </div>
      </section>
    </Link>

    <div className="row">
      <span>Older Posts</span>
    </div>

    {restArticles.map(article => (
      <Link className="Post" to={getArticleLink(article)}>
        <div className="row">
          <div className="col-2">
            <h5 className="Post__date">
              {new Date(article.publishedDate || article.created).toDateString()}
            </h5>
          </div>
          <div className="col-4">
            <h3><span>{article.title}</span></h3>
            <h5>{article.description}</h5>
          </div>
        </div>
      </Link>
    ))}
  </>);
};

const SearchResults = props => {
  const { articles, topicQuery } = props;
  const articlesOnTopic = articles.filter(article => article.tags.includes(topicQuery))

  return (
    articlesOnTopic.map(article => (
      <Link className="Post" to={getArticleLink(article)}>
        <div className="row">
          <div className="col-2">
            <h5 className="Post__date">
              {new Date(article.publishedDate || article.created).toDateString()}
            </h5>
          </div>
          <div className="col-4">
            <h3>{article.title}</h3>
            <h5>{article.description}</h5>
          </div>
        </div>
      </Link>
    ))
  );
}

export default AllPosts;
