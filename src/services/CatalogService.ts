import { http } from "../app/http/http"
import type { Http } from "./AuthService"


export type Catalog = {
  id:number,
  imageUrl: string,
  weight: number,
  price: number,
  name: string,
  amount: number,
  discount_percent: number,
  sku:string,
  category_id: number,
  description: string
};



export class CatalogService {
     private static instance: CatalogService
     private http: Http
  
     private constructor(http: Http) {
          this.http = http
      }


    static getInstance() {
        if (!CatalogService.instance) {
          CatalogService.instance = new CatalogService(http)
        }
        return CatalogService.instance
    }

    loadCatalog = async () => {
        return (await this.http.get<Catalog[]>("/items/all")).data
    }

    addImage = async (body:{id: number, image:string}) => {
        return await this.http.post<string>("/items/add-image", body)
    }

    updateCatalogItem = async (body:Record<string,any>) => { 
      return (await this.http.patch("/items", body))
    }

    createCatalogItem = async (body:Record<string,any>) => { 
      return  (await this.http.post("/items", body))
    }

    deleteCatalogItem = async (id:number) => {
      return (await this.http.delete(`/items/${id}`))
    }
  
}
