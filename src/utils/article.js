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

async function getAllRawArticles() {
  let res;

  if (typeof localStorage !== "undefined") {
    const token = localStorage.getItem("token")

    const api = axios.create({
      withCredentials: true,
      baseURL: "https://brandon-server.herokuapp.com/api/v1/"
    })

    res = await api.get(`articles/`, {
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

    res = await api.patch(`articles/${article._id}`, article, {
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

    res = await api.post(`articles/`, {
      title: "NEW POST",
      description: "",
      body: "",
      tags: ""

    }, {
      headers: {
        "Authorization": `Basic ${token}`
      }
    })
  }


  return res
}

async function deleteArticle(article) {
  let res;

  if (typeof localStorage !== "undefined") {
    const token = localStorage.getItem("token")

    const api = axios.create({
      withCredentials: true,
      baseURL: "https://brandon-server.herokuapp.com/api/v1/"
    })

    res = await api.delete(`articles/${article._id}`, {
      headers: {
        "Authorization": `Basic ${token}`
      }
    })
  }


  return res
}

export {updateArticle, getRawArticle, createArticle, getAllRawArticles, deleteArticle}