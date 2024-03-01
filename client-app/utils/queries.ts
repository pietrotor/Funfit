import { gql } from '@apollo/client'

export const GET_CONFIGURATION = gql`
  query GetConfiguration {
    getConfiguration {
      errorInput {
        field
        message
      }
      status
      message
      data {
        id
        businessName
        nit
        phone
        email
        web
        address
        s3BucketUrl
        measurementUnits {
          name
          shortName
        }
      }
    }
  }
`
export const LOGIN = gql`
  query Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      errorInput {
        field
        message
      }
      message
      status
      token
    }
  }
`
export const GET_ROLES = gql`
  query GetRoles($paginationInput: PaginationInput!) {
    getRoles(paginationInput: $paginationInput) {
      errorInput {
        field
        message
      }
      status
      message
      data {
        id
        name
        code
        status
        type
      }
    }
  }
`
export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
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
        lastLogin
        status
        createdBy
        roleId
        roleInfo {
          id
          name
          code
          status
          type
        }
      }
    }
  }
`

export const GET_USERS = gql`
  query GetUsers($paginationInput: PaginationInput!) {
    getUsers(paginationInput: $paginationInput) {
      errorInput {
        field
        message
      }
      status
      message
      data {
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
          name
        }
      }
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`
export const GET_PRODUCTS = gql`
  query GetProducts($paginationInput: PaginationInput!) {
    getProducts(paginationInput: $paginationInput) {
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
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`
export const GET_WAREHOUSES = gql`
  query GetWarehouses($paginationInput: PaginationInput!) {
    getWarehouses(paginationInput: $paginationInput) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        name
        description
        address
      }
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`
export const CREATE_WAREHOUSE = gql`
  mutation CreateWarehouse($createWarehouseInput: CreateWarehouseInput!) {
    createWarehouse(createWarehouseInput: $createWarehouseInput) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        name
        description
        address
      }
    }
  }
`
export const UPDATE_WAREHOUSE = gql`
  mutation UpdateWarehouse($updateWarehouseInput: UpdateWarehouseInput!) {
    updateWarehouse(updateWarehouseInput: $updateWarehouseInput) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        name
        description
        address
      }
    }
  }
`
export const DELETE_WAREHOUSE = gql`
  mutation DeleteWarehouse($deleteWarehouseId: ObjectId!) {
    deleteWarehouse(id: $deleteWarehouseId) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        name
        description
        address
      }
    }
  }
`

export const GET_STOCKS = gql`
  query GetStocksPaginated($paginationInput: PaginationInput!) {
    getStocksPaginated(paginationInput: $paginationInput) {
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
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`
export const GET_WAREHOUSES_BY_ID = gql`
  query GetWarehouseById($getWarehouseByIdId: ObjectId!) {
    getWarehouseById(id: $getWarehouseByIdId) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        name
        description
        address
      }
    }
  }
