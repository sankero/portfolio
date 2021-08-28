const { getPosts } = require('./getPosts')

module.exports = {
  title: 'taga.works',
  description: '',
  customData: {
    workList: getPosts('works'),
  },
  head: [
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }],
    ['link', {
      rel: 'icon', type: 'image/png', href: '/android-touch-icon.png', sizes: '192x192',
    }],
    ['script', { src: 'https://www.googletagmanager.com/gtag/js?id=G-EEGXWE4Z5B', async: true }],
    ['script', {}, 'window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\', \'G-EEGXWE4Z5B\');'],
  ],
}
