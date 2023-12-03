import InformationCard from '@/components/molecules/Card/InformationCard'
import ClientLayout from '@/components/templates/ClientLayout/ClientLayout'

function GratitudePage() {
  return (
    <div className="h-full">
      <ClientLayout>
        <InformationCard
          title="¡Gracias por elegir FunFit!"
          description="Su compra ha sido exitosa y está en camino."
          buttonText="Regresar a la tienda"
          buttonDestination="/"
        />
      </ClientLayout>
    </div>
  )
}
export default GratitudePage
