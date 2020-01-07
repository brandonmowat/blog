const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

function getPrevPost(posts, startIndex) {
  for (let index = startIndex + 1; index <= posts.length - 1; index += 1) {
    if (!posts[index].node.frontmatter.isDraft) {
      return posts[index].node;
    }
  }

  return null;
}

function getNextPost(posts, startIndex) {
  for (let index = startIndex - 1; index >= 0; index -= 1) {
    if (!posts[index].node.frontmatter.isDraft) {
      return posts[index].node;
    }
  }

  return null;
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve('./src/templates/blog-post.jsx');
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                isDraft
              }
            }
          }
        }
      }
    `,
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges;
    posts.forEach((post, index) => {
      const previous = getPrevPost(posts, index);
      const next = getNextPost(posts, index);

      console.log(post.node.fields);

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      });
    });

    return null;
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};
