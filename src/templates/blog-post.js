import React from 'react';
import { Link } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';

import './blog-post.css';

const BlogPostTemplate = props => {
  const { article } = props.pageContext;

  console.log(article.tags)

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
      <p
        style={{
          textAlign: 'center',
        }}
      >
        {new Date(article.publishedDate || article.created).toDateString()}
      </p>
      <div dangerouslySetInnerHTML={{ __html: article.body }} />
      <hr style={{}} />
      <Bio />

      {/* <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: 0,
        }}
      >
        <li>
          {previous && (
          <Link to={previous.fields.slug} rel="prev">
                ←
            {' '}
            {previous.frontmatter.title}
          </Link>
          )}
        </li>
        <li>
          {next && (
          <Link to={next.fields.slug} rel="next">
            {next.frontmatter.title}
            {' '}
→
          </Link>
          )}
        </li>
      </ul> */}
    </Layout>
  );
};

export default BlogPostTemplate;
