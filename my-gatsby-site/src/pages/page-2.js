/*
 * @Author: your name
 * @Date: 2020-01-07 09:40:51
 * @LastEditTime: 2020-01-07 10:05:25
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \my-gatsby-site\src\pages\page-2.js
 */
import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

const SecondPage = () => (
  <Layout>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
