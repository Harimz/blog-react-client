import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { UserResponse } from "@/modules/auth/domain/types";
import { Save } from "lucide-react";
import React, { useRef, useState } from "react";
import { useUpdateAvatar } from "../../api/profile-mutations";

export const SettingsTab = ({ user }: { user: UserResponse }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { mutate: updateAvatar, isPending } = useUpdateAvatar();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Max file size is 2MB");
      return;
    }

    updateAvatar({ file });

    e.target.value = "";
  };

  return (
    <TabsContent value="settings">
      <div className="mx-auto max-w-2xl space-y-6">
        <Card className="shadow-none bg-[#FBF8F3]/25">
          <CardHeader>
            <CardTitle className="text-lg">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button variant="primary">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-none bg-[#FBF8F3]/25">
          <CardHeader>
            <CardTitle className="text-lg">Change Avatar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={
                    user?.avatarUrl ??
                    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                  }
                />
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />

                <Button
                  variant="outline"
                  className="bg-transparent cursor-pointer"
                  disabled={isPending}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {isPending ? "Uploading..." : "Upload New Photo"}
                </Button>

                <p className="mt-1.5 text-xs text-muted-foreground">
                  JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};
