import React, { useState } from 'react'
import { Image } from '@nextui-org/react'
import { GetServerSideProps } from 'next'
import AdministrationLayout from '@/components/templates/layouts'
import Table from '@/components/organisms/tableNext/Table'
import { useGetProductsQuery } from '@/graphql/graphql-types'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import { authUserHeader } from '@/utils/verificationUser'

const Productos = () => {
  const [variables, setVariables] = useState<PaginationInterfaceState>({
    rows: 5,
    filter: '',
    currentPage: 1
  })
  const [filter, setFilter] = useState<string>('')
  const filterProductDebounced = UseDebouncedValue(filter, 800)

  const { loading, data } = useGetProductsQuery({
    variables: {
      paginationInput: {
        page: variables?.currentPage,
        rows: variables?.rows,
        filter: filterProductDebounced
      }
    },
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setVariables({
        totalPages: data.getProducts?.totalPages || 1,
        rows: data.getProducts?.rows || 5,
        filter: filterProductDebounced,
        currentPage: data.getProducts?.currentPage || 1,
        totalRecords: data.getProducts?.totalRecords || 1
      })
    }
  })

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  return (
    <AdministrationLayout>
      <div className="m-auto mt-16 w-5/6 space-y-10">
        <h2 className="text-center text-4xl font-extrabold text-gray-500 ">
          Historial de stock
        </h2>
        <Table
          tableName="PRODUCTOS"
          isLoading={loading}
          currentPage={variables.currentPage}
          totalItems={variables.totalRecords}
          totalPages={variables.totalPages}
          itemsPerPage={variables.rows}
          enablePagination={true}
          onSearch={value => setFilter(value)}
          onChangeRow={row => handleChangeRow(row)}
          onChangePage={page =>
            setVariables({ ...variables, currentPage: page })
          }
          titles={[
            { name: '#' },
            { name: 'Fecha' },
            { name: 'Cantidad' },
            { name: 'Stock' },
            { name: 'Stock anterior' },
            { name: 'Stock posterior' },
            { name: 'Tipo de movimiento' }
          ]}
          items={(data?.getProducts?.data || []).map((product, idx) => ({
            content: [
              idx + 1,
              <Image alt="image" src={product.image || 'asd'} key={idx} />,
              <div key={idx} className="text-left text-sm">
                {product.name}
              </div>,
              product.suggetedPrice + ' Bs.',
              product.cost + ' Bs.',
              <div key={idx} className="text-left text-sm">
                {product.code}
              </div>,
              <div key={idx} className="text-left text-sm">
                {product.description}
              </div>
            ]
          }))}
        />
      </div>

    </AdministrationLayout>
  )
}

export default Productos

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
