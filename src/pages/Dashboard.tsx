import Navbar from "@/components/landing/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Database, Star, Activity, Plus } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-5xl px-4 pt-28 pb-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <Button className="rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            New Item
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-white/10 bg-black/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Database className="h-4 w-4" />
                Total Datasets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">128</div>
              <p className="mt-1 text-xs text-muted-foreground">+4 this week</p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-black/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Star className="h-4 w-4" />
                Favorites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="mt-1 text-xs text-muted-foreground">2 updated recently</p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-black/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Activity className="h-4 w-4" />
                Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">This month</span>
                <Badge variant="secondary" className="rounded-full">72%</Badge>
              </div>
              <Progress value={72} />
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="border-white/10 bg-black/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <p>Viewed dataset: India Pincodes</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <Badge variant="outline" className="rounded-full">view</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <p>Starred dataset: World Cities</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
                <Badge variant="outline" className="rounded-full">star</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <p>Downloaded: Population by State</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
                <Badge variant="outline" className="rounded-full">download</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-black/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button variant="secondary" className="justify-start rounded-2xl">Browse datasets</Button>
              <Button variant="outline" className="justify-start rounded-2xl">View favorites</Button>
              <Button variant="ghost" className="justify-start rounded-2xl">Open recent</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
