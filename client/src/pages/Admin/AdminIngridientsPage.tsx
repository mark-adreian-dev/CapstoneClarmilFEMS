import { DataTable } from "@/components/data-table"
import { ingridientColumn } from "@/components/data-table-components/Columns/IngridientColumns"
import IngridientActionButtons from "@/components/pages/Admin/InventoryManagement/IngridientActionButtons"
import { IngridientContext } from "@/context/IngridientsContext/IngridientsContext"
import { IngridientsCategory, IngridientType, type Ingridient } from "@/types/Ingridient"
import { useContext, useEffect, useState } from "react"
import IngridientList from "@/components/pages/Admin/InventoryManagement/IngridientList"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AdminIngridientsPage() {
  const { fetchAllIngridientsData, ingridients, activeTab, onTabChange } = useContext(IngridientContext)
  const [ingridientsData, setIngridientsData] = useState<Ingridient[]>([])

  useEffect(() => {
    fetchAllIngridientsData()
  }, [fetchAllIngridientsData])

  useEffect(() => {
    setIngridientsData(ingridients)
  }, [ingridients])

  useEffect(() => {
    switch (activeTab) {
      case IngridientsCategory.ALL:
        setIngridientsData(ingridients)
        return;
      case IngridientsCategory.BASE:
        setIngridientsData(ingridients.filter(ingridients => ingridients.type === IngridientType.BASE))
        return;
      case IngridientsCategory.ADDITIONAL:
        setIngridientsData(ingridients.filter(ingridients => ingridients.type === IngridientType.ADDITIONAL))
        return;
      default:
        setIngridientsData(ingridients)
    }
  }, [activeTab, ingridients])

  return (
    <div className="h-full">
      <h1 className="text-6xl font-black px-4 mb-8" >Inventory Management</h1>
      <div className="w-full xl:flex">
        <DataTable
          placeholder="Search ingridient..."
          data={ingridientsData}
          columns={ingridientColumn}
          ActionButton={IngridientActionButtons}
          activeTab={activeTab}
          onTabChange={onTabChange}
          category={IngridientsCategory}
          searchColumn={"name"}
        />
        
        <div className="pl-4 w-full xl:pl-0 xl:w-[70%] gap-20">
          <h1 className="text-2xl font-black mb-5">Ingridients List</h1>
          <ScrollArea className="h-screen pr-4">
            {
              activeTab === IngridientsCategory.ALL && 
                <div className="flex flex-col gap-2">
                  <IngridientList type={IngridientType.BASE} />
                  <IngridientList type={IngridientType.ADDITIONAL} />
                </div>
            }
            {
              activeTab === IngridientsCategory.BASE &&
              <IngridientList type={IngridientType.BASE} />
            }
            {
              activeTab === IngridientsCategory.ADDITIONAL &&
              <IngridientList type={IngridientType.ADDITIONAL} />
            }
            
          </ScrollArea>
          </div>
      </div>
      
    </div>
  )
}
