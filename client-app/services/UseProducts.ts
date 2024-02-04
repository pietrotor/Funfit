// import { useEffect, useState } from 'react'
// import { showSuccessToast } from '@/components/atoms/Toast/toasts'
// import { StatusEnum, useGetPublicProductsQuery } from '@/graphql/graphql-types'

// const useCustomPublicProductsQuery = () => {
//   const [variables, setVariables] = useState({
//     filter: '',
//     page: 1,
//     rows: 10
//   })

//   const { data, loading, refetch } = useGetPublicProductsQuery({
//     fetchPolicy: 'network-only',
//     variables: {
//       paginationInput: {
//         filter: variables.filter,
//         page: variables.page,
//         rows: variables.rows
//       }
//     },
//     onCompleted: (result) => {
//       if (result.getPublicProducts?.status === StatusEnum.ERROR) {
//         showSuccessToast(
//           result.getPublicProducts?.message || 'Error al cargar los productos',
//           'error'
//         )
//       }
//     }
//   })

//   // Use useEffect to handle changes in variables
//   useEffect(() => {
//     refetch({
//       paginationInput: {
//         filter: variables.filter,
//         page: variables.page,
//         rows: variables.rows
//       }
//     })
//   }, [variables, refetch])

//   return {
//     data,
//     loading,
//     refetch,
//     variables,
//     setVariables
//   }
// }

// export default useCustomPublicProductsQuery
