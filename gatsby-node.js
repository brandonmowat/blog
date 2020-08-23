const axios = require("axios")

const get = endpoint =>
  axios.get(`https://brandon-server.herokuapp.com/${endpoint}`)

exports.createPages = async ({ actions: { createPage } }) => {
  const { data: articles } = await get("articles/")

  // Create a page that lists all Articles
  createPage({
    path: "/",
    component: require.resolve("./src/templates/home.jsx"),
    context: { articles },
  })

  // // Create a page for each Pokémon.
  articles.forEach(article => {
    // console.log(article)
    createPage({
      path: `/article/${article.id}/`,
      component: require.resolve("./src/templates/blog-post.js"),
      context: { article },
    })
  })
}
