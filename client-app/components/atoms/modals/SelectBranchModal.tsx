import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Radio, RadioGroup } from '@nextui-org/react'
import { MyModal } from './MyModal'
import { useAppDispatch, useAppSelector } from '@/store/index'
import { setBranch } from '@/store/slices/branches/branchSlice'

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
  const handleChangeBranch = (value: string) => {
    const branch = branches.find(branch => branch.name === value)
    if (branch) {
      dispatch(setBranch(branch))
      localStorage.setItem('branchId', JSON.stringify(branch.id))
    }
    router.reload()
    onClose()
  }
  useEffect(() => {
    setSelected(currentBranch.name)
  }, [currentBranch])

  return (
    <MyModal
      isOpen={isOpen}
      size="lg"
      onClose={onClose}
      hideCloseButton={false}
    >
      <section className="rounded-2md border-4 border-primary p-6 text-center  ">
        <h3 className="py-2 text-2xl font-bold text-gray-500">
          Seleccionar Sucursal
        </h3>
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
            <Button
              color="success"
              variant="flat"
              onClick={() => handleChangeBranch(selected)}
            >
              Seleccionar sucursal
            </Button>
          </RadioGroup>
        </div>
      </section>
    </MyModal>
  )
}
