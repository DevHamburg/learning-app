export const imports = {
  'src/components/Card.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-card" */ 'src/components/Card.mdx'),
}
