const { getPosts } = require('./getPosts')

module.exports = {
  title: 'taga',
  description: '',
  customData: {
    workList: getPosts('works')
  }
}
