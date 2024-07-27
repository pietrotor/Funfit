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
  query GetProducts(
    $paginationInput: PaginationInput!
    $type: ProductTypeEnum
  ) {
    getProducts(paginationInput: $paginationInput, type: $type) {
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
        subProducts {
          productId
          stockRequirement
          product {
            name
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
        createdByInfo {
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
          image
          type
          code
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
        code
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
    $posMenu: Boolean
  ) {
    getBranchProductsPaginated(
      paginationInput: $paginationInput
      branchId: $branchId
      posMenu: $posMenu
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
        lastStockEntry
        isVisibleOnWeb
        isVisibleOnMenu
        product {
          id
          name
          image
          code
          type
        }
      }
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`
export const GET_BRANCH_PRODUCT_STOCK = gql`
  query GetBranchProductStock($id: ObjectId!) {
    getBranchProductStock(id: $id) {
      errorInput {
        field
        message
      }
      status
      message
      data
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
          openInfo {
            amount
            date
            difference
            observation
            openByInfo {
              name
              lastName
            }
            openBy
            physicialAmount
          }
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
        type
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
        paymentMethod
        products {
          productId
          qty
          total
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
        reason
        canceledAt
        createdBy
        branch {
          id
          name
          code
          city
          direction
          phone
          nit
          cashId
        }
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
        paymentMethod
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
        createdByInfo {
          name
          lastName
        }
        canceled
        canceledAt
        canceledByInfo {
          name
          lastName
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
  query GetPublicProducts($branchId: ObjectId!) {
    getPublicProducts(branchId: $branchId) {
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
        products {
          id
          branchId
          productId
          price
          stock
          lastStockEntry
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
      }
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
        orderStatus
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
        addressInfo {
          latitude
          longitude
          detail
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
export const GET_PRICES = gql`
  query GetPricesPaginated($pricePaginationInput: PricePaginationInput!) {
    getPricesPaginated(pricePaginationInput: $pricePaginationInput) {
      errorInput {
        field
        message
      }
      status
      message
      data {
        id
        productId
        priceListId
        price
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
export const GET_PRICE_BY_ID = gql`
  query GetPriceById($id: ObjectId!) {
    getPriceById(id: $id) {
      errorInput {
        field
        message
      }
      status
      message
      data {
        id
        productId
        priceListId
        price
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
    }
  }
`
export const GET_DISTRIBUTOR_SALE_PRODUCTS = gql`
  query GetDistributorSaleProducts(
    $warehouseId: ObjectId!
    $priceListId: ObjectId!
  ) {
    getDistributorSaleProducts(
      warehouseId: $warehouseId
      priceListId: $priceListId
    ) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        warehouseId
        stockId
        productId
        priceListId
        priceId
        price
        stock
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
    }
  }
`
export const GET_DISTRIBUTORS_SALES_PAGINATED = gql`
  query GetDistributorSalesPaginated(
    $distributorSalePaginationInput: DistributorSalePaginationInput!
  ) {
    getDistributorSalesPaginated(
      distributorSalePaginationInput: $distributorSalePaginationInput
    ) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        products {
          productId
          price
          qty
          total
          product {
            name
          }
        }
        priceListId
        warehouseId
        paymentMethod
        subTotal
        total
        discount
        balance
        totalPaid
        date
        code
        distributorId
        observations
        createdBy
        canceled
        reason
        canceledAt
        canceledBy
        warehouse {
          name
        }
        priceList {
          name
        }
        distributor {
          name
          code
        }
        createdByInfo {
          name
          lastName
        }
        canceledByInfo {
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
export const GET_DISTRIBUTOR_SALE_BY_ID = gql`
  query GetDistributorSale($getDistributorSaleId: ObjectId!) {
    getDistributorSale(id: $getDistributorSaleId) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        products {
          productId
          price
          qty
          total
          product {
            name
            image
            code
          }
        }
        priceListId
        warehouseId
        paymentMethod
        subTotal
        total
        discount
        balance
        totalPaid
        date
        code
        distributorId
        observations
        createdBy
        canceled
        reason
        canceledAt
        canceledBy
        warehouse {
          name
        }
        priceList {
          name
        }
        distributor {
          name
          code
        }
        createdByInfo {
          name
          lastName
        }
        canceledByInfo {
          name
          lastName
        }
      }
    }
  }
`
export const GET_DISTRIBUTORS_SALES_SUMMARY = gql`
  query GetDistributorsSalesSummary(
    $distributorSalePaginationInput: DistributorSalePaginationInput!
  ) {
    getDistributorsSalesSummary(
      distributorSalePaginationInput: $distributorSalePaginationInput
    ) {
      errorInput {
        field
        message
      }
      status
      message
      data {
        total
        totalPaid
        balance
      }
    }
  }
`
export const GET_DISTRIBUTOR_SALE_PAYMENTS = gql`
  query GetDistributorSalePayments($distibutorSaleId: ObjectId!) {
    getDistributorSalePayments(distibutorSaleId: $distibutorSaleId) {
      errorInput {
        message
        field
      }
      status
      message
      data {
        id
        amount
        balance
        totalPaid
        date
        observation
        distributorId
        distributorSaleId
        createdBy
        createdByInfo {
          name
          lastName
        }
      }
    }
  }
`
export const GET_BUSINESS_BALANCE = gql`
  query GetBusinessBalance($endDate: Date!, $initialDate: Date!) {
    getBusinessBalance(endDate: $endDate, initialDate: $initialDate) {
      errorInput {
        field
        message
      }
      status
      message
      data {
        salesByBranch {
          id
          name
          total
        }
        totalPaid
        balance
        bills
        result
        totalExpenses
        totalEarnings
      }
    }
  }
`
export const PUBLIC_GET_CATEGORIES = gql`
  query GetPublicCategories {
    getPublicCategories {
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
export const GET_BILLS = gql`
  query getBills($billPaginationInput: BillPaginationInput!) {
    getBills(billPaginationInput: $billPaginationInput) {
      errorInput {
        field
        message
      }
      status
      message
      data {
        id
        title
        date
        amount
        detail
        createdBy
        createdByInfo {
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
export const GET_BILLS_SUMMARY = gql`
  query GetBillSummary($billSummaryInput: BillSummaryInput!) {
    getBillSummary(billSummaryInput: $billSummaryInput) {
      errorInput {
        field
        message
      }
      status
      message
      data
    }
  }
`
