module.exports = function override(config, env) {
  config.resolve = config.resolve || {}
  config.resolve.fallback = config.resolve.fallback || {}
  config.resolve.fallback["path"] = require.resolve("path-browserify")
  config.resolve.fallback["crypto"] = require.resolve("crypto-browserify")
  config.resolve.fallback["buffer"] = require.resolve("buffer/")
  config.resolve.fallback["stream"] = require.resolve("stream-browserify")
  config.resolve.fallback["fs"] = false
  return config
}
