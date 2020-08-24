/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';

import '../components/layout.css';
import './pages.css';

const BlogIndex = props => {
  const { pageContext } = props;
  const { articles } = pageContext;

  let _articles;

  // omit post if labeled a draft in production
  if (!(process.env.NODE_ENV === 'development')) {
    _articles = articles.filter(article => article.isPublished);
  }

  const firstArticle = _articles[0];

  _articles = _articles.slice(1);

  return (
    <Layout location="/" title="Macha & Mochi">
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
      {/* <Bio /> */}
      <div className="row">
        <span className="LatestPostLabel">Latest Post</span>
      </div>

      <Link className="Post FeaturedArticle" to={`article/${firstArticle.id}`}>
        <section>
          <div className="row">
            <div className="col-2">
              <h5 className="FeaturedArticle__date">
                {new Date(firstArticle.created).toDateString()}
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

      {_articles.map(article => (
        <Link className="Post" to={`article/${article.id}`}>
          <div className="row">
            <div className="col-2">
              <h5 className="Post__date">
                {new Date(article.created).toDateString()}
              </h5>
            </div>
            <div className="col-4">
              <h3>{article.title}</h3>
              <h5>{article.description}</h5>
            </div>
          </div>
        </Link>
      ))}
      <Bio />
    </Layout>
  );
};

export default BlogIndex;

// thumbnail {
//   childImageSharp {
//     fluid(maxWidth: 400) {
//       ...GatsbyImageSharpFluid_noBase64
//     }
//   }
// }
