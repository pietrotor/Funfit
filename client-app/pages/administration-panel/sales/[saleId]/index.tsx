import { useRouter } from 'next/router'
import 'react-circular-progressbar/dist/styles.css'

import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import Table from '@/components/organisms/tableNext/Table'
import InformationCard from '@/components/molecules/Card/InformationCard'
import Images from '@/components/atoms/Image/Image'
import useCustomGetSaleById from '@/services/UseGetCustomSaleById'

function SaleDetail() {
  const router = useRouter()
  const { data } = useCustomGetSaleById(router.query.saleId as string)
  return (
    <AdministrationLayout showBackButton={true}>
      <div className="m-auto mt-16 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Detalle de venta
        </h3>
        <section className="my-4 mb-12  grid gap-3 pt-6 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Total:</div>
                <div className="text-center">{data?.getSaleById?.data?.total} Bs</div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="Coins"
                  className=" rounded-md text-white"
                  height="h-6"
                  width="w-6"
                />
              </span>
            </div>
          </InformationCard>
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Codigo de venta:</div>
                <div className="text-center">{data?.getSaleById?.data?.code}</div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="QrCode"
                  className=" rounded-md text-white"
                  height="h-6"
                  width="w-6"
                />
              </span>
            </div>
          </InformationCard>
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Sucursal</div>
                <div className="text-center">{}</div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="Branch"
                  className=" rounded-md text-white"
                  height="h-6"
                  width="w-6"
                />
              </span>
            </div>
          </InformationCard>
        </section>
        <Table
          titles={[
            { name: '#' },
            { name: 'Imagen' },
            { name: 'Nombre del producto' },
            { name: 'Código' },
            { name: 'Unidades' },
            { name: 'Total' }
          ]}
          items={(data?.getSaleById?.data?.products || []).map((sale, idx) => ({
            content: [
              <h3 key={idx} className="text-sm">
                {idx + 1}
              </h3>,
              <div key={idx} className=" flex justify-center ">
                <Images
                  alt="imagen"
                  src={sale.product?.image || 'https://picsum.photos/200/300'}
                  className="h-20 w-20 rounded-md"
                />
              </div>,
              <div key={idx} className="">
                {sale.product?.name}
              </div>,
              <div key={idx} className="flex justify-center space-x-3">
                {sale.product?.code}
              </div>,
              <div key={idx} className="flex justify-center space-x-3">
                {sale.qty}
              </div>,
              <div key={idx} className="flex justify-center space-x-3">
                {sale.total}
              </div>
            ]
          }))}
          tableName="VENTA"
          enablePagination={false}
        />
      </div>
    </AdministrationLayout>
  )
}
export default SaleDetail
