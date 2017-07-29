'use strict'

const sanitizeHtml = require('sanitize-html')
const {flow} = require('lodash')
const cheerio = require('cheerio')

const sanitize = html => sanitizeHtml(html, {
  allowedTags: false,
  allowedAttributes: false,
  transformTags: {
    meta: (tagName, attribs) => {
      if (attribs.name) attribs.name = attribs.name.toLowerCase()
      return {tagName, attribs}
    },
    a: (tagName, attribs) => {
      if (attribs.href) attribs.href = attribs.href.toLowerCase()
      return {tagName, attribs}
    },
    link: (tagName, attribs) => {
      if (attribs.rel) attribs.rel = attribs.rel.toLowerCase()
      return {tagName, attribs}
    }
  }
})

const load = cheerio.load.bind(cheerio)

module.exports = flow([
  sanitize,
  load
])
