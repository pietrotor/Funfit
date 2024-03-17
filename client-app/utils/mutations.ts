import { gql } from '@apollo/client'
export const CREATE_USER = gql`
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      errorInput {
        field
        message
      }
      message
      status
    }
  }
`
export const UPDATE_USER = gql`
  mutation UpdateUser(
    $updateUserInput: UpdateUserInput!
    $deleteInput: Boolean
  ) {
    updateUser(updateUserInput: $updateUserInput, deleteInput: $deleteInput) {
      errorInput {
        field
        message
      }
      message
      status
    }
  }
`
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        name
        suggetedPrice
        code
        description
        categoryId
        cost
        image
        warehouses
        category {
          id
          name
          code
        }
      }
    }
  }
`
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($updateProductInput: UpdateProductInput!) {
    updateProduct(updateProductInput: $updateProductInput) {
      status
      message
      errorInput {
        message
        field
      }
      data {
        id
        name
        suggetedPrice
        code
        description
        categoryId
        cost
        image
        warehouses
        category {
          id
          name
          code
        }
      }
    }
  }
`

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($deleteProductId: ObjectId!) {
    deleteProduct(id: $deleteProductId) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        name
        suggetedPrice
        code
        description
        categoryId
        cost
        image
        warehouses
        category {
          id
          name
          code
        }
      }
    }
  }
`
export const CREATE_STOCK = gql`
  mutation CreateStock($createStockInput: CreateStockInput!) {
    createStock(createStockInput: $createStockInput) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        productId
        warehouseId
        quantity
        securityStock
        lastStockEntry
        units
        product {
          id
          name
          suggetedPrice
          code
          description
          cost
          image
          warehouses
        }
        warehouse {
          id
          name
          description
          address
        }
      }
    }
  }
`
export const CREATE_STOCK_MOVEMENT = gql`
  mutation CreatStockMovement(
    $createStockMovementInput: CreateStockMovementInput!
  ) {
    creatStockMovement(createStockMovementInput: $createStockMovementInput) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        productId
        warehouseId
        quantity
        securityStock
        units
        product {
          id
          name
          suggetedPrice
          code
          description
          cost
          image
          warehouses
        }
        warehouse {
          id
          name
          description
          address
        }
      }
    }
  }
`
export const CREATE_BRANCH = gql`
  mutation CreateBranch($createBranchInput: CreateBranchInput!) {
    createBranch(createBranchInput: $createBranchInput) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        name
        code
        city
        direction
        phone
        nit
        cashId
        cash {
          id
        }
      }
    }
  }
`

export const UPDATE_BRANCH = gql`
  mutation UpdateBranch($updateBranchInput: UpdateBranchInput!) {
    updateBranch(updateBranchInput: $updateBranchInput) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        name
        code
        city
        direction
        phone
        nit
        cashId
        cash {
          id
          branchId
          amount
          currentTurnId
          isOpen
          currentTurn {
            id
            cashId
            isOpen
            amountOfMovents
            openInfo {
              amount
              physicialAmount
              difference
              date
              observation
              openBy
              openByInfo {
                id
                name
                lastName
                email
                phone
                lastLogin
                status
                createdBy
                roleId
                roleInfo {
                  id
                  name
                  code
                  status
                }
              }
            }
            closeInfo {
              amount
              physicialAmount
              difference
              date
              observation
              closeBy
              closeByInfo {
                id
                name
                lastName
                email
                phone
                lastLogin
                status
                createdBy
                roleId
                roleInfo {
                  id
                  name
                  code
                  status
                }
              }
            }
          }
        }
        visibleOnWeb
      }
    }
  }
`
export const DELETE_BRANCH = gql`
  mutation DeleteBranch($deleteBranchId: ObjectId!) {
    deleteBranch(id: $deleteBranchId) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        name
        code
        city
        direction
        phone
        nit
        cashId
        cash {
          id
        }
      }
    }
  }
`

export const CREATE_BRANCH_PRODUCT = gql`
  mutation CreateBranchProduct(
    $createBranchProductInput: CreateBranchProductInput!
  ) {
    createBranchProduct(createBranchProductInput: $createBranchProductInput) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        branchId
        productId
        price
        isVisibleOnWeb
        isVisibleOnMenu
        product {
          id
          name
          suggetedPrice
          code
          description
          cost
          image
          warehouses
        }
        branch {
          id
          name
          code
          city
          direction
          phone
          nit
          cashId
          cash {
            id
          }
        }
      }
    }
  }
`

export const UPDATE_BRANCH_PRODUCT = gql`
  mutation UpdateBranchProduct(
    $updateBranchProductInput: UpdateBranchProductInput!
  ) {
    updateBranchProduct(updateBranchProductInput: $updateBranchProductInput) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        branchId
        productId
        price
        isVisibleOnWeb
        isVisibleOnMenu
        product {
          id
          name
          suggetedPrice
          code
          description
          cost
          image
          warehouses
        }
        branch {
          id
          name
          code
          city
          direction
          phone
          nit
          cashId
          cash {
            id
          }
        }
      }
    }
  }
