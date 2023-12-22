type TableLoaderType = {
    columns?: number;
    rows?: number;
}
const TableLoader = ({ columns = 5, rows = 5 }: TableLoaderType) => {
  const buildRow = () => {
    const skeleton = []
    for (let i = 0; i < columns; i++) {
      skeleton.push(
                <td key={i} className="flex justify-center border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap py-3">
                    <div className="h-5 bg-gray-200 rounded-lg"></div>
                </td>
      )
    }
    return skeleton
  }
  return (
        <>
        {
            Array(rows).fill(0).map((_, index) => (
                <tr key={index} className="animate-pulse">
                    {buildRow()}
                </tr>
            ))
        }
        </>
  )
}

export default TableLoader
