'use strict'

const { isUrl } = require('@metascraper/helpers')
const { isString } = require('lodash')
const snapshot = require('snap-shot')
const { promisify } = require('util')
const { resolve } = require('path')
const { omit } = require('lodash')
const should = require('should')
const fs = require('fs')

const metascraper = require('metascraper')([
  require('metascraper-media-provider')(),
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-lang')(),
  require('metascraper-logo')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')()
])

const readFile = promisify(fs.readFile)

const { getVideoUrls, isMp4 } = require('metascraper-media-provider')

const output = require('./fixtures/youtube-dl.json')

describe('metascraper-media-provider', () => {
  describe('.getVideoUrls', () => {
    it('filter by mp4', () => {
      const videoUrls = getVideoUrls(output.formats, [isMp4])
      snapshot(videoUrls)
    })
  })
  describe('provider', () => {
    it('vimeo', async () => {
      const html = await readFile(resolve(__dirname, 'fixtures/vimeo.html'))
      const url = 'https://vimeo.com/188175573'
      const metadata = await metascraper({ html, url })
      should(isUrl(metadata.video)).be.true()
      should(isString(metadata.title)).be.true()
      const meta = omit(metadata, ['video', 'title'])
      snapshot(meta)
    })

    it('twitter', async () => {
      const html = await readFile(resolve(__dirname, 'fixtures/twitter.html'))
      const url = 'https://twitter.com/verge/status/957383241714970624'

      const metadata = await metascraper({ html, url })
      should(isUrl(metadata.video)).be.true()
      should(isString(metadata.title)).be.true()
      const meta = omit(metadata, ['video', 'title'])
      snapshot(meta)
    })

    it('facebook', async () => {
      const html = await readFile(resolve(__dirname, 'fixtures/facebook.html'))
      const url = 'https://www.facebook.com/afcajax/videos/1686831701364171'

      const metadata = await metascraper({ html, url })
      should(isUrl(metadata.video)).be.true()
      should(isString(metadata.title)).be.true()
      const meta = omit(metadata, ['video', 'title'])
      snapshot(meta)
    })

    it('youtube', async () => {
      const html = await readFile(resolve(__dirname, 'fixtures/youtube.html'))
      const url = 'https://www.youtube.com/watch?v=hwMkbaS_M_c'

      const metadata = await metascraper({ html, url })
      should(isUrl(metadata.video)).be.true()
      should(isString(metadata.title)).be.true()
      const meta = omit(metadata, ['video', 'title'])
      snapshot(meta)
    })
  })
})
