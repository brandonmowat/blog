import React from "react"
import { Link } from "gatsby"
import "./layout.css"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <div className="header-content header-content--bottom">
          <h1>
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={`/`}
            >
              {title}
            </Link>
          </h1>
        </div>
      )
    } else {
      header = (
        <div className="header-content header-content--top">
          <h3>
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={`/`}
            >
              {title}
            </Link>
          </h3>
        </div>
      )
    }
    return (
      <div>
        <header className="container">{header}</header>
        <main className="container">{children}</main>
        <footer className="container">
          made with craft
        </footer>
      </div>
    )
  }
}

export default Layout
