import { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { EditorEmitter } from "../../pages/EditorPage/EditorPage"
import { getKeys } from "./helpers"
import { useEditorContext } from "../../pages/EditorPage/useEditorContext"

import './items-list.css'




export function ItemsList({loadItems, name}:{
    loadItems: () => Promise<any[]>
    name:string
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
                onRowClick={(e) => {
                    contextData?.setSelected({...e.row, editorName: name})
                }}
                onRowDoubleClick={() => EditorEmitter.emit("OnRowDbClick")}
                sx={{ border: 0, padding: '1rem' }}
            />
  
}



