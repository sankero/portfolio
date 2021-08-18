const fs = require('fs')
const path = require('path')
const glob = require('glob')
const matter = require('gray-matter')

exports.getPosts = function getPosts(target = '') {
  const targetDir = './docs/' + target
  const mg = glob.sync('**/*.md', {
    cwd: targetDir
  }).map(f => {
    const src = fs.readFileSync(path.resolve(__dirname, `../../${targetDir}/${f}`), 'utf8')
    const { data, excerpt } = matter(src)
    const href = `/${target}/${f}`
    return {
      data,
      excerpt,
      href: href.slice(0, -3)
    }
  })
  return mg
}
