

import { ReactNode } from "react";
import { DashboardNav } from "../components/DashboardNav";
import prisma from "../lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { stripe } from "@/app/lib/stripe";


async function getdata({id , email}:{id:string ,email:string}) {
    try{
    const user = await prisma.user.findFirst({
        where:{
            id: id
        },
        select:{
            id:true,
            stripeCustomerId:true
        }
    })

    if(!user){
        await prisma.user.create({
            data:{
                id:id,
                email: email
            }
        })
    }


    if(!user?.stripeCustomerId){
        const data = await stripe.customers.create({
            email: email
        })

        await prisma.user.update({
            where:{
                id:id
            },
            data:{
                stripeCustomerId: data.id
            }
        })
    }
} catch(error){
    console.log(error)
}

}

export default async function DashboardLayout({children}:{children: ReactNode}) {
    const user = await currentUser()
   const ids = user?.id as string
   const mail = user?.emailAddresses[0].emailAddress as string
    await getdata({ id: ids, email: mail });

    
    return(
        <div className="flex  gap-12 mt-10 ml-12 ">
            <div className="basis-1/5">
            <DashboardNav/>
            </div>
            <div className="basis-4/5">
               {children}
            </div>
        </div>
    )
}
