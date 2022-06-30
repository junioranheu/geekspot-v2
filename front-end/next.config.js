const minify = {
  swcMinify: true,
};

const final = {
  minify,

  images: {
    domains: ['geekspot.azurewebsites.net', 'photos.enjoei.com.br'],
  }
};

module.exports = final;