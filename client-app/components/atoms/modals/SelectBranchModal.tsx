import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Radio, RadioGroup } from '@nextui-org/react'
import { MyModal } from './MyModal'
import { useAppDispatch, useAppSelector } from '@/store/index'
import { setBranch } from '@/store/slices/branches/branchSlice'
import { CUSTOMER_ID } from '@/lib/constants'
type SelectBranchModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit?: () => void
}

export const SelectBranchModal = ({
  isOpen,
  onClose,
  onSubmit
}: SelectBranchModalProps) => {
  const { branches, currentBranch } = useAppSelector(state => state.branchReducer)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [selected, setSelected] = useState<string>(currentBranch.name)
  const handleChangeBranch = () => {
    const branch = branches.find(branch => branch.name === selected)
    if (branch) {
      dispatch(setBranch(branch))
      localStorage.setItem('branchId', JSON.stringify(branch.id))
    }
    router.reload()
    onClose()
  }
  useEffect(() => {
    setSelected(currentBranch.name)
    console.log('currentBranch', currentBranch)
  }, [currentBranch])

  useEffect(() => {
    const currentBranchId = sessionStorage.getItem(CUSTOMER_ID)?.replace(/^"|"$/g, '')
    console.log(currentBranchId)
  }, [])

  return (
    <MyModal
      isOpen={isOpen}
      size="lg"
      onClose={onClose}
      hideCloseButton={false}
      handleCancel={onClose}
      handleSubmit={handleChangeBranch}
      isForm={false}
      message='Selecciona la sucursal a la que deseas ingresar'
      title='Seleccionar Sucursal'
    >
      <section className=" px-8 mt-3 text-center  ">
        <div>
          <RadioGroup
            value={selected}
            onValueChange={value => setSelected(value)}
          >
            {branches.map(branch => (
              <Radio key={branch.id} value={branch.name}>
                {branch.name}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      </section>
    </MyModal>
  )
}
