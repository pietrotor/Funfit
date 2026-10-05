import { RoleTypeEnum } from '@/graphql/graphql-types'

export const DAILY_SALE_PATH = '/administration-panel/dailySale'

const ADMIN = [RoleTypeEnum.ADMINISTRATOR]
const STAFF = [RoleTypeEnum.ADMINISTRATOR, RoleTypeEnum.SALESMAN]

type PanelRouteRule = {
  match: string
  exact?: boolean
  roles: RoleTypeEnum[]
}

const PANEL_ROUTE_RULES: PanelRouteRule[] = [
  { match: '/administration-panel/sales/distributors', roles: ADMIN },
  { match: '/administration-panel/sales', exact: true, roles: ADMIN },
  { match: '/administration-panel/sales/', roles: STAFF },
  { match: '/administration-panel/pos-distributors', roles: ADMIN },
  { match: '/administration-panel/users', roles: ADMIN },
  { match: '/administration-panel/products', roles: ADMIN },
  { match: '/administration-panel/categories', roles: ADMIN },
  { match: '/administration-panel/dealers', roles: ADMIN },
  { match: '/administration-panel/price-list', roles: ADMIN },
  { match: '/administration-panel/balance', roles: ADMIN },
  { match: '/administration-panel/recipies', roles: ADMIN },
  { match: '/administration-panel/point-of-sale', roles: STAFF },
  { match: '/administration-panel/order', roles: STAFF },
  { match: '/administration-panel/cash', roles: STAFF },
  { match: '/administration-panel/dailySale', roles: STAFF },
  { match: '/administration-panel/bill', roles: STAFF },
  { match: '/administration-panel/branches', roles: STAFF },
  { match: '/administration-panel/warehouses', roles: STAFF }
]

const normalizePath = (path: string) => {
  const withoutQuery = path.split('?')[0]
  if (withoutQuery.length > 1 && withoutQuery.endsWith('/')) {
    return withoutQuery.slice(0, -1)
  }
  return withoutQuery
}

export const canAccessPanelPath = (
  path: string,
  role?: RoleTypeEnum | null
) => {
  if (!role) return false
  const clean = normalizePath(path)

  if (
    clean === '/administration-panel/login' ||
    clean === '/administration-panel'
  ) {
    return true
  }

  const rule = PANEL_ROUTE_RULES.find(item => {
    if (item.exact) {
      return clean === item.match
    }
    if (item.match.endsWith('/')) {
      return clean.startsWith(item.match)
    }
    return clean === item.match || clean.startsWith(`${item.match}/`)
  })

  if (!rule) return role === RoleTypeEnum.ADMINISTRATOR
  return rule.roles.includes(role)
}
