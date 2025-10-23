import { create } from "zustand"

export interface BaseResponse<T> {
    success: boolean,
    code: number,
    data: T
}

type Store = {
        isAuth: boolean
        setAuth: (val: boolean) => void
    }


type UserData = {
    email: string
    username: string
}

export interface Http {
    post: <T>(url: string, data?: any) => Promise<BaseResponse<T>>
    get: <T>(url: string) => Promise<BaseResponse<T>>
    delete: <T>(url: string, data?: any) => Promise<BaseResponse<T>>
    patch: <T>(url: string, data?: any) => Promise<BaseResponse<T>>
}


export class AuthService {
    private static instance: AuthService
    private http: Http
    private constructor(http: Http) {
        this.http = http
    }

    user: UserData | null =  null
    
    store = create<Store>((set) => ({
        isAuth: true, 
        setAuth: (val: boolean) => set({ isAuth: val })
    }))

    static getInstance(http: Http) {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService(http)
        }
        return AuthService.instance
    }

    login = async (email:string, password: string) => {
        const resp = await this.http.post("/user/login", {email, password})

        if(resp.success) {
            this.store.getState().setAuth(true)
        }
    }

    authByCookie = async () => {
        const resp = await this.http.get<UserData>("/user")
        if(resp.success) {
            this.store.getState().setAuth(true)
            this.user = resp.data
        }
    }   

    logout() {
        document.cookie = ``   
        this.store.getState().setAuth(false)
        this.user = null
    }

}

