import Navbar from "@/components/landing/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const Profile = () => {
  type AppUser = {
    email?: string;
    user_metadata?: { full_name?: string; avatar_url?: string };
  } | null;
  const [user, setUser] = useState<AppUser>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 pt-28 pb-12">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">Profile</h1>
        <Card className="border-white/10 bg-black/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm">{user?.user_metadata?.full_name || "Guest"}</div>
                <div className="text-xs text-muted-foreground">{user?.email || "guest@example.com"}</div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" defaultValue={user?.user_metadata?.full_name || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" defaultValue={user?.email || ""} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="A short bio" />
            </div>

            <div className="flex justify-end">
              <Button className="rounded-full">Save changes</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
