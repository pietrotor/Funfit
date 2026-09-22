import ExcelJS from 'exceljs'
import { Response } from 'express'
import { saleCore, branchCore } from '.'
import { SalesExportInput } from './sale.service'
import mongoose from 'mongoose'

export class ExcelService {
  private getPaymentMethodText(method: string): string {
    switch (method) {
      case 'CASH':
        return 'Efectivo'
      case 'CARD':
        return 'Tarjeta'
      case 'PEDIDOS_YA':
        return 'PedidosYa'
      case 'OTHER':
        return 'Otros'
      default:
        return method
    }
  }

  async exportSalesToExcel(
    exportInput: SalesExportInput,
    res: Response
  ): Promise<void> {
    const { branchIds, initialDate, endDate, productId } = exportInput

    // Obtener nombre de la sucursal
    let branchName = 'Todas'
    if (branchIds.length === 1) {
      try {
        const branchObjectId = new mongoose.Types.ObjectId(branchIds[0])
        const branch = await branchCore.getBranchById(branchObjectId as any)
        branchName = branch.name
      } catch (e) {
        branchName = 'Sucursal'
      }
    }

    // Si hay filtro de producto, obtener los IDs para filtrar
    let productIdsFilter: string[] | null = null
    if (productId) {
      productIdsFilter = await saleCore.getProductIdsForFilter(productId)
    }

    // Obtener el cursor para streaming
    const { cursor } = saleCore.getSalesExportCursor(exportInput)

    // Crear el workbook de Excel
    const workbook = new ExcelJS.Workbook()
    workbook.creator = 'FunFit'
    workbook.created = new Date()

    const worksheet = workbook.addWorksheet('Reporte de Ventas')

    // Estilos
    const titleStyle: Partial<ExcelJS.Style> = {
      font: { bold: true, size: 18, color: { argb: 'FF1F4E79' } },
      alignment: { horizontal: 'center', vertical: 'middle' }
    }

    const summaryLabelStyle: Partial<ExcelJS.Style> = {
      font: { bold: true, size: 11 },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE2EFDA' }
      },
      alignment: { horizontal: 'right', vertical: 'middle' },
      border: {
        top: { style: 'thin', color: { argb: 'FF70AD47' } },
        left: { style: 'thin', color: { argb: 'FF70AD47' } },
        bottom: { style: 'thin', color: { argb: 'FF70AD47' } },
        right: { style: 'thin', color: { argb: 'FF70AD47' } }
      }
    }

