import axios from "axios";

async function getRawArticle(articleId) {
  const token = localStorage.getItem("token")

  const api = axios.create({
    withCredentials: true,
    baseURL: "https://brandon-server.herokuapp.com/api/v1/"
  })

  const res = await api.get(`articles/${articleId}`, {
    headers: {
      "Authorization": `Basic ${token}`
    }
  })

  console.log(res)

  return res
}

async function updateArticle(article) {
  const token = localStorage.getItem("token")

  const api = axios.create({
    withCredentials: true,
    baseURL: "https://brandon-server.herokuapp.com/api/v1/"
  })
  console.log(article)

  const id = article._id

  // delete article._id
  delete article.id

  const res = await api.patch(`articles/${article._id}`, article, {
    headers: {
      "Authorization": `Basic ${token}`
    }
  })

  console.log(res)

  return res
}

async function createArticle(article) {
  const token = localStorage.getItem("token")

  const api = axios.create({
    withCredentials: true,
    baseURL: "https://brandon-server.herokuapp.com/api/v1/"
  })

  const res = await api.post(`articles/`, {
    title: "About Cities",
    description: "des",
    body: ""

  }, {
    headers: {
      "Authorization": `Basic ${token}`
    }
  })

  console.log(res)

  return res
}

export {updateArticle, getRawArticle, createArticle}