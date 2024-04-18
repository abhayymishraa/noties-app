import { StripeSubscriptionCreationButton } from "@/app/components/Submitbuttons";
import prisma from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { getStripeSession } from "@/app/lib/stripe";
import { auth } from "@clerk/nextjs";
import { CheckCircle2 } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const featureItems = [
  { name: "Low Cost" },
  { name: "Fast Service" },
  { name: "Actively Support" },
  { name: "Fast and Smooth Exprience" },
  { name: "Unlimited Storage" },
];

async function getData(userId: string) {
  try {
    const data = await prisma.subscription.findUnique({
      where: {
        userId: userId,
      },
      select: {
        status: true,
        user: {
          select: {
            stripeCustomerId: true,
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}

const Page = async () => {
  const { userId } = auth();
  const data = await getData(userId as string);

  async function createSubscription() {
    "use server";

    console.log("subscriptionn created");
    const dbUser = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!dbUser?.stripeCustomerId) {
      throw new Error("unable to get customer id");
    }

    console.log(dbUser.stripeCustomerId);
    const subscriptionUrl = await getStripeSession({
      customerId: dbUser.stripeCustomerId,
      domainUrl:
        process.env.NODE_ENV === "production"
          ? (process.env.PRODUCTION_URL as string)
          : "http://localhost:3000",
      priceId: process.env.STRIPE_PRICE_ID as string,
    });

    return redirect(subscriptionUrl);
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card className="flex flex-col">
        <CardContent className="py-8">
          <div>
            <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary">
              Monthly
            </h3>
          </div>

          <div className="mt-4 flex items-baseline text-6xl font-extrabold">
            $5 <span className="ml-1 text-2xl text-muted-foreground">/mo</span>
          </div>
          <p className="mt-5 text-lg text-muted-foreground">
            Support us just only for 5$ monthly
          </p>
        </CardContent>
        <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-10 sm:pt-6">
          <ul className="space-y-4">
            {featureItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <p className="ml-3 text-base">{item.name}</p>
              </li>
            ))}
          </ul>

          <form className="w-full" action={createSubscription}>
            <StripeSubscriptionCreationButton />
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Page;