    const summaryValueStyle: Partial<ExcelJS.Style> = {
      font: { bold: true, size: 12, color: { argb: 'FF375623' } },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE2EFDA' }
      },
      alignment: { horizontal: 'center', vertical: 'middle' },
      border: {
        top: { style: 'thin', color: { argb: 'FF70AD47' } },
        left: { style: 'thin', color: { argb: 'FF70AD47' } },
        bottom: { style: 'thin', color: { argb: 'FF70AD47' } },
        right: { style: 'thin', color: { argb: 'FF70AD47' } }
      }
    }

    const headerStyle: Partial<ExcelJS.Style> = {
      font: { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4472C4' }
      },
      alignment: { horizontal: 'center', vertical: 'middle' },
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    }

    // ========== ENCABEZADO Y RESUMEN (filas 1-10) ==========

    // Fila 1: Título
    worksheet.mergeCells('A1:M1')
    const titleCell = worksheet.getCell('A1')
    titleCell.value = `📊 Reporte de Ventas - ${branchName}`
    titleCell.style = titleStyle
    worksheet.getRow(1).height = 30

    // Fila 2: Período
    worksheet.mergeCells('A2:M2')
    const dateRangeCell = worksheet.getCell('A2')
    dateRangeCell.value = `Período: ${initialDate} al ${endDate}`
    dateRangeCell.font = { italic: true, size: 11, color: { argb: 'FF666666' } }
    dateRangeCell.alignment = { horizontal: 'center' }

    // Fila 3: Espacio
    worksheet.getRow(3).height = 10

    // Filas 4-8: Resumen (se llenará después con los totales)
    // Estructura: etiqueta en columna B, valor en columna C
    const summaryLabels = [
      { row: 4, label: 'Total General:', valueCell: 'C4' },
      { row: 5, label: 'Total Efectivo:', valueCell: 'C5' },
      { row: 6, label: 'Total Tarjeta:', valueCell: 'C6' },
      { row: 7, label: 'Total QR/Transferencia:', valueCell: 'C7' },
      { row: 8, label: 'Total PedidosYa:', valueCell: 'C8' },
      { row: 9, label: 'Total Otros:', valueCell: 'C9' },
      { row: 10, label: 'Total Registros:', valueCell: 'C10' }
    ]

    summaryLabels.forEach(({ row, label }) => {
      const labelCell = worksheet.getCell(`B${row}`)
      labelCell.value = label
      labelCell.style = summaryLabelStyle
      
      const valueCell = worksheet.getCell(`C${row}`)
      valueCell.value = 'Calculando...'
      valueCell.style = summaryValueStyle
    })

    // Ajustar anchos de columnas B y C para el resumen
    worksheet.getColumn('B').width = 28
    worksheet.getColumn('C').width = 18

    worksheet.getRow(11).height = 15

    const DATA_HEADER_ROW = 12

    // Definir columnas
    worksheet.columns = [
      { header: '#', key: 'index', width: 6 },
      { header: 'Código', key: 'code', width: 14 },
      { header: 'Fecha de Venta', key: 'date', width: 20, style: { numFmt: 'DD/MM/YYYY HH:mm' } },
      { header: 'Productos', key: 'products', width: 45 },
      { header: 'Cantidad', key: 'qty', width: 10 },
      { header: 'Subtotal', key: 'subTotal', width: 12, style: { numFmt: '#,##0.00' } },
      { header: 'Descuento', key: 'discount', width: 12, style: { numFmt: '#,##0.00' } },
      { header: 'Total (Bs)', key: 'total', width: 12, style: { numFmt: '#,##0.00' } },
      { header: 'Método de Pago', key: 'paymentMethod', width: 22 },
      { header: 'Ingresó a caja', key: 'entersCash', width: 16 },
      { header: 'Observaciones', key: 'observations', width: 30 },
      { header: 'Vendedor', key: 'seller', width: 25 },
      { header: 'Estado', key: 'status', width: 12 }
    ]

    // Agregar encabezados de datos con estilo
    const headerRow = worksheet.getRow(DATA_HEADER_ROW)
    headerRow.values = [
      '#',
      'Código',
      'Fecha de Venta',
      'Productos',
      'Cantidad',
      'Subtotal',
      'Descuento',
      'Total (Bs)',
      'Método de Pago',
      'Ingresó a caja',
      'Observaciones',
      'Vendedor',
      'Estado'
    ]
    headerRow.eachCell((cell, colNumber) => {
      if (colNumber <= 13) {
        cell.style = headerStyle
      }
    })
    headerRow.height = 25

    // Variables para totales
    let totalGeneral = 0
    let totalCash = 0
    let totalCard = 0
    let totalQR = 0
    let totalPedidosYa = 0
    let totalOther = 0
    let index = 0

    // ========== PROCESAR DATOS (streaming) ==========
    for await (const sale of cursor) {
      const saleObj = sale.toObject ? sale.toObject() : sale

      // Filtrar por producto si es necesario
      if (productIdsFilter) {
        const hasProduct = saleObj.products.some((p: any) =>
          productIdsFilter!.includes(
            p.productId?._id?.toString() || p.productId?.toString()
          )
        )
        if (!hasProduct) continue
      }

      index++

      const productsList = saleObj.products
        .map((p: any) => `${p.productId?.name || 'Producto'} (x${p.qty})`)
        .join(', ')

      const totalQty = saleObj.products.reduce(
        (acc: number, p: any) => acc + p.qty,
        0
      )

      // Convertir fecha a hora de Bolivia (UTC-4)
      const saleDate = new Date(saleObj.createdAt)
      // Ajustar a timezone Bolivia (UTC-4)
      const boliviaOffset = -4 * 60 // Bolivia es UTC-4
      const localOffset = saleDate.getTimezoneOffset()
      const boliviaDate = new Date(saleDate.getTime() + (localOffset + boliviaOffset) * 60000)

      const row = worksheet.addRow({
        index,
        code: saleObj.code || '-',
        date: boliviaDate, // Date real para fórmulas de Excel
        products: productsList,
        qty: totalQty,
        subTotal: saleObj.subTotal,
        discount: saleObj.discount || 0,
        total: saleObj.total,
        paymentMethod: this.getPaymentMethodText(saleObj.paymentMethod),
        entersCash: saleObj.entersCash || saleObj.paymentMethod === 'CASH' ? 'Sí' : 'No',
        observations: saleObj.observations || '-',
        seller: saleObj.createdBy
          ? `${(saleObj.createdBy as any).name || ''} ${(saleObj.createdBy as any).lastName || ''}`.trim()
          : '-',
        status: saleObj.canceled ? 'ANULADA' : 'Completada'
      })

      // Asegurar formato de fecha en la celda
      row.getCell('date').numFmt = 'DD/MM/YYYY HH:mm'

      // Estilo para ventas anuladas
      if (saleObj.canceled) {
        row.eachCell(cell => {
          cell.font = { color: { argb: 'FFFF0000' }, strike: true }
        })
      }

      // Bordes para celdas de datos
      row.eachCell((cell, colNumber) => {
        if (colNumber <= 13) {
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFD9D9D9' } },
            left: { style: 'thin', color: { argb: 'FFD9D9D9' } },
            bottom: { style: 'thin', color: { argb: 'FFD9D9D9' } },
            right: { style: 'thin', color: { argb: 'FFD9D9D9' } }
          }
        }
      })

      // Sumar totales (solo ventas no anuladas)
      if (!saleObj.canceled) {
        totalGeneral += saleObj.total
        if (saleObj.paymentMethod === 'CASH') totalCash += saleObj.total
        if (saleObj.paymentMethod === 'CARD') totalCard += saleObj.total
        if (saleObj.paymentMethod === 'QR_TRANSFER') totalQR += saleObj.total
        if (saleObj.paymentMethod === 'PEDIDOS_YA') totalPedidosYa += saleObj.total
        if (saleObj.paymentMethod === 'OTHER') totalOther += saleObj.total
      }
    }

    // Cerrar el cursor
    await cursor.close()

    // ========== ACTUALIZAR RESUMEN CON TOTALES CALCULADOS ==========
    worksheet.getCell('C4').value = `${totalGeneral.toFixed(2)} Bs`
    worksheet.getCell('C5').value = `${totalCash.toFixed(2)} Bs`
    worksheet.getCell('C6').value = `${totalCard.toFixed(2)} Bs`
    worksheet.getCell('C7').value = `${totalQR.toFixed(2)} Bs`
    worksheet.getCell('C8').value = `${totalPedidosYa.toFixed(2)} Bs`
    worksheet.getCell('C9').value = `${totalOther.toFixed(2)} Bs`
    worksheet.getCell('C10').value = index

    for (let row = 4; row <= 10; row++) {
      worksheet.getCell(`C${row}`).style = summaryValueStyle
    }

    // ========== AGREGAR FILTROS AUTOMÁTICOS ==========
    // Solo en columnas estandarizadas: Método de Pago (I=9), Vendedor (J=10), Estado (K=11)
    const lastDataRow = DATA_HEADER_ROW + index
    worksheet.autoFilter = {
      from: { row: DATA_HEADER_ROW, column: 9 },
      to: { row: lastDataRow, column: 13 }
    }

    // ========== CONGELAR PANELES ==========
    // Congelar la fila de encabezados para que siempre sea visible
    worksheet.views = [
      {
        state: 'frozen',
        xSplit: 0,
        ySplit: DATA_HEADER_ROW,
        topLeftCell: 'A13',
        activeCell: 'A13'
      }
    ]

    // ========== CONFIGURAR RESPUESTA ==========
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=ventas_${branchName}_${initialDate}_${endDate}.xlsx`
    )

    await workbook.xlsx.write(res)
    res.end()
  }
}
