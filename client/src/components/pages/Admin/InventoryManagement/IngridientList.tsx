import { IngridientContext } from '@/context/IngridientsContext/IngridientsContext'
import LoadingPage from '@/pages/LoadingPage'
import { IngridientType } from '@/types/Ingridient'
import { useContext } from 'react'
import { BASE_IMAGE_URL } from '@/utils/api'
import { format } from 'date-fns'

interface IngridientListProps {
  type: IngridientType
}

export default function IngridientList({ type }: IngridientListProps) {
  const { ingridients, isLoading } = useContext(IngridientContext)

  if (isLoading) return <LoadingPage />
 
  return (
    <div>
        <div className='flex flex-col gap-2'>
          {
            ingridients.length !== 0 &&
            ingridients
              .filter(item => item.type === type)
              .map(ingridient => {
                return <div key={ingridient.id} className='w-full flex gap-4 border rounded-sm p-4'>
                  <img src={`${BASE_IMAGE_URL}${ingridient.image_path}`} className='w-20 h-20 rounded-sm object-cover object-center' />
                  <div className='flex justify-between w-full'>
                    <div>
                      <p className='text-sm min-w-32.5 font-bold'>{ingridient.name}</p>
                     
                    </div>
                    
                    <div className='flex gap-10'>
                      <div>
                        <div className='flex justify-between w-50'>
                          <p className='text-sm text-muted-foreground'>Quantity: </p>
                          <p className='text-sm'>x{ingridient.stock_quantity}</p>
                        </div>
                        <div className='flex  justify-between'>
                          <p className='text-sm text-muted-foreground'>Unit: </p>
                          <p className='text-sm'>{ingridient.unit}</p>
                        </div>
                        <div className='flex  justify-between'>
                          <p className='text-sm text-muted-foreground'>Expiration: </p>
                          <p className='text-sm'>{ingridient.expiration_date ? format(ingridient.expiration_date, 'yyyy-MM-dd') : "N/A"}</p>
                        </div>
                      </div>
                      
                    </div>
                    
                  </div>
                </div>
              }
            )
          }
        </div>
    </div>
  )
}
