import { ReactNode } from "react";

export default function Layout({children}:{children: ReactNode}) {
    return(
        <div className="container w-full h-[80vh] flex items-center justify-center" >
          {children}
        </div>
    )
}