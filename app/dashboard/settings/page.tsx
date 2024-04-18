import { SubmitButton } from "@/app/components/Submitbuttons";
import prisma from "@/app/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

async function getData({ userId }: { userId: string }) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      colorScheme: true,
    },
  });
  return data;
}

export default async function SettingsPAge() {
  const authInfo = auth();

  const userData = await getData({ userId: authInfo?.userId as string });

  async function postData(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const colorScheme = formData.get("color") as string;
    const data = await prisma.user.update({
      where: {
        id: authInfo?.userId as string,
      },
      data: {
        name: name,
        colorScheme: colorScheme,
      },
    });

    revalidatePath("/", "layout");
  }

  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Settings</h1>
          <p className="text-lg text-muted-foreground">Your Profile Settings</p>
        </div>
      </div>
      <Card>
        <form action={postData}>
          <CardHeader>
            <CardTitle>General Data</CardTitle>
            <CardDescription>
              Please provide general information about yourself. Please don't
              forget to save
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <label>Your Name</label>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  defaultValue={userData?.name ?? undefined}
                />
              </div>
              <div className="space-y-1">
                <label>Your Email</label>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  disabled
                  defaultValue={userData?.email ?? undefined}
                />
              </div>
              <div className="space-y-1">
                <label>Color Schema</label>
                <Select name="color" defaultValue={userData?.colorScheme}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Color" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="theme-green">Green</SelectItem>
                      <SelectItem value="theme-blue">Blue</SelectItem>
                      <SelectItem value="theme-violet">Violet</SelectItem>
                      <SelectItem value="theme-yellow">Yellow</SelectItem>
                      <SelectItem value="theme-orange">Orange</SelectItem>
                      <SelectItem value="theme-red">Red</SelectItem>
                      <SelectItem value="theme-rose">Rose</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
