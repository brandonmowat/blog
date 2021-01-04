/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from "axios";
import Img from 'gatsby-image';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';

import '../components/layout.css';

const login = (username, password, e) => {
  e.preventDefault();
  const api = axios.create({
    withCredentials: true,
    baseURL: "https://brandon-server.herokuapp.com/api/v1/"
  })

  const token = `${btoa(`${username}:${password}`)}`

  api.get("articles", {
    headers: {
      "Authorization": `Basic ${token}`
    }
  }).then(res => {
    if (res.status === 200) {
      localStorage.setItem("token", token)
    }    
  })

  // console.log(loginRes.result.status)
}
// wS}zb3u'\.;}k*ZM


const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Layout location="/login" title="Macha & Mochi">
      <form action="submit">

        <input type="username" onChange={e => {setUsername(e.target.value)}}/>
        <input type="password" onChange={e => {setPassword(e.target.value)}}/>

        <button type="submit" onClick={(e) => {login(username, password, e)}}>login</button>

      </form>



      <Bio />
    </Layout>
  );
};


export default Login;

// thumbnail {
//   childImageSharp {
//     fluid(maxWidth: 400) {
//       ...GatsbyImageSharpFluid_noBase64
//     }
//   }
// }
