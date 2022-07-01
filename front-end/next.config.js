const minify = {
  swcMinify: true,
};

const final = {
  minify,

  images: {
    domains: ['geekspotapi.azurewebsites.net'],
  }
};

module.exports = final;