`

export const GET_WAREHOUSE_HISTORY = gql`
  query GetWarehouseHistory(
    $paginationInput: PaginationInput!
    $warehouseId: ObjectId!
  ) {
    getWarehouseHistory(
      paginationInput: $paginationInput
      warehouseId: $warehouseId
    ) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        warehouseId
        type
        date
        stockBefore
        stockLater
        stock {
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
          }
          warehouse {
            id
            name
            description
            address
          }
        }
      }
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`

export const GET_STOCK_HISTORY = gql`
  query GetStockHistory(
    $paginationInput: PaginationInput!
    $stockId: ObjectId!
  ) {
    getStockHistory(paginationInput: $paginationInput, stockId: $stockId) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        stockId
        warehouseId
        type
        date
        stockBefore
        stockLater
        stock {
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
          }
        }
      }
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`
export const GET_STOCKS_BY_WAREHOUSE = gql`
  query GetStockById($getStockByIdId: ObjectId!) {
    getStockById(id: $getStockByIdId) {
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
export const GET_PRODUCTS_OUT_OF_WAREHOUSE = gql`
  query GetProductsOutOfWarehouse(
    $paginationInput: PaginationInput!
    $warehouseId: ObjectId!
  ) {
    getProductsOutOfWarehouse(
      paginationInput: $paginationInput
      warehouseId: $warehouseId
    ) {
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
      }
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`
export const GET_WAREHOUSE_STOCKS = gql`
  query GetWarehouseStock(
    $warehouseStockPaginationInput: WarehouseStockPaginationInput!
  ) {
    getWarehouseStock(
      warehouseStockPaginationInput: $warehouseStockPaginationInput
    ) {
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
        lastStockEntry
        units
        product {
          id
          name
        }
        warehouse {
          id
        }
      }
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`
export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($getProductByIdId: ObjectId!) {
    getProductById(id: $getProductByIdId) {
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
        image
        description
      }
    }
  }
`

export const GET_BRANCH_PRODUCTS = gql`
  query GetBranchProductsPaginated(
    $paginationInput: PaginationInput!
    $branchId: ObjectId!
  ) {
    getBranchProductsPaginated(
      paginationInput: $paginationInput
      branchId: $branchId
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
          name
        }
      }
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`
export const GET_BRANCH_PAGINATION = gql`
  query GetBranchesPaginated($paginationInput: PaginationInput!) {
    getBranchesPaginated(paginationInput: $paginationInput) {
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
        visibleOnWeb
        cashId
      }
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`
export const GET_BRANCH_BY_ID = gql`
  query GetBranchById($getBranchByIdId: ObjectId!) {
    getBranchById(id: $getBranchByIdId) {
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
        visibleOnWeb
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
`

export const GET_CASH_BY_ID = gql`
  query GetCashById($getCashByIdId: ObjectId!) {
    getCashById(id: $getCashByIdId) {
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
          amountOfMovents
        }
      }
    }
  }
`
export const GET_CASH_TURN_MOVEMENTS = gql`
  query GetCashTurnMovements(
    $paginationInput: PaginationInput!
    $turnId: ObjectId!
  ) {
    getCashTurnMovements(paginationInput: $paginationInput, turnId: $turnId) {
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
        concept
        createdByInfo {
          id
          name
          lastName
        }
      }
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`
export const GET_SALES_PAGINATED = gql`
  query GetSalesPaginated($salesPaginationInput: SalesPaginationInput!) {
    getSalesPaginated(salesPaginationInput: $salesPaginationInput) {
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
          product {
            id
            name
          }
        }
        total
        discount
        date
        code
        canceled
        createdByInfo {
          id
          name
          lastName
        }
      }
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`
export const GET_SALES_SUMMARY = gql`
  query GetSalesSummary($salesSummaryInput: SalesSummaryInput!) {
    getSalesSummary(salesSummaryInput: $salesSummaryInput) {
      errorInput {
        field
        message
      }
      status
      message
      data {
        paymentMethods {
          method
          total
        }
        total
      }
    }
  }
`
export const GET_SALES_BY_ID = gql`
  query GetSaleById($getSaleByIdId: ObjectId!) {
    getSaleById(id: $getSaleByIdId) {
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
          qty
          total
          product {
            id
            name
            code
            image
          }
        }
        code
        total
      }
    }
  }
`
export const GET_CATEGORIES = gql`
  query GetCategories($paginationInput: PaginationInput!) {
    getCategories(paginationInput: $paginationInput) {
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
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`

export const GET_CATEGORY_BY_ID = gql`
  query GetCategoryById($getCategoryByIdId: ObjectId!) {
    getCategoryById(id: $getCategoryByIdId) {
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
export const GET_WAREHOUSESOFPRODUCT = gql`
  query GetWarehousesOfProduct(
    $paginationInput: PaginationInput!
    $productId: ObjectId!
  ) {
    getWarehousesOfProduct(
      paginationInput: $paginationInput
      productId: $productId
    ) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        name
      }
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`
export const GET_PRODUCT_STOCK = gql`
  query GetProductStock(
    $paginationInput: PaginationInput!
    $productId: ObjectId!
    $warehouseId: ObjectId
  ) {
    getProductStock(
      paginationInput: $paginationInput
      productId: $productId
      warehouseId: $warehouseId
    ) {
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
        units
      }
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`

export const GET_PUBLIC_BRANCH_PRODUCTS = gql`
  query GetPublicProducts(
    $paginationInput: PaginationInput!
    $branchId: ObjectId!
  ) {
    getPublicProducts(paginationInput: $paginationInput, branchId: $branchId) {
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
          name
          suggetedPrice
          code
          internalCode
          description
          categoryId
          cost
          image
          warehouses
        }
      }
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`

export const GET_PUBLIC_CUSTOMER_BY_ID = gql`
  query GetPublicCustomerById($getPublicCustomerByIdId: ObjectId!) {
    getPublicCustomerById(id: $getPublicCustomerByIdId) {
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
        lastOrderDate
        ordersIds
        addressInfo {
          id
          latitude
          longitude
          detail
        }
      }
    }
  }
`
export const GET_ORDER_PAGINATED = gql`
  query GetOrdersPaginated($orderPaginationInput: OrderPaginationInput!) {
    getOrdersPaginated(orderPaginationInput: $orderPaginationInput) {
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
          branchProductId
          productId
          price
          qty
          total
          product {
            id
            name
            suggetedPrice
            code
            internalCode
            description
            categoryId
            cost
            image
            warehouses
          }
        }
        deliveryMethod
        paymentMethod
        subTotal
        total
        discount
        date
        code
        customerId
        addressId
        pickUpInformation
        orderDetails
        orderAcepted
        orderAceptedAt
        orderAceptedBy
        reason
        rejected
        rejectedAt
        rejectedBy
        isSold
        saleId
        customerInfo {
          id
          name
          lastName
          email
          phone
          lastOrderDate
          addressesIds
          ordersIds
        }
      }
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`

export const GET_DISTRIBUTORS_PAGINATED = gql`
  query GetDistributorsPaginated($paginationInput: PaginationInput!) {
    getDistributorsPaginated(paginationInput: $paginationInput) {
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
        address
        email
        phone
        nit
        socialReason
        ownerInformation {
          name
          lastName
          phone
          address
        }
      }
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`

export const GET_DISTRIBUTOR_BY_ID = gql`
  query GetDistributorById($getDistributorByIdId: ObjectId!) {
    getDistributorById(id: $getDistributorByIdId) {
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
        address
        email
        phone
        nit
        socialReason
        ownerInformation {
          name
          lastName
          phone
          address
        }
      }
    }
  }
`

export const GET_PRICE_LIST = gql`
  query GetPriceListsPaginated($paginationInput: PaginationInput!) {
    getPriceListsPaginated(paginationInput: $paginationInput) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        name
        description
        productsIds
      }
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`
