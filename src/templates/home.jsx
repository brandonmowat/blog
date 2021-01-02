/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';

import '../components/layout.css';
import './pages.css';

const BlogIndex = props => {
  const [topicQuery, setTopicQuery] = useState("");
  const { pageContext } = props;
  const { articles } = pageContext;

  articles.sort((a, b) => (new Date(a.publishedDate || a.created) < new Date(b.publishedDate || b.created) ? 1 : -1));

  const articlesOnTopic = articles.filter(article => article.tags.includes(topicQuery))

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

      {
        topicQuery ?
        <SearchResults articles={articles} topicQuery={topicQuery} /> :
        <MainArticleView articles={articles} />
      }

      <Bio />
    </Layout>
  );
};

const MainArticleView = props => {

  const { articles } = props;

  const firstArticle = articles[0];
  const restArticles = articles.slice(1);

  return (<>
    <div className="row">
      <span className="LatestPostLabel">Latest Post</span>
    </div>

    <Link className="Post FeaturedArticle" to={`article/${firstArticle._id}`}>
      <section>
        <div className="row">
          <div className="col-2">
            <h5 className="FeaturedArticle__date">
              {new Date(firstArticle.publishedDate || firstArticle.created).toDateString()}
            </h5>
          </div>
          <div className="col-4">
            <h3>{firstArticle.title}</h3>
            <h5>{firstArticle.description}</h5>
          </div>
        </div>
      </section>
    </Link>

    <div className="row">
      <span>Older Posts</span>
    </div>

    {restArticles.map(article => (
      <Link className="Post" to={`article/${article._id}`}>
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
    ))}
  </>);
};

const SearchResults = props => {
  const { articles, topicQuery } = props;
  const articlesOnTopic = articles.filter(article => article.tags.includes(topicQuery))

  return (
    articlesOnTopic.map(article => (
      <Link className="Post" to={`article/${article._id}`}>
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

export default BlogIndex;

// thumbnail {
//   childImageSharp {
//     fluid(maxWidth: 400) {
//       ...GatsbyImageSharpFluid_noBase64
//     }
//   }
// }
