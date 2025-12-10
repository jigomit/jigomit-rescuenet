import { readFileSync, writeFileSync, readdirSync } from 'fs'
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

// Find the Home chunk and add modulepreload for it (critical for LCP)
const assetsDir = resolve('dist/assets')
const files = readdirSync(assetsDir)
const homeChunk = files.find(f => f.startsWith('Home-') && f.endsWith('.js'))
const homeCSS = files.find(f => f.startsWith('Home-') && f.endsWith('.css'))
const scrollAnimChunk = files.find(f => f.startsWith('useScrollAnimation-') && f.endsWith('.js'))

if (homeChunk) {
  // Add modulepreload for Home chunk before </head>
  const preloads = [`<link rel="modulepreload" crossorigin href="/assets/${homeChunk}">`]
  if (scrollAnimChunk) {
    preloads.push(`<link rel="modulepreload" crossorigin href="/assets/${scrollAnimChunk}">`)
  }
  if (homeCSS) {
    preloads.push(`<link rel="preload" href="/assets/${homeCSS}" as="style">`)
  }
  html = html.replace('</head>', preloads.join('') + '</head>')
  console.log(`✓ Added modulepreload for: ${homeChunk}${scrollAnimChunk ? ', ' + scrollAnimChunk : ''}${homeCSS ? ', ' + homeCSS : ''}`)
}

writeFileSync(htmlPath, html)
console.log('✓ Optimized CSS loading in dist/index.html')
