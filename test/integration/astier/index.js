'use strict'

const snapshot = require('snap-shot')
const { promisify } = require('util')
const { resolve } = require('path')

const fs = require('fs')

const getMetaData = require('../../..')
const readFile = promisify(fs.readFile)

const url = 'https://anisse.astier.eu/awk-driven-iot.html'

it('astier', async () => {
  const html = await readFile(resolve(__dirname, 'input.html'))
  const metadata = await getMetaData({ html, url })
  snapshot(metadata)
})
