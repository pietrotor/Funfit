import React, { useState } from 'react'
import { MyModal } from './MyModal'
import { SelectWarehouses } from '@/components/molecules/SelectWarehouses'
import { SelectDistributor } from '@/components/molecules/SelectDistributor'
import { TpointOfSaleDistributor } from '@/interfaces/TData'
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
    if (selectedDistributor.distributor || selectedDistributor.warehouse) {
      if (step === 'warehouses') {
        setStep('ditributors')
        setErrorMessage('')
      } else {
        onClose()
        getProduct()
        setErrorMessage('')
      }
    } else {
      setErrorMessage('Selecciona un almacén o distribuidor')
    }
  }

  const handleCancel = () => {
    onClose()
  }

  const handleBack = () => {
    if (step === 'ditributors') {
      setStep('warehouses')
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
            : ''
      }
      message={
        step === 'warehouses'
          ? 'Selecciona el almacén para obtener los productos'
          : step === 'ditributors'
            ? 'Selecciona el distribuidor para obtener los productos'
            : ''
      }
      handleCancel={handleCancel}
      handleSubmit={onSubmit}
      color="secondary"
      textBackButton="Atrás"
      textSuccessButton={step === 'warehouses' ? 'Siguiente' : 'Finalizar'}
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
      ) : null}
      {errorMessage && (
        <div className="text-sm text-center text-red-500">{errorMessage}</div>
      )}
    </MyModal>
  )
}
