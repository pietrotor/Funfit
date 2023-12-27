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
        cost
        image
        warehouses
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
        stockId
        warehouseId
        quantity
        type
        date
        stockBefore
        stockLater
        createdBy
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
            warehouses
          }
          warehouse {
            id
            name
            description
            address
          }
        }
        warehouse {
          id
          name
          description
          address
        }
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
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`

export const GET_STOCK_HISTORY = gql`
query GetStockHistory($paginationInput: PaginationInput!, $stockId: ObjectId!) {
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
      quantity
      type
      date
      stockBefore
      stockLater
      createdBy
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
          warehouses
        }
        warehouse {
          id
          name
          description
          address
        }
      }
      warehouse {
        id
        name
        description
        address
      }
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
    totalRecords
    totalPages
    rows
    currentPage
  }
}
`
