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
    const { data } = this.props
        const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        {posts.map(({ node }) => {

          // omit post if labeled a draft in production
          if (
            !(process.env.NODE_ENV === "development") &&
            node.frontmatter.isDraft) return;

          const thumbnail = node.frontmatter.thumbnail
          const imageWidth = thumbnail && thumbnail.childImageSharp.fluid.aspectRatio * 400;
          const title = node.frontmatter.title || node.fields.slug
          return (
            <Link className="Post" to={node.fields.slug}>
              <h3
                style={{
                }}
              >
                {title}
              </h3>
              <div className="Post__date">{node.frontmatter.date}</div>
              {thumbnail && <Img
                imgStyle={{maxHeight: "100%", maxWidth: "100%", height: "auto", width: "auto"}}
                style={{height: 400, width: imageWidth, margin: 'auto'}}
                fluid={node.frontmatter.thumbnail.childImageSharp.fluid} alt="" />}
            </Link>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            thumbnail {
              childImageSharp{
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            tags
            isDraft
          }
        }
      }
    }
  }
`
