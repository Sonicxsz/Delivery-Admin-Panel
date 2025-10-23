import { CategoryFields, CategorySchema } from "../components/editor-form/schemas"
import { FormModal } from "../components/form-modal/form-modal"
import { ItemsList } from "../components/items-list/ItemsList"
import { CategoryService } from "../services/CategoryService"




export function EditCategory(){
    const categoryService =  CategoryService.getInstance()


    return <>
              <ItemsList loadItems={categoryService.getCategories} name="EditCategory" />
              <FormModal fields={CategoryFields} schema={CategorySchema} onCreate={categoryService.createCategory} onUpdate={categoryService.updateCategory} />
            </>
}