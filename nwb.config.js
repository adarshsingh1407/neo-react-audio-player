module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'neo-react-audio-player',
      externals: {
        'react': 'React',
        'react-redux': 'ReactRedux',
        'redux': 'redux'
      }
    }
  }
}
