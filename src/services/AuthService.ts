
export interface Http {
    post: (url: string, data?: string | undefined) => Promise<any>
}

export class AuthService {
    private static instance: AuthService
    private http: Http

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

}