export function getCategoryName(name: string) {
  return name.split('..')?.[1]?.trim() || name
}
