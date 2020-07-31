import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

import "../components/layout.css"
import "./pages.css"

class BlogIndex extends React.Component {
  render() {
    const { pageContext } = this.props
    const { articles } = pageContext

    articles.sort((a, b) => new Date(a.created) < new Date(b.created))

    // const siteTitle = data.site.siteMetadata.title;
    // const posts = data.allMarkdownRemark.edges;

    console.log(articles)

    return (
      <Layout location="/" title="Macha & Mochi">
        {/* <SEO
          title="All posts"
          keywords={["blog", "gatsby", "javascript", "react"]}
        /> */}
        <Bio />
        {articles.map(article => {
          // omit post if labeled a draft in production
          if (
            !(process.env.NODE_ENV === "development") &&
            !article.isPublished
          ) {
            return
          }

          return (
            <Link className="Post" to={`article/${article.id}`}>
              <h3 style={{}}>{article.title}</h3>
              <h5>{article.description}</h5>
              <div className="Post__date">
                {new Date(article.created).toDateString()}
              </div>
              {/* {thumbnail && (
                <Img
                  imgStyle={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    height: 'auto',
                    width: 'auto',
                  }}
                  style={{ height: 400, width: imageWidth, margin: 'auto' }}
                  fluid={node.frontmatter.thumbnail.childImageSharp.fluid}
                  alt=""
                />
              )} */}
            </Link>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

// thumbnail {
//   childImageSharp {
//     fluid(maxWidth: 400) {
//       ...GatsbyImageSharpFluid_noBase64
//     }
//   }
// }
