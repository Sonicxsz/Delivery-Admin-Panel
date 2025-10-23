import { CatalogFields, CatalogSchema } from "../components/editor-form/schemas"
import { FormModal } from "../components/form-modal/form-modal"
import { ItemsList } from "../components/items-list/ItemsList"
import { CatalogService } from "../services/CatalogService"




export function EditCatalog(){
    const catalogService =  CatalogService.getInstance()
    

    return <>
              <ItemsList loadItems={catalogService.loadCatalog} name="EditCatalog" />
              <FormModal fields={CatalogFields} schema={CatalogSchema}  onImageSave={catalogService.addImage} onCreate={catalogService.createCatalogItem} onUpdate={catalogService.updateCatalogItem} />
            </>
}