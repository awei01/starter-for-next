module.exports = function (configs, options) {
  const nodeEnv = process.env.NODE_ENV || 'development'

  // add our alias to reduce ../../../ craziness
  configs.resolve.alias['~'] = options.dir

  if (nodeEnv === 'development') {
    // add eslint for development only,
    // weird error happening on zeit deploys - cannot build
    // TypeError: Cannot read property 'range' of null
    configs.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        emitWarning: options.dev
      }
    })
  }
  return configs
}
