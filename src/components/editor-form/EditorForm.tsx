import { Button, TextField } from "@mui/material"
import './editorForm.css'
import { ImageViewer } from "../ui/ImageViewer/ImageViewer"
import { useState } from "react"
import { type Field } from "./schemas"




export interface Edit {
    onCreate: (data:Record<string, any>) => Promise<any>
    onUpdate: (data:Record<string, any>) => Promise<any>
    onImageSave?: ({image, id}:{image:string, id:number}) => Promise<any>
    fields: string[]
    schema: Record<string, Field>
}

export interface EditorFormProps extends Edit{
    onCancel:  () => void
    selected: Record<string, any> | null
    type: "create" | "update" | null
   
}



export function EditorForm(props:EditorFormProps) {  
    const [file, setFile] = useState<File | null>(null)

    const onFileChange = (file:File | null) => setFile(file)

    const getInitialValue = (key: string) => {
        return props.type === "create" ? "" : props.selected?.[key] || ""
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const jsonData: Record<string, any> = {}

        props.fields.forEach((field) => {
            if (field === "id") return


            if (field === "imageUrl" && file) {
                props.schema[field].transform(file).then((data: string)  => {props.onImageSave?.({image:data, id: props.selected?.id})})
                .finally(() => setFile(null))
                return
            }
            const value  = formData.get(field)

            if(value) jsonData[field] = props.schema[field].transform(value)
        })
    
        props.type === "create" ? props.onCreate({...jsonData}) : props.onUpdate({...jsonData, id: props.selected?.id,})
  }


    const renderImageInput = (field: string) => {
        if(props.type === "update") return <ImageViewer onFileChange={onFileChange} name="image" initial={getInitialValue(field)}/>
        return null
    }


    return <div className="form-wrapper">
        <form id="editorForm" className="editor-form" onSubmit={handleSubmit}>
            {props.fields.map(el => {
                if(props.schema[el]?.CustomComponent) {
                    return props.schema[el].CustomComponent(getInitialValue(el))
                }
                if(el === "imageUrl") return renderImageInput(el)

                return <TextField name={el} label={el} key={el} defaultValue={getInitialValue(el)} />
            })}
    </form>
        <div className="editor_btns">
            <Button fullWidth color='info' variant='contained' onClick={props.onCancel}>Отмена</Button>
            <Button form="editorForm" fullWidth color='warning' variant='contained' type="submit">Сохранить</Button>
        </div>
    </div>
}

