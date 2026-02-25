import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Database,
  LayoutDashboard,
  User,
  UserPlus,
  LogIn,
  Upload,
  Info,
  Tag,
  Lock,
  Globe,
  ArrowLeft,
  CheckCircle2,
  FileCode,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { NavLink } from "@/components/NavLink";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const accountLinks = [
  { label: "Home", icon: LayoutDashboard, to: "/" },
  { label: "Profile", icon: User, to: "/dashboard#profile-info" },
  { label: "Submit a dataset", icon: UserPlus, to: "/submit-dataset" },
];

const SubmitDataset = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [sourceType, setSourceType] = useState<"url" | "upload">("url");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const validateUrl = (value: string) => {
    setUrl(value);
    if (value && !value.toLowerCase().endsWith(".csv") && !value.toLowerCase().endsWith(".json")) {
      setUrlError("URL must end with .csv or .json");
    } else {
      setUrlError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sourceType === "url" && urlError) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Dataset submitted successfully!", {
        description: "Your dataset is being processed and will be visible soon.",
      });
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen" style={{ background: "linear-gradient(135deg, #0b0f2a 0%, #0c1344 50%, #080d24 100%)" }}>
      {/* ── Sidebar ── */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900/50 backdrop-blur-xl border-r border-white/5 p-6 flex flex-col z-40">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Database className="h-5 w-5 text-primary fill-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">FData</span>
        </div>

        <nav className="flex-1 space-y-1">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-8 mb-4 px-2">Account</p>
          {accountLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-400 transition-all hover:bg-white/5"
              activeClassName="bg-blue-600/10 text-white font-medium shadow-[inset_0_0_0_1px_rgba(37,99,235,0.2)]"
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-white/5">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500 transition-all hover:bg-red-500/10 font-medium"
              >
                <LogIn className="w-4 h-4" />
                Log Out
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#0c1344] border-white/10">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-slate-400">
                  You will be signed out of your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-white/5 text-white border-white/10 hover:bg-white/10">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Log Out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen overflow-y-auto">
        <main className="flex-1 px-8 py-10 max-w-4xl mx-auto w-full">
          <form onSubmit={handleSubmit} className="space-y-8">
            <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md overflow-hidden">
              <div className="h-1.5 w-full bg-blue-600"></div>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 text-blue-400 mb-1">
                  <Info className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Basic Information</span>
                </div>
                <CardTitle className="text-2xl text-white">Dataset Details</CardTitle>
                <CardDescription className="text-slate-400">
                  Provide a name and description for your dataset to help others understand it.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-200">Dataset Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Global Temperature Anomalies 2023"
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-200">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="What's in this dataset? How was it collected?"
                    className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-slate-200">Tags</Label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                      id="tags"
                      placeholder="csv, climate, global"
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 text-purple-400 mb-1">
                  <FileCode className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Data Source</span>
                </div>
                <CardTitle className="text-2xl text-white">Upload or Link Data</CardTitle>
                <CardDescription className="text-slate-400">
                  Choose how you want to provide your data files.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="url" className="w-full" onValueChange={(v) => setSourceType(v as "url" | "upload")}>
                  <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10 mb-6 p-1 h-12">
                    <TabsTrigger value="url" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400 gap-2">
                      <Link2 className="w-4 h-4" />
                      External URL
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400 gap-2">
                      <Upload className="w-4 h-4" />
                      File Upload
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="url" className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
                    <div className="space-y-2">
                      <Label htmlFor="url" className="text-slate-200">Dataset URL (GitHub/External)</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <Input
                          id="url"
                          type="url"
                          value={url}
                          onChange={(e) => validateUrl(e.target.value)}
                          placeholder="https://github.com/user/repo/data.csv"
                          className={`pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20 ${urlError ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : ''}`}
                          required={sourceType === "url"}
                        />
                      </div>
                      {urlError ? (
                        <p className="text-xs text-red-400 mt-1">{urlError}</p>
                      ) : (
                        <p className="text-xs text-slate-500 mt-1">Hint: URL must end with .csv or .json</p>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="upload" className="focus-visible:outline-none focus-visible:ring-0">
                    <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer group">
                      <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-blue-500" />
                      </div>
                      <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                      <p className="text-slate-500 text-sm">Max file size: 100MB (Supported: CSV, JSON)</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <Lock className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Privacy & Access</span>
                </div>
                <CardTitle className="text-2xl text-white">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${isPublic ? 'bg-emerald-500/10' : 'bg-slate-500/10'}`}>
                      {isPublic ? <Globe className="w-5 h-5 text-emerald-500" /> : <Lock className="w-5 h-5 text-slate-500" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">Public Dataset</p>
                      <p className="text-xs text-slate-400">Anyone can view and download this dataset</p>
                    </div>
                  </div>
                  <Switch
                    checked={isPublic}
                    onCheckedChange={setIsPublic}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-200">License</Label>
                  <Select defaultValue="mit">
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10 text-white">
                      <SelectItem value="mit">MIT License</SelectItem>
                      <SelectItem value="cc0">Creative Commons (CC0)</SelectItem>
                      <SelectItem value="apache">Apache 2.0</SelectItem>
                      <SelectItem value="other">Custom License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="bg-white/5 px-8 py-6 flex justify-between items-center mt-4">
                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  All fields marked with * are required
                </p>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-slate-400 hover:text-white hover:bg-white/5"
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl font-bold shadow-lg shadow-blue-600/20"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Submitting...
                      </span>
                    ) : (
                      "Submit Dataset"
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </main>
      </div>
    </div>
  );
};

export default SubmitDataset;
