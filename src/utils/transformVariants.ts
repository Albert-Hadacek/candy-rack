const transformVariants = (variants: string[]) =>
  variants.map((v) => ({
    value: v,
    label: v[0].toUpperCase().concat(v.substring(1)),
  }))

  export default transformVariants