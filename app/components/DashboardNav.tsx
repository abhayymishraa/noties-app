"use client"

import { cn } from "@/lib/utils"
import { CreditCard, HandHeart, Home, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const navItems =  [
    {name: "Home" , href:"/dashboard", icon: Home},
    {name: "Settings" , href:"/dashboard/settings", icon: Settings},
    {name: "Support Us" , href:"/dashboard/support", icon: HandHeart}
]




export const DashboardNav = () => {
    const pathName = usePathname();
    return (
    <nav className="grid items-start gap-2">
         {navItems.map((item,index)=>(
            <Link key={index} href={item.href}>
                <span className={cn("group flex items-center rounded-md px-3 py-2 text-md h-16  font-medium hover:text-accent-foreground", pathName === item.href ? "bg-accent": "bg-transparent")} >
                    <item.icon className="mr-2 h-6 w-6 text-primary" />
                    <span>{item.name}</span>
                </span>
            </Link>
         ))

         }
    </nav>
    )
}