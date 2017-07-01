'use strict'

const chrono = require('chrono-node')
const isIso = require('isostring')

/**
 * Wrap a rule with validation and formatting logic.
 *
 * @param {Function} rule
 * @return {Function} wrapped
 */

const wrap = rule => $ => {
  let value = rule($)
  if (!value) return

  // remove whitespace for easier parsing
  value = value.trim()

  // convert isodates to restringify, because sometimes they are truncated
  if (isIso(value)) return new Date(value).toISOString()

  // try to parse with the built-in date parser
  const native = new Date(value)
  if (!isNaN(native.getTime())) return native.toISOString()

  // try to parse a complex date string
  const parsed = chrono.parseDate(value)
  if (parsed) return parsed.toISOString()
}

/**
 * Rules.
 */

module.exports = [
  wrap($ => $('meta[property="article:published_time"]').attr('content')),
  wrap($ => $('meta[name="dc.date"]').attr('content')),
  wrap($ => $('meta[name="dc.date.issued"]').attr('content')),
  wrap($ => $('meta[name="dc.date.created"]').attr('content')),
  wrap($ => $('meta[name="date"]').attr('content')),
  wrap($ => $('meta[name="dcterms.date"]').attr('content')),
  wrap($ => $('[itemprop="datePublished"]').attr('content')),
  wrap($ => $('time[itemprop*="pubdate"]').attr('datetime')),
  wrap($ => $('[property*="dc:date"]').attr('content')),
  wrap($ => $('[property*="dc:created"]').attr('content')),
  wrap($ => $('time[datetime][pubdate]').attr('datetime')),
  wrap($ => $('meta[name="sailthru.date"]').attr('content')),
  wrap($ => $('meta[property="book:release_date"]').attr('content')),
  wrap($ => $('time[datetime]').attr('datetime')),
  wrap($ => $('[class*="byline"]').text()),
  wrap($ => $('[class*="dateline"]').text()),
  wrap($ => $('[class*="date"]').text()),
  wrap($ => $('[id*="date"]').text()),
  wrap($ => $('[class*="post-meta"]').text())
]
