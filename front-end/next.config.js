const minify = {
  swcMinify: true,
};

const final = {
  minify,

  images: {
    domains: ['geekspot.azurewebsites.net'],
  }
};

module.exports = final;