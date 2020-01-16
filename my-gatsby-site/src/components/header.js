import { Link } from "gatsby"
import React from "react"
import { css } from "@emotion/core"
import menu from '../images/menu.png'

class Header extends React.Component {
  render () {
    const linkgroup = (
      <div
        id="linkgourp"
        css={css`
          display: inline;
          float: right;
        `}
      >
        <Link to='/'>
          <h3
            css={css`
              margin: 0;
              display: inline;
              margin-right: 2rem;
            `}
          >
            Home
          </h3>
        </Link>
        <Link to='/about/'>
          <h3
            css={css`
              margin: 0;
              display: inline;
            `}
          >
            About
          </h3>
        </Link>
      </div>
    )
    const linkdropdown = (
      <img src={menu} alt="" css={css`padding: 5px;border-radius: 50%;margin-bottom:0;`} className="dropdownmenu"/>
    )
    return (
      <header
     style={{
       marginBottom: `1.45rem`,
     }}
   >
     <div
       style={{
         margin: `0 auto`,
         maxWidth: 960,
         padding: `1.45rem 1.0875rem`,
         display: "flex",
         justifyContent: "space-between",
         alignItems: "baseline",
       }}
     >
       <div>
         <Link
           to="/"
           css={css`
             color: black;
           `}
         >
           <h2
             css={css`
               margin: 0;
             `}
           >
            {this.props.siteTitle}
           </h2>
         </Link>
       </div>
          {linkgroup}
          {linkdropdown}
     </div>
   </header>
    )
  }
}

export default Header;