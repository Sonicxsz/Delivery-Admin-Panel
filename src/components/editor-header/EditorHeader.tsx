import { useState } from "react";
import './editor-header.css'
import { EditorEmitter } from "../../pages/EditorPage/EditorPage";
import { Button, Modal } from "@mui/material";



export function EditorHeader({isRowSelected}:{isRowSelected:boolean}){
    const [confirm, setConfirm] = useState(false)
    const onCancel = () => setConfirm(false)
    const openConfirmModal = () => setConfirm(true)


    const onCreate = () => EditorEmitter.emit("OnCreate")
    const onChange = () => EditorEmitter.emit("OnChange")
    const onDelete = () => EditorEmitter.emit("OnDelete")
    const onRefresh = () => EditorEmitter.emit("OnRefresh")
    


    return <div className="editor-header-wrapper">
        <Button onClick={onRefresh} variant="contained" color="success">Обновить список</Button>
        <div className="editor-header__action-group">
            <Button onClick={openConfirmModal} disabled={!isRowSelected} color="error" variant='contained'>Удалить</Button>
            <Button disabled={!isRowSelected} onClick={onChange}  variant="contained">Изменить</Button>
            <Button onClick={onCreate} variant="contained">Добавить</Button>
        </div>
       <ComfirmWindow open={confirm} onCancel={onCancel} onAccept={onDelete}/>
    </div>
}



function ComfirmWindow({open, onAccept, onCancel}:{open: boolean; onCancel: () => void, onAccept: () => void}){

    return <Modal onClose={onCancel} open={open}> 
                <div className="confirm-window__content">
                        <h2>Вы уверены что хотите удалить?</h2>
                        <Button onClick={onAccept} color="error" variant='contained'>Да, удалить</Button>
                        <Button onClick={onCancel}  variant='contained'>Отмена</Button>
                </div>
            </Modal>

}