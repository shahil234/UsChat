import { cn } from "../../lib/utils"
export default function Wrapper({children, className}){
    return (
        <div className={cn("px-1 md:px-6 lg:px-8", className)}>
            {children}
        </div>
    )
}