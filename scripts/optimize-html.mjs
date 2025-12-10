import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const htmlPath = resolve('dist/index.html')
let html = readFileSync(htmlPath, 'utf-8')

// Transform CSS to load asynchronously using media="print" trick
// This prevents render-blocking while still loading CSS
html = html.replace(
  /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
  (match, cssPath) => {
    return `<link rel="preload" href="${cssPath}" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="${cssPath}"></noscript>`
  }
)

writeFileSync(htmlPath, html)
console.log('✓ Optimized CSS loading in dist/index.html')
