export function sortObjectsByKey<T>(array: T[], key: keyof T): T[] {
  return [...array].sort((a, b) => {
    const valueA = String(a[key]).toLowerCase()
    const valueB = String(b[key]).toLowerCase()

    if (valueA < valueB) {
      return -1
    }
    if (valueA > valueB) {
      return 1
    }
    return 0
  })
}
