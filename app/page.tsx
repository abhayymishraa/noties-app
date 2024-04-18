'use client'

import { Button } from "@/components/ui/button";
import { auth, useAuth} from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";

export default function Home() {

  const { userId } = useAuth()
  const router = useRouter()
  
 const signup = ()=> router.push('/auth/sign-up')
 const handledashboard = ()=> router.push('/dashboard')
  return (
    <section className="flex items-center justify-center bg-background h-[90vh]">
      <div className="relative items-center w-full px-5 py- mx-auto lg:px-16 max-w-7xl md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <span className="w-auto px-6 py-3 rounded-full bg-secondary">
              <span className="text-sm font-medium text-pretty text-primary">
                Sort Your Notes Easily
              </span>
            </span>
            <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
              Create Notes With Ease
            </h1>
            <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground text-pretty">
              Tracking that is too tight can make text hard to read and
              cluttered. Different fonts have different sizes and shapes, so
              they require different levels of
            </p>
          </div>
          <div className="flex justify-center max-w-sm mx-auto mt-10">
            {!userId ? (
              <Button
                onClick={signup}
                size={"lg"}
                className="w-full"
              >
                Sign Up For Free
              </Button>
            ) : (
              <Button size={"lg"} onClick={handledashboard} className=" w-full">Dashboard</Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
