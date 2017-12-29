'use strict'

const { titleize, isUrl } = require('@metascraper/helpers')

const REGEX_AMAZON_URL = /https?:\/\/(.*amazon\..*\/.*|.*amzn\..*\/.*|.*a\.co\/.*)/i
const isAmazonUrl = url => REGEX_AMAZON_URL.test(url)

const wrap = rule => ({ htmlDom, url }) => isAmazonUrl(url) && rule(htmlDom)

const wrapUrl = rule => ({ htmlDom, url }) => {
  const value = wrap(rule)({htmlDom, url})
  return isUrl(value) && value
}

module.exports = () => ({
  author: [
    wrap($ => titleize($('.contributorNameID').text())),
    wrap($ => titleize($('#bylineInfo').text())),
    wrap($ => titleize($('#brand').text()))
  ],
  title: [
    wrap($ => titleize($('#productTitle').text())),
    wrap($ => titleize($('#btAsinTitle').text())),
    wrap($ => titleize($('h1.a-size-large').first().text())),
    wrap($ => titleize($('#item_name').text()))
  ],
  publisher: [wrap($ => 'Amazon')],
  image: [
    wrapUrl($ => $('.a-dynamic-image').attr('data-old-hires')),
    wrapUrl($ => $('.a-dynamic-image').attr('src'))
  ]
})
