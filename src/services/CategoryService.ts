import type { Http } from "./AuthService";
import { http } from "../app/http/http"

export type Category = {id: number, code: string, name:string }

export class CategoryService {
    private static instance: CategoryService
    private http: Http
    private categories: Array<Category> = []

    private constructor(http: Http) {
        this.http = http
    }
    
    static getInstance() {
        if (!CategoryService.instance) {
            CategoryService.instance = new CategoryService(http)
        }
        return CategoryService.instance
    }


    getCategories = async() =>  {
        const resp  = await this.http.get<Array<Category>>("/category/all")
        this.categories = resp.data
        return this.categories
    }


    createCategory = async(data:Record<string, any>) => {
        const resp  = await this.http.post<Category>("/category", data)
        return resp
    }

    deleteCategory = async(id:string) => {
        const resp = await this.http.delete<Category>(`/category/${id}`)

        return resp
    }

}

