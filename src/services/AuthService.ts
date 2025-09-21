
interface BaseResponse<T> {
    success: boolean,
    code: number,
    data: T
}

export interface Http {
    post: <T>(url: string, data?: any) => Promise<BaseResponse<T>>
    get: <T>(url: string) => Promise<BaseResponse<T>>
}

export class AuthService {
    private static instance: AuthService
    private http: Http
    private isAuthorized = false;

    private constructor(http: Http) {
        this.http = http
    }
    

    static getInstance(http: Http) {
        if (!AuthService.instance) {
        AuthService.instance = new AuthService(http)
        }
        return AuthService.instance
    }

    login(email:string, password: string){
        const body = JSON.stringify({email, password})
        
        this.http.post("/user/login", body).then(data => console.log(data))
    }

    authByCookie = async () => {
        await this.http.get("/user")

        this.isAuthorized = true
    }

    getIsAuthorized() {
        return this.isAuthorized
    }


    logout() {
        document.cookie = ``   
        this.isAuthorized = false
    }
    


}

