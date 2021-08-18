const { getPosts } = require('./getPosts')

module.exports = {
  title: 'taga',
  description: '',
  customData: {
    workList: getPosts('works')
  },
  head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Kanit:wght@500&display=swap' }],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }],
  ]
}
