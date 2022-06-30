const minify = {
  swcMinify: true,
};

const final = {
  minify,

  images: {
    domains: ['geekspot.azurewebsites.net', 'photos.enjoei.com.br', 'cdn.discordapp.com'],
  }
};

module.exports = final;