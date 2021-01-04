const axios = require('axios');

const get = endpoint =>
  axios.get(`https://brandon-server.herokuapp.com/${endpoint}`);

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

  // Create a page for logging in
  createPage({
    path: '/login',
    component: require.resolve('./src/pages/login.jsx'),
  });

  // // Create a page for each Pokémon.
  publishedArticles.forEach(article => {
    // console.log(article)
    createPage({
      path: `/article/${article._id}/`,
      component: require.resolve('./src/templates/blog-post.js'),
      context: { article },
    });
  });
};
