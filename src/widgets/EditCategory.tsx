import { http } from "../app/http/http"
import { CategoryFields, CategorySchema } from "../components/editor-form/schemas"
import { ItemsList } from "../components/items-list/ItemsList"
import { FormModal } from "../pages/EditorPage/EditorPage"
import { CategoryService } from "../services/CategoryService"




export function EditCategory(){
    const categoryService =  CategoryService.getInstance(http)


    return <>
              <ItemsList loadItems={categoryService.getCategories}/>
              <FormModal fields={CategoryFields} schema={CategorySchema} onCreate={categoryService.createCategory} onUpdate={categoryService.updateCategory} />
            </>
}