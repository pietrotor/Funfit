import { CurrentUserQuery } from '@/graphql/graphql-types'

export type ICurrentUser = NonNullable<
  NonNullable<CurrentUserQuery['currentUser']>['data']
>
