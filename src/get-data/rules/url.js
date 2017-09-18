'use strict'

const {isString} = require('lodash')
const {getUrl} = require('../util')

/**
 * Wrap a rule with validation and formatting logic.
 *
 * @param {Function} rule
 * @return {Function} wrapped
 */

const wrap = rule => (htmlDom, url) => {
  const value = rule(htmlDom)
  if (!isString(value)) return
  return getUrl(value)
}

/**
 * Rules.
 */

module.exports = [
  wrap($ => $('meta[property="og:url"]').attr('content')),
  wrap($ => $('meta[name="twitter:url"]').attr('content')),
  wrap($ => $('link[rel="canonical"]').attr('href')),
  wrap($ => $('link[rel="alternate"][hreflang="x-default"]').attr('href')),
  ($, url) => isString(url) ? url : null
]
