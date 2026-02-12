import { useState } from "react";

import { useMe } from "@/modules/auth/api/auth-queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsTab } from "../components/settings-tab";
import { MyPostsSection } from "../sections/my-posts-section";

export const ProfileView = () => {
  const { data: user } = useMe();

  if (!user) return null;

  return (
    <div className="max-w-400 w-[95%] mx-auto mt-10">
      <div className="flex gap-4 items-center">
        <div className="h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={
              user?.avatarUrl ??
              "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            }
          />
        </div>

        <div className="space-y-2">
          <h1 className="font-bold text-2xl">{user?.name}</h1>

          <p className="text-muted-foreground">{user?.email}</p>

          <p className="text-muted-foreground">
            Member since{" "}
            {new Date(user!.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <Tabs defaultValue="settings" className="w-full  mt-6">
        <TabsList className="mb-8 justify-start rounded-none border-b border-border bg-transparent p-0">
          <TabsTrigger
            value="settings"
            className="cursor-pointer rounded-none border-b-2 border-transparent px-6 py-3 text-sm font-medium text-muted-foreground data-[state=active]:border-b-custom-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Settings
          </TabsTrigger>

          <TabsTrigger
            value="posts"
            className="cursor-pointer rounded-none border-b-2 border-transparent px-6 py-3 text-sm font-medium text-muted-foreground data-[state=active]:border-b-custom-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            My Posts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <SettingsTab user={user} />
        </TabsContent>

        <TabsContent value="posts">
          <MyPostsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};
