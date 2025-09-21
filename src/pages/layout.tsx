import { PathViewer } from "../components/ui/header/PathViewer";

export function Layout({children}:{children:React.ReactNode}){


    return <div className="rootLayout">
        <PathViewer/>
        {children}
    </div>
}