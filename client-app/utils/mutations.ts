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
    }
  }
`
export const CREATE_COMBO = gql`
  mutation CreateCombo($createComboInput: CreateComboInput!) {
    createCombo(createComboInput: $createComboInput) {
      errorInput {
        field
        message
      }
      status
      message
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
    }
  }
`
export const UPDATE_COMBO = gql`
  mutation UpdateCombo($updateComboInput: UpdateComboInput!) {
    updateCombo(updateComboInput: $updateComboInput) {
      errorInput {
        message
        field
      }
      status
      message
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
    }
  }
`
export const CANCEL_SALE = gql`
  mutation CancelSale($cancelSaleInput: CancelSaleInput!) {
    cancelSale(cancelSaleInput: $cancelSaleInput) {
      errorInput {
        message
        field
      }
      status
      message
    }
  }
`

export const CREATE_CUSTOMER = gql`
  mutation PublicCreateCustomer($createCustomerInput: CreateCustomerInput!) {
    publicCreateCustomer(createCustomerInput: $createCustomerInput) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        name
        lastName
        email
        phone
        ordersIds
      }
    }
  }
`

export const PUBLIC_CREATE_ORDER = gql`
  mutation PublicCreateOrder($createOrderInput: CreateOrderInput!) {
    publicCreateOrder(createOrderInput: $createOrderInput) {
      errorInput {
        message
        field
      }
      status
      message
    }
  }
`

export const PUBLIC_CREATE_ADDRESS = gql`
  mutation PublicCreateAddress($createAddressInput: CreateAddressInput!) {
    publicCreateAddress(createAddressInput: $createAddressInput) {
      errorInput {
        message
        field
      }
      message
      status
      data {
        id
      }
    }
  }
`

export const ACCEPT_ORDER = gql`
  mutation AcceptOrder($orderId: ObjectId!) {
    acceptOrder(orderId: $orderId) {
      errorInput {
        message
        field
      }
      status
      message
    }
  }
`
export const DELIVER_ORDER = gql`
  mutation deliverOrder($orderId: ObjectId!) {
    deliverOrder(orderId: $orderId) {
      errorInput {
        message
        field
      }
      status
      message
    }
  }
`

export const REJECT_ORDER = gql`
  mutation RejectOrder($orderId: ObjectId!) {
    rejectOrder(orderId: $orderId) {
      errorInput {
        message
        field
      }
      status
      message
    }
  }
`

export const CREATE_DISTRIBUTOR = gql`
  mutation CreateDistributor($createDistributorInput: CreateDistributorInput!) {
    createDistributor(createDistributorInput: $createDistributorInput) {
      errorInput {
        message
        field
      }
      status
      message
    }
  }
`

export const UPDATE_DISTRIBUTOR = gql`
  mutation UpdateDistributor($updateDistributorInput: UpdateDistributorInput!) {
    updateDistributor(updateDistributorInput: $updateDistributorInput) {
      errorInput {
        message
        field
      }
      status
      message
    }
  }
`

export const CREATE_PRICE_LIST = gql`
  mutation CreatePriceList($createPriceListInput: CreatePriceListInput!) {
    createPriceList(createPriceListInput: $createPriceListInput) {
      errorInput {
        message
        field
      }
      status
      message
    }
  }
`

export const UPDATE_PRICE_LIST = gql`
  mutation UpdatePriceList($updatePriceListInput: UpdatePriceListInput!) {
    updatePriceList(updatePriceListInput: $updatePriceListInput) {
      errorInput {
        message
        field
      }
      status
      message
    }
  }
`

export const DELETE_PRICE_LIST = gql`
  mutation DeletePriceList($deletePriceListId: ObjectId!) {
    deletePriceList(id: $deletePriceListId) {
      errorInput {
        message
        field
      }
      status
      message
    }
  }
`
export const CREATE_PRICE = gql`
  mutation CreatePrice($createPriceInput: CreatePriceInput!) {
    createPrice(createPriceInput: $createPriceInput) {
      errorInput {
        message
        field
      }
      message
      status
    }
  }
`
export const UPDATE_PRICE = gql`
  mutation UpdatePrice($updatePriceInput: UpdatePriceInput!) {
    updatePrice(updatePriceInput: $updatePriceInput) {
      errorInput {
        message
        field
      }
      status
      message
    }
  }
`
export const DELETE_PRICE = gql`
  mutation DeletePrice($id: ObjectId!) {
    deletePrice(id: $id) {
      errorInput {
        message
        field
      }
      message
      status
    }
  }
`
export const CREATE_DISTRIBUTOR_SALE = gql`
  mutation CreateDistributorSale(
    $createDistributorSaleInput: CreateDistributorSaleInput!
  ) {
    createDistributorSale(
      createDistributorSaleInput: $createDistributorSaleInput
    ) {
      errorInput {
        message
        field
      }
      message
      status
    }
  }
`
export const CREATE_PAYMENT = gql`
  mutation CreatePayment($createPaymentInput: CreatePaymentInput!) {
    createPayment(createPaymentInput: $createPaymentInput) {
      message
      status
      errorInput {
        message
        field
      }
    }
  }
`
export const UPLOAD_PRODUCT_IMAGE = gql`
  mutation UploadFile($fileInput: FileInput!) {
    uploadFile(fileInput: $fileInput) {
      message
      status
      errorInput {
        field
        message
      }
    }
  }
`
export const CREATE_BILL = gql`
  mutation CreateBill($createBillInput: CreateBillInput!) {
    createBill(createBillInput: $createBillInput) {
      errorInput {
        field
        message
      }
      status
      message
    }
  }
`
export const DELETE_BILL = gql`
  mutation DeleteBill($deleteBillId: ObjectId!) {
    deleteBill(id: $deleteBillId) {
      errorInput {
        message
        field
      }
      status
      message
    }
  }
`
