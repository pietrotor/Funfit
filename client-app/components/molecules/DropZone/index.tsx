import { Button } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import IconSelector from '@/components/atoms/IconSelector'

type DropZoneProps = {
  onChange?: (file: File | null) => void
  value?: string | File
}

export const DropZone = ({ onChange, value }: DropZoneProps) => {
  const [initialValue, setInitialValue] = useState<string | null>(null)

  useEffect(() => {
    if (typeof value === 'string') {
      setInitialValue(value)
    } else {
      setInitialValue(null)
    }
  }, [value])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file: File = acceptedFiles[0]
      if (file && onChange) {
        onChange(file)
      }
    },
    [onChange]
  )
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        'image/jpeg': [],
        'image/png': []
      },
      onDrop
    })

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ))

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ))

  return (
    <section className="container my-1">
      {(acceptedFileItems.length && value) || initialValue ? (
        <div className="flex flex-col justify-center">
          {initialValue ? (
            <img className="m-auto" src={initialValue} />
          ) : (
            <img className="m-auto" src={URL.createObjectURL(value as any)} />
          )}
          <Button
            color="primary"
            className="m-auto mt-3 flex items-center gap-2 text-xs"
            onClick={() => {
              onChange?.(null)
              setInitialValue(null)
            }}
          >
            <IconSelector name="CrossArrowsY" width="w-4" height="h-4" />
            Cambiar imagen
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps({
            className:
              ' border-dashed border-gray-300 hover:border-gray-500 border-2 p-5 rounded-md items-center cursor-pointer '
          })}
        >
          <input {...getInputProps()} />
          <p>
            Arrastra y suelta tu imagen aquí o haz click para cargar una imagen
          </p>
          <em>(Solo imagenes *.jpeg y *.png serán aceptadas)</em>
        </div>
      )}
      <aside>
        {fileRejectionItems.length > 0 && (
          <h4 className="text-red-400">Error al cargar subir la imagen</h4>
        )}
      </aside>
    </section>
  )
}
