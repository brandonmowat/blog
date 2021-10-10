require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  pathPrefix: '/blog',
  siteMetadata: {
    title: 'Matcha & Mochi',
    author: 'Brandon Mowat',
    description: 'a blog written by brandon.',
    siteUrl: 'https://blog.brandonmowat.com',
    social: {
      twitter: 'brandonmowat',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static`,
        name: 'static',
      },
    },
    // {
    //   resolve: "gatsby-transformer-remark",
    //   options: {
    //     plugins: [
    //       {
    //         resolve: "gatsby-remark-responsive-iframe",
    //         options: {
    //           wrapperStyle: "margin-bottom: 1.0725rem",
    //         },
    //       },
    //       "gatsby-remark-prismjs",
    //       "gatsby-remark-copy-linked-files",
    //       "gatsby-remark-smartypants",
    //     ],
    //   },
    // },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-43696740-13',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Brandon\'s Blog',
        short_name: 'Brandon',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#4734f3',
        display: 'minimal-ui',
        icon: 'content/assets/mochi.png',
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
};
