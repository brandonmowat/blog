require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const API_URL = process.env.API_URL || "https://brandon-server.herokuapp.com/";

const axios = require('axios');

const get = endpoint =>
  axios.get(`${API_URL}${endpoint}`);

exports.createPages = async ({ actions: { createPage } }) => {
  const { data: articles } = await get('articles/');

  let publishedArticles = articles;

  // omit post if labeled a draft in production
  if (!(process.env.NODE_ENV === 'development')) {
    publishedArticles = publishedArticles.filter(
      article => article.isPublished
    );
  }

  // Create a page that lists all Articles
  createPage({
    path: '/',
    component: require.resolve('./src/templates/home.jsx'),
    context: { articles: publishedArticles },
  });

  // Create a page that lists all Articles
  createPage({
    path: '/all/',
    component: require.resolve('./src/templates/all-posts.jsx'),
    context: { articles: publishedArticles },
  });

  // Create a page for logging in
  createPage({
    path: '/login/',
    component: require.resolve('./src/pages/login.jsx'),
  });

  createPage({
    path: '/new-post/',
    component: require.resolve('./src/pages/EditPost.jsx'),
  });

  publishedArticles.forEach(article => {
    // console.log(article)

    // Replace non-alpha characters with empty string
    // then replace spaces with "-"
    const title = article.title.replace(/[^\w\s]/gi, '').replace(/\s+/gi, "-")

    createPage({
      path: `/article/${title}-${article._id}/`,
      component: require.resolve('./src/templates/blog-post.js'),
      context: { article },
    });
  });
};