`
export const DELETE_BRANCH_PRODUCT = gql`
  mutation DeleteBranchProduct($id: ObjectId!) {
    deleteBranchProduct(id: $id) {
      errorInput {
        message
        field
      }
      message
      status
    }
  }
`
export const OPEN_CASH = gql`
  mutation OpenCash($createTurnInput: CreateTurnInput!) {
    openCash(createTurnInput: $createTurnInput) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        branchId
        amount
        currentTurnId
        isOpen
        currentTurn {
          id
          cashId
          isOpen
          openInfo {
            amount
            physicialAmount
            difference
            date
            observation
            openBy
            openByInfo {
              id
              name
              lastName
              email
              phone
              lastLogin
              status
              createdBy
              roleId
              roleInfo {
                id
                name
                code
                status
              }
            }
          }
          closeInfo {
            amount
            physicialAmount
            difference
            date
            observation
            closeBy
            closeByInfo {
              id
              name
              lastName
              email
              phone
              lastLogin
              status
              createdBy
              roleId
              roleInfo {
                id
                name
                code
                status
              }
            }
          }
        }
      }
    }
  }
`
export const CLOSE_CASH = gql`
  mutation CloseCash($closeTurnInput: CloseTurnInput!) {
    closeCash(closeTurnInput: $closeTurnInput) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        branchId
        amount
        currentTurnId
        isOpen
        currentTurn {
          id
          cashId
          isOpen
          openInfo {
            amount
            physicialAmount
            difference
            date
            observation
            openBy
            openByInfo {
              id
              name
              lastName
              email
              phone
              lastLogin
              status
              createdBy
              roleId
              roleInfo {
                id
                name
                code
                status
              }
            }
          }
          closeInfo {
            amount
            physicialAmount
            difference
            date
            observation
            closeBy
            closeByInfo {
              id
              name
              lastName
              email
              phone
              lastLogin
              status
              createdBy
              roleId
              roleInfo {
                id
                name
                code
                status
              }
            }
          }
        }
      }
    }
  }
`
export const CREATE_CASH_MOVEMENT = gql`
  mutation CreateCashMovement(
    $createTurnMovementInput: CreateTurnMovementInput!
  ) {
    createCashMovement(createTurnMovementInput: $createTurnMovementInput) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        turnId
        cashId
        amount
        date
        type
        concept
        createdBy
        createdByInfo {
          id
          name
          lastName
          email
          phone
          lastLogin
          status
          createdBy
          roleId
          roleInfo {
            id
            name
            code
            status
          }
        }
      }
    }
  }
`

export const CREATE_SALE = gql`
  mutation CreateSale($createSaleInput: CreateSaleInput!) {
    createSale(createSaleInput: $createSaleInput) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        branchId
        products {
          productId
          price
          qty
          total
          product {
            id
            name
            suggetedPrice
            code
            description
            cost
            image
            warehouses
          }
        }
        paymentMethod
        total
        discount
        date
        code
        client
        amountRecibed
        change
        observations
        canceled
        reason
        canceledAt
      }
    }
  }
`
export const CREATE_BRANCH_PRODUCT_STOCK_MOVEMENT = gql`
  mutation CreateBranchProductStockMovement(
    $createBranchProductStockMovementInput: CreateBranchProductStockMovementInput!
  ) {
    createBranchProductStockMovement(
      createBranchProductStockMovementInput: $createBranchProductStockMovementInput
    ) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        branchId
        productId
        price
        stock
        isVisibleOnWeb
        isVisibleOnMenu
        product {
          id
          id
          name
          suggetedPrice
          code
          internalCode
          description
          cost
          image
          warehouses
          name
          suggetedPrice
          code
          internalCode
          description
          cost
          image
          warehouses
        }
        branch {
          id
          name
          code
          city
          direction
          phone
          nit
          cashId
          cash {
            id
            branchId
            amount
            currentTurnId
            isOpen
            currentTurn {
              id
              cashId
              isOpen
              amountOfMovents
              openInfo {
                amount
                physicialAmount
                difference
                date
                observation
                openBy
                openByInfo {
                  id
                  name
                  lastName
                  email
                  phone
                  lastLogin
                  status
                  createdBy
                  roleId
                  roleInfo {
                    id
                    name
                    code
                    status
                  }
                }
              }
              closeInfo {
                amount
                physicialAmount
                difference
                date
                observation
                closeBy
                closeByInfo {
                  id
                  name
                  lastName
                  email
                  phone
                  lastLogin
                  status
                  createdBy
                  roleId
                  roleInfo {
                    id
                    name
                    code
                    status
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        name
        code
      }
    }
  }
`

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $updateCategoryInput) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        name
        code
      }
    }
  }
`

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($deleteCategoryId: ObjectId!) {
    deleteCategory(id: $deleteCategoryId) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        name
        code
      }
    }
  }
`
