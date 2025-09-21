import { useEffect, useState } from "react"
import { EditorEmitter, useEditorContext } from "../../pages/EditorPage/EditorPage"
import './items-list.css'
import { DataGrid } from "@mui/x-data-grid"
import { getKeys } from "./helpers"




export function ItemsList({loadItems}:{
    loadItems: () => Promise<any[]>
}) {
    const contextData = useEditorContext()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any[]>([])


    useEffect(() => {
        setLoading(true)
        loadItems().then(data => {
            setData(data)
        }).finally(() => setLoading(false))
    }, [contextData?.refresh])



    const fields = getKeys(data)

    

    return  <DataGrid
                loading={loading}
                rows={data}
                columns={fields}
                pageSizeOptions={[20, 50]}
                onRowClick={(e) => contextData?.setSelected(e.row)}
                onRowDoubleClick={() => EditorEmitter.emit("OnRowDbClick")}
                sx={{ border: 0, padding: '1rem' }}
                
            />
  
}



