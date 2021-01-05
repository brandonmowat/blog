import axios from "axios";

async function getRawArticle(articleId) {
  let res;

  if (typeof localStorage !== "undefined") {
    const token = localStorage.getItem("token")

    const api = axios.create({
      withCredentials: true,
      baseURL: "https://brandon-server.herokuapp.com/api/v1/"
    })

    res = await api.get(`articles/${articleId}`, {
      headers: {
        "Authorization": `Basic ${token}`
      }
    })
  }

  return res
}

async function updateArticle(article) {
  let res;

  if (typeof localStorage !== "undefined") {
    const token = localStorage.getItem("token")

    const api = axios.create({
      withCredentials: true,
      baseURL: "https://brandon-server.herokuapp.com/api/v1/"
    })

    delete article.id

    const res = await api.patch(`articles/${article._id}`, article, {
      headers: {
        "Authorization": `Basic ${token}`
      }
    })
  }


  return res
}

async function createArticle(article) {
  let res;

  if (typeof localStorage !== "undefined") {
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
  }


  return res
}

export {updateArticle, getRawArticle, createArticle}