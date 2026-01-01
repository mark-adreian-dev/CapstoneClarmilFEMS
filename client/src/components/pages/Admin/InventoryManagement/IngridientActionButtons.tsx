import IngridientForm from './IngridientForm'
import { FormType } from '@/types/ComponentTypes/Form'

export default function IngridientActionButtons() {
  return (
    <>
      <IngridientForm type={FormType.ADD}/>
    </>
  )
}
