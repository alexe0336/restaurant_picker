const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      const env = process.env
      args[0]['process.env'] = Object.keys(env).reduce((acc, key) => {
        acc[key] = JSON.stringify(env[key])
        return acc
      }, {})
      return args
    })
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
})