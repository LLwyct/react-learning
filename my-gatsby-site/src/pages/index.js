import React, { Fragment } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { css } from '@emotion/core'
import './index.css'

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <h5 className="totalcount" style={{ textAlign: "center", color: "grey" }}>
        Now, I have {data.allMarkdownRemark.totalCount} posts
      </h5>
      <div className="postlist">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <Fragment key={node.id}>
            <div className="post">
              <h2
                css={css`
                  margin: 0;
                `}
                className="titleinfo"
              >
                <div css={css`margin-bottom: 10px;`}>
                  <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                </div>
                <div
                  css={css`
                    transform: scale(0.7);
                    transform-origin: 100% 100%;
                  `}
                >
                  {node.frontmatter.date}
                </div>
              </h2>
              <section
                css={css`
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                `}
              >
                {node.excerpt}
              </section>
            </div>
            <section className="post-divider"></section>
          </Fragment>
        ))}
      </div>
    </Layout>
  )
}

export const data = graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        totalCount
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "Y MM-DD")
            }
            excerpt
            fields {
              slug
            }
          }
        }
      }
    }
`

export default IndexPage
