/*
 * @Author: your name
 * @Date: 2020-01-07 10:08:58
 * @LastEditTime : 2020-01-07 11:40:38
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-gatsby-site\src\utils\typography.js
 */
import Typography from "typography"
import lincoln from 'typography-theme-lincoln'
lincoln.bodyFontFamily = ['Roboto']
lincoln.overrideThemeStyles = () => ({
    'a': {
        backgroundImage: 'none'
    },
})

const typography = new Typography(lincoln)

// Export helper functions
export default typography
