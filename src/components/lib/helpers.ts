
export const getBase64 = (file:File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (event) => {
            if(event.target) resolve(event.target.result)
        }
        reader.onerror = (error) => reject(error)
        reader.readAsDataURL(file)
    })
}