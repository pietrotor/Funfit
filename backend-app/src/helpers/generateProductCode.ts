export const generateProductCode = (name: string) => {
  let code = name.toLowerCase()
  code = code.replace(/[\s/]+/g, '-')

  return code
}
