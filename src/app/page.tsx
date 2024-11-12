import ChatLayout from "@/components/chat/ChatLayout";
import PreferencesTab from "@/components/PreferencesTab";
import { User } from "@/db/dummy";
import { redis } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getUsers(): Promise<User[]> {
  const userKeys: string[] = [];
  let cursor = "0";

  do {
    const [nextCursor, keys] = await redis.scan(cursor, {
      match: "user:*",
      type: "hash",
      count: 100,
    });
    cursor = nextCursor;
    userKeys.push(...keys);
  } while (cursor !== "0");

  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  const pipeline = redis.pipeline();
  userKeys.forEach((key) => pipeline.hgetall(key));
  const results = (await pipeline.exec()) as User[];

  const users: User[] = [];
  for (const user of results) {
    if (user.id !== currentUser?.id) {
      users.push(user);
    }
  }
  return users;
}

export default async function Home() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) return redirect("/auth");

  const users = await getUsers();

  return (
    <main className="flex h-screen flex-col items-center justify-center p-4 md:px-24 py-32 gap-4">
      <PreferencesTab />

      <div
        className="absolute inset-0 -z-10 h-full w-full bg-white 
  bg-[radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] 
  dark:bg-[#000000] dark:bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
        aria-hidden="true"
      />

      <div className="z-10 border rounded-lg max-w-5xl w-full min-h-[85vh] text-sm lg:flex">
        <ChatLayout defaultLayout={defaultLayout} users={users} />
      </div>
    </main>
  );
}
