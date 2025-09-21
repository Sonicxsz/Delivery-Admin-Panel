import { http } from "../app/http/http"
import { CatalogFields, CatalogSchema } from "../components/editor-form/schemas"
import { ItemsList } from "../components/items-list/ItemsList"
import { FormModal } from "../pages/EditorPage/EditorPage"
import { CatalogService } from "../services/CatalogService"




export function EditCatalog(){
    const catalogService =  CatalogService.getInstance(http)


    return <>
              <ItemsList loadItems={catalogService.loadCatalog}/>
              <FormModal fields={CatalogFields} schema={CatalogSchema}  onImageSave={catalogService.addImage} onCreate={catalogService.createCatalogItem} onUpdate={catalogService.updateCatalogItem} />
            </>
}