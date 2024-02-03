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
  const [selected, setSelected] = useState<string>()

  const handleChangeBranch = () => {
    sessionStorage.setItem('branchId', JSON.stringify(selected))
    router.reload()
    onClose()
  }

  useEffect(() => {
    const currentBranchId = sessionStorage.getItem('branchId')?.replace(/^"|"$/g, '')
    setSelected(currentBranchId)
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
    >
      <section className=" mt-3 px-8 text-center  ">
        <div>
          {loading ? (
            <Spinner label="Cargando..." color="warning" />
          ) : (
            <RadioGroup
              onValueChange={value => setSelected(value)}
              value={selected}
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
