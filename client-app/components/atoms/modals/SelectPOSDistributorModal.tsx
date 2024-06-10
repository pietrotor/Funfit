import React, { useState } from 'react'
import { MyModal } from './MyModal'
import { SelectWarehouses } from '@/components/molecules/SelectWarehouses'
import { SelectDistributor } from '@/components/molecules/SelectDistributor'
import { TpointOfSaleDistributor } from '@/interfaces/TData'
import { SelectPriceLists } from '@/components/molecules/SelectPriceList'
type SelectWareHouseModalProps = {
  isOpen: boolean
  onClose: () => void
  selectedDistributor: TpointOfSaleDistributor
  setSelectDistributor: (values: TpointOfSaleDistributor) => void
  getProduct: any
}

export const SelectPOSDistributorModal = ({
  isOpen,
  onClose,
  selectedDistributor,
  setSelectDistributor,
  getProduct
}: SelectWareHouseModalProps) => {
  const [step, setStep] = useState<String>('warehouses')
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = () => {
    if (step === 'warehouses') {
      if (selectedDistributor.warehouse) {
        setStep('ditributors')
        setErrorMessage('')
      } else {
        setErrorMessage('Selecciona un almacén')
      }
    }
    if (step === 'ditributors') {
      if (selectedDistributor.distributor) {
        setStep('priceLists')
        setErrorMessage('')
      } else {
        setErrorMessage('Selecciona un distribuidor')
      }
    }
    if (step === 'priceLists') {
      if (selectedDistributor.priceListId) {
        onClose()
        getProduct()
        setErrorMessage('')
      } else {
        setErrorMessage('Selecciona una lista de precios')
      }
    }
  }

  const handleCancel = () => {
    onClose()
  }

  const handleBack = () => {
    if (step === 'ditributors') {
      setStep('warehouses')
    }
    if (step === 'priceLists') {
      setStep('ditributors')
    }
  }

  return (
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton={true}
      isDimissable={false}
      size="3xl"
      isForm={false}
      title={
        step === 'warehouses'
          ? 'Seleccionar almacén'
          : step === 'ditributors'
            ? 'Seleccionar distribuidor'
            : 'Seleccionar lista de precios'
      }
      message={
        step === 'warehouses'
          ? 'Selecciona el almacén para obtener los productos'
          : step === 'ditributors'
            ? 'Selecciona el distribuidor para obtener los productos'
            : 'Selecciona la lista de precios'
      }
      handleCancel={handleCancel}
      handleSubmit={onSubmit}
      color="secondary"
      textBackButton="Atrás"
      textSuccessButton={
        step === 'warehouses' || step === 'ditributors'
          ? 'Siguiente'
          : 'Finalizar'
      }
      handleBack={handleBack}
      successButtonDisabled={step === 'warehouses'}
      backButtonDisabled={step === 'warehouses'}
    >
      {step === 'warehouses' ? (
        <SelectWarehouses
          selectedDistributor={selectedDistributor}
          setSelectDistributor={setSelectDistributor}
        />
      ) : step === 'ditributors' ? (
        <SelectDistributor
          selectedDistributor={selectedDistributor}
          setSelectDistributor={setSelectDistributor}
        />
      ) : step === 'priceLists' ? (
        <SelectPriceLists
          selectedDistributor={selectedDistributor}
          setSelectDistributor={setSelectDistributor}
        />
      ) : null}
      {errorMessage && (
        <div className="text-center text-sm text-red-500">{errorMessage}</div>
      )}
    </MyModal>
  )
}
