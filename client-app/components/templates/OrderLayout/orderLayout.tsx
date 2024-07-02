import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Stepper, { Step } from '@/components/molecules/Stepper/stepper'
import RegisterForm from '@/components/molecules/RegisterForm/registerForm'
import SendOrder from '@/components/molecules/SendOreder/sendOrder'
import PaymentMethod from '@/components/molecules/PaymentMethod/paymentMethod'
import SideCart from '@/components/molecules/SideCart/sideCart'
import {
  useCustomPublicCreateAddress,
  useCustomPublicCreateCurstomer
} from '@/hooks/UseCustomerQuery'
import { CUSTOMER_ID } from '@/lib/constants'
import {
  DeliveryMethodEnum,
  PaymentMethodEnum,
  useGetPublicCustomerByIdLazyQuery,
  useGetPublicProductsLazyQuery
} from '@/graphql/graphql-types'
import { TCustomer, TOrder, TProductBranchData } from '@/interfaces/TData'
import { useAppSelector } from '@/store/index'
import { clearCart } from '@/store/slices'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { useCustomPublicCreateOrder } from '@/hooks/UseOrderQuery'

export type TUserInfo = {
  name: string
  lastName: string
  email: string
  phone: string
}

export type TDetails = {
  pickUpInformation: string
  orderDetails: string
}

