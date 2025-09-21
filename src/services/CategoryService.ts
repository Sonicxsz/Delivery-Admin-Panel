import type { Http } from "./AuthService";

export type Category = {id: number, code: string, name:string }

export class CategoryService {
    private static instance: CategoryService
    private http: Http
    private categories: Array<Category> = []
    private lastLoadTime: number = 0;

    private constructor(http: Http) {
        this.http = http
    }
    
    static getInstance(http: Http) {
        if (!CategoryService.instance) {
            console.log("no instance")
            CategoryService.instance = new CategoryService(http)
             console.log(CategoryService.instance)
        }
        return CategoryService.instance
    }


    getCategories = async() =>  {
        const isNeedRefresh = Date.now() - this.lastLoadTime > 5000
        if(isNeedRefresh) {
            const resp  = await this.http.get<Array<Category>>("/category/all")
            this.categories = resp.data
            this.lastLoadTime = Date.now()
        }
        return this.categories
    }


    createCategory = async(data:Omit<Category, "id">) : Promise<boolean> => {
        const resp  = await this.http.post<Category>("/category", data)

        return resp.success
    }

    updateCategory = async() => {}

}

