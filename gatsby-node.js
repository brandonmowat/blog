const axios = require('axios');

const get = endpoint =>
  axios.get(`https://brandon-server.herokuapp.com/${endpoint}`);

exports.createPages = async ({ actions: { createPage } }) => {
  const { data: articles } = await get('articles/');

  const sortedArticles = articles.sort(
    (a, b) => new Date(a.created) < new Date(b.created)
  );

  // Create a page that lists all Articles
  createPage({
    path: '/',
    component: require.resolve('./src/templates/home.jsx'),
    context: { sortedArticles },
  });

  // // Create a page for each Pokémon.
  sortedArticles.forEach(article => {
    // console.log(article)
    createPage({
      path: `/article/${article.id}/`,
      component: require.resolve('./src/templates/blog-post.js'),
      context: { article },
    });
  });
};