function OrderLayout() {
  const steps: Step[] = [
    {
      label: 'Datos de contacto',
      isActive: 'active'
    },
    {
      label: 'Envío',
      isActive: 'inactive'
    },
    {
      label: 'Método de pago',
      isActive: 'inactive'
    }
  ]
  const customerId = localStorage.getItem(CUSTOMER_ID)?.replace(/^"|"$/g, '')
  const storedBranch = sessionStorage.getItem('branchId')?.replace(/^"|"$/g, '')
  const cartItems = useAppSelector(state => state.cartReducer.cartItems)
  const subTotal = useAppSelector(state => state.cartReducer.cartSubTotal)
  const branch = useAppSelector(state => state.ecommerceInformationReducer.name)
  const router = useRouter()
  const dispatch = useDispatch()

  const [currentStep, setCurrentStep] = useState<Step[]>(steps)
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)
  const [order, setOrder] = useState<TOrder | undefined>()
  const [selectedOption, setSelectedOption] = useState('')
  const [paymentMethod, setPaymentMethod] = useState(false)
  const [publicProducts, setPublicProducts] = useState<TProductBranchData[]>()
  const [details, setDetails] = useState<TDetails>({
    pickUpInformation: '',
    orderDetails: ''
  })
  const [activeDirection, setActiveDirection] = useState({
    location: {
      lat: -17.414,
      lng: -66.1653
    },
    address: ''
  })

  const { control, handleSubmit, watch, setValue, reset } = useForm()
  const { handleCreatePublicCustomer } = useCustomPublicCreateCurstomer()
  const { handleCreatePublicAddress, addressId } =
    useCustomPublicCreateAddress()

  const [getCustomer, { data }] = useGetPublicCustomerByIdLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      getPublicCustomerByIdId: customerId
    },
    onCompleted: data => {
      setValue('name', data?.getPublicCustomerById?.data?.name)
      setValue('lastName', data?.getPublicCustomerById?.data?.lastName)
      setValue('email', data?.getPublicCustomerById?.data?.email)
      setValue('phone', data?.getPublicCustomerById?.data?.phone)
    },
    onError: error => {
      console.log(error)
    }
  })

  const { handleCreateOrder } = useCustomPublicCreateOrder()
  const [getBranchProduct] = useGetPublicProductsLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      branchId: storedBranch
    },
    onCompleted: data => {
      setPublicProducts(
        (data.getPublicProducts?.data || []).reduce(
          (prevValue: any, category: any) => [
            ...prevValue,
            ...category.products
          ],
          []
        ) as any
      )
    },
    onError: () => {
      showSuccessToast('Error al obtener los productos', 'error')
    }
  })

  useEffect(() => {
    if (customerId) {
      getCustomer()
    }
    getBranchProduct()
  }, [])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [currentStepIndex])

  const goToStep = (stepIndex: number) => {
    const updatedSteps = [...currentStep]

    updatedSteps.forEach((step, index) => {
      if (index === stepIndex) {
        step.isActive = 'active'
      } else if (index < stepIndex) {
        step.isActive = 'completed'
      } else {
        step.isActive = 'inactive'
      }
    })

    setCurrentStep(updatedSteps)
    setCurrentStepIndex(stepIndex)
  }

  const onSubmit = () => {
    if (storedBranch) {
      if (currentStepIndex === 0) {
        handleCreatePublicCustomer(
          {
            name: watch('name'),
            lastName: watch('lastName'),
            email: watch('email'),
            phone: watch('phone')
          },
          () => goToStep(currentStepIndex + 1)
        )
      } else if (currentStepIndex === 1) {
        if (selectedOption === 'DELIVERY') {
          handleCreatePublicAddress(
            {
              customerId: customerId as string,
              detail: watch('address'),
              longitude: activeDirection.location.lng,
              latitude: activeDirection.location.lat
            },
            () => {
              goToStep(currentStepIndex + 1)
            }
          )
          return
        }
        goToStep(currentStepIndex + 1)
      } else if (currentStepIndex === 2) {
        if (selectedOption === 'PICKUP') {
          handleCreateOrder(
            {
              branchId: storedBranch,
              customerId: customerId as string,
              discount: 0,
              deliveryMethod: DeliveryMethodEnum.PICKUP,
              paymentMethod: paymentMethod
                ? PaymentMethodEnum.QR_TRANSFER
                : PaymentMethodEnum.CASH,
              products: cartItems.map(item => ({
                branchProductId: item.id,
                price: item.price / item.quantity,
                productId: publicProducts?.find(
                  product => product.id === item.id
                )?.product?.id as string,
                qty: item.quantity,
                total: item.price
              })),
              subTotal,
              total: subTotal
            },
            () => handleNotification()
          )
        } else if (selectedOption !== 'DELIVERY') {
          handleCreateOrder(
            {
              branchId: storedBranch,
              addressId: order?.addressId,
              paymentMethod: paymentMethod
                ? PaymentMethodEnum.QR_TRANSFER
                : PaymentMethodEnum.CASH,
              deliveryMethod: DeliveryMethodEnum.DELIVERY,
              orderDetails: watch('orderDetails'),
              pickUpInformation: watch('pickUpInformation'),
              products: cartItems.map(item => ({
                branchProductId: item.id,
                price: item.price / item.quantity,
                productId: publicProducts?.find(
                  product => product.id === item.id
                )?.product?.id as string,
                qty: item.quantity,
                total: item.price
              })),
              subTotal,
              total: subTotal,
              customerId: customerId as string,
              discount: 0
            },
            () => handleNotification()
          )
        } else {
          handleCreateOrder(
            {
              addressId,
              branchId: storedBranch,
              paymentMethod: paymentMethod
                ? PaymentMethodEnum.QR_TRANSFER
                : PaymentMethodEnum.CASH,
              deliveryMethod: DeliveryMethodEnum.DELIVERY,
              orderDetails: watch('orderDetails'),
              pickUpInformation: watch('pickUpInformation'),
              products: cartItems.map(item => ({
                branchProductId: item.id,
                price: item.price / item.quantity,
                productId: publicProducts?.find(
                  product => product.id === item.id
                )?.product?.id as string,
                qty: item.quantity,
                total: item.price
              })),
              subTotal,
              total: subTotal,
              customerId: customerId as string,
              discount: 0
            },
            () => handleNotification()
          )
        }
        reset()
        clearCart()
        setOrder(undefined)
        setCurrentStepIndex(0)
        setSelectedOption('')
        setPaymentMethod(false)
        setPublicProducts([])
        setActiveDirection({
          location: {
            lat: -17.414,
            lng: -66.1653
          },
          address: ''
        })
      }
    }
  }

  const handleNotification = () => {
    dispatch(clearCart())
    const message = `El pedido consta de:\n${cartItems
      .map(
        item =>
          ` ${item.quantity} unidades de ${item.productName} a ${
            item.price
          } Bs. con un total de ${item.price * item.quantity}`
      )
      .join(
        '\n'
      )}\n\nSubtotal: ${subTotal} Bs.\n\nInformación de contacto:\n* Cliente: ${data
      ?.getPublicCustomerById?.data?.name} ${data?.getPublicCustomerById?.data
      ?.lastName}\n* Teléfono: ${data?.getPublicCustomerById?.data
      ?.phone}\n* Correo: ${data?.getPublicCustomerById?.data?.email}\n ${
      order?.deliveryMethod === DeliveryMethodEnum.PICKUP
        ? `\nTipo de entrega: 'Recojo en Sucursal'\n Sucursal: ${branch}\nDetalle del Recojo: ${details.pickUpInformation}`
        : `\nUbicación: \n https://maps.google.com/?q=${activeDirection.location.lat},${activeDirection.location.lng} \n Detalles: \n ${details.pickUpInformation}`
    } `

    const whatsappLink = `https://api.whatsapp.com/send?phone=73774486&text=${encodeURIComponent(
      message
    )}`
    window.open(whatsappLink, '_blank')
    router.push('/gratitudePage')
  }

  return (
    <form
      className="mx-0 mt-3 flex min-h-screen items-center justify-between space-x-4 md:mt-0 md:px-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col  shadow-2xl lg:w-2/3">
        <div className="h-24 rounded-md bg-white shadow-lg">
          <Stepper steps={currentStep} />
        </div>
        <div className="rounded-md border bg-white shadow-lg md:h-[50vh]">
          {currentStep[0].isActive === 'active' ? (
            <RegisterForm control={control} />
          ) : currentStep[1].isActive === 'active' ? (
            <SendOrder
              activeDirection={activeDirection.location}
              changeDirection={value => setActiveDirection(value)}
              customer={data?.getPublicCustomerById?.data as TCustomer}
              control={control}
              watch={watch}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              order={order as TOrder}
              setOrder={setOrder}
              details={details}
              setDetails={setDetails}
            />
          ) : (
            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              isDelivery={selectedOption === 'DELIVERY'}
            />
          )}
        </div>
        <div className="flex items-center justify-around  bg-white py-7">
          <Button
            onClick={() => goToStep(currentStepIndex - 1)}
            color="primary"
            className="w-1/4"
          >
            Atrás
          </Button>
          <Button color="primary" className="w-1/4" type="submit">
            Siguiente
          </Button>
        </div>
      </div>
      <div className="hidden flex-col justify-start shadow-2xl md:w-1/3 lg:flex">
        <div className="flex h-24 items-center justify-center border-b-2 bg-white shadow-md ">
          <h3 className="text-gray-500">Tus compras</h3>
        </div>
        <div className=" max-h-96  overflow-y-auto scrollbar-hide">
          <SideCart
            control={control}
            details={details}
            setDetails={setDetails}
          />
        </div>
      </div>
    </form>
  )
}

export default OrderLayout
