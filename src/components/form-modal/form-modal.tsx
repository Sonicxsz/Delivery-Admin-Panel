import { Modal } from "@mui/material";
import { useEditorContext } from "../../pages/EditorPage/useEditorContext";
import { EditorForm, type Edit } from "../editor-form/EditorForm";

export function FormModal(props:Edit){
    const contextData = useEditorContext()


    if(!contextData) return;

    return <Modal onClose={contextData.onCloseModal} open={Boolean(contextData.formType)}>
        <div className="form-modal">
            <EditorForm {...props} refresh={contextData.refreshList} type={contextData.formType} selected={contextData.selected} onCancel={contextData.onCloseModal}/>
        </div>
    </Modal>
}