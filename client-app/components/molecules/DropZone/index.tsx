import { useDropzone } from 'react-dropzone'

export const DropZone = () => {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': []
    }
  })

  const acceptedFileItems = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
  ))

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map(e => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
  ))

  return (
      <section className="container my-6">
        <div {...getRootProps({ className: ' border-dashed border-gray-300 hover:border-gray-500 border-2 p-5 rounded-md items-center cursor-pointer ' })}>
          <input {...getInputProps()} />
          <p>Arrastra y suelta tu imagen aquí o haz click para cargar una imagen</p>
          <em>(Solo imagenes *.jpeg y *.png serán aceptadas)</em>
        </div>
        <aside>
          { acceptedFileItems.length > 0 &&
              <h4 className='text-green-400'>Imagen subida correctamente</h4>
          }
          {fileRejectionItems.length > 0 &&
              <h4 className='text-red-400'>Error al cargar subir la imagen</h4>
          }
        </aside>
      </section>
  )
}
