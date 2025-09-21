export const getKeys = (data: Record<string,string>[]) => {
    if(!data[0]) return []
    
    return Object.keys(data[0]).map((el) => ({
        field: el,
        headerName: el.toUpperCase(),
        with: '150px',
    }))
}