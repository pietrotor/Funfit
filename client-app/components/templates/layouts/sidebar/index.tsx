// import Link from 'next/link'
import { useDisclosure } from '@nextui-org/react'
import React from 'react'
import Image from 'next/image'
import MenuLink from './MenuLink'
import SubMenu from './SubMenu'
import IconSelector, { TSvgNames } from '@/components/atoms/IconSelector'
import { ICurrentUser } from '@/interfaces/currentUser.interface'
import { SelectBranchModal } from '@/components/atoms/modals/SelectBranchModal'
import { useGetBranchesPaginatedLazyQuery } from '@/graphql/graphql-types'
import { useAppDispatch, useAppSelector } from '@/store/index'
import { setBranch, setBranches } from '@/store/slices/branches/branchSlice'

export type TMenuStructure = {
  text: string
  link?: string
  icon: TSvgNames
  onClick?: () => void
  subMenu?: {
    text: string
    link?: string
    icon: TSvgNames
  }[]
}[]

type TSidebarProps = {
  setSidebar: (visible: boolean) => void
  onSubmit?: () => void
  isSidebarOpen: boolean
  menu: TMenuStructure
  user: ICurrentUser
  onClick?: () => void
}

const Sidebar: React.FC<TSidebarProps> = ({
  onSubmit,
  setSidebar,
  isSidebarOpen,
  menu,
  onClick,
  user
}) => {
  const handleChangeBranch = useDisclosure()
  const dispatch = useAppDispatch()
  const currentBranch = useAppSelector(
    state => state.branchReducer.currentBranch
  )
  const [getBranch] = useGetBranchesPaginatedLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {}
    },
    onCompleted(data) {
      if (!data.getBranchesPaginated?.data) {
        getBranch()
        return
      }
      dispatch(setBranches(data.getBranchesPaginated?.data))
      data.getBranchesPaginated?.data.forEach(branch => {
        if (branch.id === currentBranch?.id) {
          dispatch(setBranch(branch))
        }
      })
    },
    onError(error) {
      console.log('🚀 ~ file: index.tsx:31 ~ onError ~ error:', error)
    }
  })

  return (
    <div className={`${isSidebarOpen ? 'relative w-60' : 'md:w-16'}`}>
      {/* backdrop (mobile) */}
      <div
        onClick={() => setSidebar(false)}
        className={`fixed inset-0 z-50 bg-white  bg-opacity-50 transition-opacity duration-200 lg:z-auto lg:hidden ${
          isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      ></div>
      <div
        className={`fixed left-0 top-0 z-50 flex h-screen max-h-screen text-white transition-all duration-700 ${
          isSidebarOpen
            ? 'w-80 -translate-x-20'
            : 'w-16 -translate-x-20 md:-translate-x-0 xl:w-[70px]'
        }`}
      >
        {/* Simple sidebar */}
        <div
          className={`flex h-full w-24 min-w-[64px] flex-col justify-between bg-red-600 bg-secondary/20 shadow-2xl  ${
            !isSidebarOpen ? 'rounded-br-2xl rounded-tr-2xl' : ''
          }`}
        >
          <div>
            <Image
              alt="100"
              width={50}
              height={20}
              src="/../../common/logo (1).png"
              className="m-auto mb-4 mt-20 h-16 w-16 transform cursor-pointer rounded-full object-contain px-1 transition-transform duration-300 hover:scale-110"
            />
            <div>
              {menu.map((menuItem, idx) => {
                return !menuItem.subMenu ? (
                  <MenuLink
                    onClick={onClick}
                    detailView={false}
                    isSidebarOpen={isSidebarOpen}
                    text={menuItem.text}
                    icon={menuItem.icon}
                    link={menuItem.link}
                  />
                ) : (
                  <div onClick={() => setSidebar(true)}>
                    <SubMenu
                      detailView={false}
                      isSidebarOpen={isSidebarOpen}
                      text={menuItem.text}
                      icon={menuItem.icon}
                      subMenu={menuItem.subMenu}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <div className=" flex w-full justify-center bg-secondary pt-5  text-white">
              <IconSelector name="Store" width="w-6" height="h-6" />
            </div>
            <div className="flex w-full justify-center bg-secondary py-5  text-white">
              <IconSelector name="user" width="w-8" height="h-8" />
            </div>
          </div>
        </div>
        {/* Detail sidebar */}
        <div
          className={`z-50 flex h-full flex-col justify-between overflow-hidden bg-white shadow-2xl transition-all duration-300 ${
            isSidebarOpen ? 'w-80' : 'w-0'
          }`}
        >
          <button
            onClick={() => setSidebar(!isSidebarOpen)}
            type="button"
            className={`absolute ${
              isSidebarOpen ? '-right-3 top-10' : '-right-16 top-10 md:-right-3'
            } -right-3 top-10 aspect-square rounded-full bg-primary p-1`}
          >
            <IconSelector name="menu" stroke={3} />
          </button>
          <div>
            <div className="mb-4 me-auto ms-auto mt-10 flex h-32 transform cursor-pointer items-center rounded-xl transition-transform duration-300 hover:scale-110 md:h-20 md:w-36">
              <Image
                alt="s"
                width={100}
                height={100}
                src="/../../common/logo.png"
                className="m-auto h-[80%] object-contain"
              />
            </div>
            <div>
              {menu.map((menuItem, idx) => {
                return !menuItem.subMenu ? (
                  <MenuLink
                    isSidebarOpen={isSidebarOpen}
                    text={menuItem.text}
                    icon={menuItem.icon}
                    link={menuItem.link}
                  />
                ) : (
                  <SubMenu
                    isSidebarOpen={isSidebarOpen}
                    text={menuItem.text}
                    icon={menuItem.icon}
                    subMenu={menuItem.subMenu}
                  />
                )
              })}
            </div>
          </div>
          <div>
            <div
              onClick={() => {
                getBranch()
                handleChangeBranch.onOpen()
              }}
              className="flex w-full cursor-pointer items-center gap-3 overflow-hidden bg-secondary px-10 pt-5 text-tertiary"
            >
              <IconSelector
                name="Store"
                width="w-6"
                height="h-6"
                className="text-white"
              />
              <p className="font-semibold capitalize text-white">
                {currentBranch.name}
              </p>
            </div>
            <div className="flex w-full items-center gap-3 overflow-hidden bg-secondary px-10 py-5 text-tertiary">
              <IconSelector
                name="user"
                width="w-8"
                height="h-8"
                className="text-white"
              />
              <p className="font-semibold capitalize text-white">{user.name}</p>
            </div>
          </div>
        </div>
      </div>
      <SelectBranchModal
        onSubmit={onSubmit}
        isOpen={handleChangeBranch.isOpen}
        onClose={handleChangeBranch.onClose}
      />
    </div>
  )
}

export default Sidebar
