import { useEffect } from 'react'
import { optimize } from 'svgo/dist/svgo.browser.js'
import tip from './tip.svg?raw'
import { useRef } from 'react'

const { data } = optimize(tip, {
  js2svg: {
    indent: 2,
    pretty: true,
  },
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    {
      name: 'removeAttributesBySelector',
      params: {
        selectors: [
          {
            selector: '[fill=none]',
            attributes: ['fill'],
          },
        ],
      },
    },
    'cleanupListOfValues',
    'cleanupNumericValues',
    'collapseGroups',
    'convertColors',
    'convertEllipseToCircle',
    'convertOneStopGradients',
    'convertPathData',
    'convertShapeToPath',
    'convertStyleToAttrs',
    'convertTransform',
    'inlineStyles',
    'mergePaths',
    'mergeStyles',
    'minifyStyles',
    'removeComments',
    'removeDesc',
    'removeDoctype',
    'removeEditorsNSData',
    'removeEmptyAttrs',
    'removeEmptyContainers',
    'removeEmptyText',
    'removeHiddenElems',
    'removeMetadata',
    'removeNonInheritableGroupAttrs',
    'removeOffCanvasPaths',
    'removeScriptElement',
    'removeStyleElement',
    'removeTitle',
    'removeUnknownsAndDefaults',
    'removeUnusedNS',
    'removeUselessDefs',
    'removeUselessStrokeAndFill',
    'removeXMLProcInst',
    'removeXMLNS',
    'sortDefsChildren',
    'sortAttrs',
    'removeXlink',
    'removeXMLProcInst',
    'sortAttrs',
    'sortDefsChildren',
  ],
})

const App = () => {
  useEffect(() => {
    ref.current.innerHTML = data
  }, [])

  const ref = useRef(null)

  return <>
    <div ref={ref}></div>
    {data}
  </>
}

export default App
