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
        theme_color: '#3e652f',
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
    {
        resolve: 'gatsby-plugin-mailchimp',
        options: {
            endpoint: 'https://brandonmowat.us14.list-manage.com/subscribe/post?u=e08b91b13d289ecf8346df79b&amp;id=2aa380a984', // string; add your MC list endpoint here; see instructions below
            timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
        },
    },
  ],
};
