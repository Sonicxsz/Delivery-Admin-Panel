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


    static getInstance(http: Http) {
        if (!CatalogService.instance) {
          CatalogService.instance = new CatalogService(http)
        }
        return CatalogService.instance
    }

    loadCatalog = async () => {
        return (await this.http.get<Catalog[]>("/catalog/all")).data
    }

    addImage = async (body:{id: number, image:string}) => {
        return await http.post<string>("/catalog/add-image", body)
    }

    updateCatalogItem = async (body:Record<string,any>) => { 
      return (await http.patch("/catalog", body))
    }

    createCatalogItem = async (body:Record<string,any>) => { 
      return (await http.post("/catalog", body))
    }
  
}
