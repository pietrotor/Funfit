import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Radio, RadioGroup, Spinner } from '@nextui-org/react'
import { MyModal } from './MyModal'
import { TDataBranch } from '@/interfaces/TData'

type SelectBranchModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit?: () => void
  data: TDataBranch[]
  loading: boolean
}

export const SelectBranchProductsModal = ({
  isOpen,
  onClose,
  onSubmit,
  data,
  loading
}: SelectBranchModalProps) => {
  const router = useRouter()
  const [selected, setSelected] = useState<TDataBranch>()
  const [errorMessage, setErrorMessage] = useState<string>()

  const handleSelected = (value: string) => {
    setSelected(data.find(branch => branch.id === value))
  }

  const handleChangeBranch = () => {
    if (selected) {
      sessionStorage.setItem('branchId', JSON.stringify(selected.id))
      router.reload()
      onClose()
    } else {
      setErrorMessage('Por favor seleccionar una sucursal')
    }
  }

  useEffect(() => {
    const currentBranchId = sessionStorage
      .getItem('branchId')
      ?.replace(/^"|"$/g, '')
    setSelected(currentBranchId ? data?.find(branch => branch?.id === currentBranchId) : undefined)
  }, [])

  return (
    <MyModal
      isOpen={isOpen}
      size="lg"
      color="warning"
      onClose={onClose}
      hideCloseButton={true}
      handleCancel={onClose}
      handleSubmit={handleChangeBranch}
      isForm={false}
      message="Selecciona la sucursal a la que deseas ingresar"
      title="Seleccionar Sucursal"
      isDimissable={false}
      hideCancelButton={false}
      errorMessage={errorMessage}
    >
      <section className=" mt-3 px-8 text-center  ">
        <div>
          {loading ? (
            <Spinner label="Cargando..." color="warning" />
          ) : (
            <RadioGroup
              onValueChange={value => handleSelected(value)}
              value={selected?.id}
            >
              {(data || []).map(branch => (
                <Radio key={branch.id} value={branch.id}>
                  {branch.name}
                </Radio>
              ))}
            </RadioGroup>
          )}
        </div>
      </section>
    </MyModal>
  )
}
