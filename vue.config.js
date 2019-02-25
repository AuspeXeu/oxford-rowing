module.exports = {
  devServer: {
    proxy: {
      '/verify': {
        target: 'http://127.0.0.1:3019',
        changeOrigin: true
      },
      '/bump': {
        target: 'http://127.0.0.1:3019',
        changeOrigin: true
      },
      '/data': {
        target: 'http://127.0.0.1:3019',
        changeOrigin: true
      },
      '/events': {
        target: 'http://127.0.0.1:3019',
        changeOrigin: true
      },
      '/live': {
        target: 'ws://127.0.0.1:3019',
        changeOrigin: true,
        ws: true
      }
    }
  }
}
