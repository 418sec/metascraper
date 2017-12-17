'use strict'

const condenseWhitespace = require('condense-whitespace')
const { isString, flow } = require('lodash')
const smartquotes = require('smartquotes')

const sanetize = flow([condenseWhitespace, smartquotes])

const wrap = rule => ({ htmlDom }) => {
  const value = rule(htmlDom)

  if (!isString(value)) return
  return sanetize(value)
}

module.exports = () => ({
  title: [
    wrap($ => $('meta[property="og:title"]').attr('content')),
    wrap($ => $('meta[name="twitter:title"]').attr('content')),
    wrap($ => $('meta[name="sailthru.title"]').attr('content')),
    wrap($ => $('.post-title').text()),
    wrap($ => $('.entry-title').text()),
    wrap($ =>
      $('[itemtype="http://schema.org/BlogPosting"] [itemprop="name"]').text()
    ),
    wrap($ => $('h1[class*="title"] a').text()),
    wrap($ => $('h1[class*="title"]').text()),
    wrap($ => $('title').text())
  ]
})
