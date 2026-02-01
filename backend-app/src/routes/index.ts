import { Router, Request, Response } from 'express'
import { excelCore } from '../services'

const router = Router()

// Endpoint para exportar ventas a Excel
router.get('/sales/export', async (req: Request, res: Response) => {
  try {
    const { branchIds, initialDate, endDate, saleBy, productId, initialHour, endHour } = req.query

    if (!branchIds || !initialDate || !endDate) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos' })
    }

    const branchIdsArray = Array.isArray(branchIds)
      ? (branchIds as string[])
      : [branchIds as string]

    await excelCore.exportSalesToExcel(
      {
        branchIds: branchIdsArray,
        initialDate: initialDate as string,
        endDate: endDate as string,
        saleBy: saleBy as string | undefined,
        productId: productId as string | undefined,
        initialHour: initialHour as string | undefined,
        endHour: endHour as string | undefined
      },
      res
    )
  } catch (error) {
    console.error('Error al exportar ventas:', error)
    res.status(500).json({ error: 'Error al generar el archivo Excel' })
  }
})

export default router
