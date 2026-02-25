import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Table2,
  CreditCard,
  Globe,
  User,
  LogIn,
  UserPlus,
  Activity,
  Zap,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  ChevronRight,
  Car,
  Database,
  Star,
  TrendingUp,
  Bell,
  Mail,
  MessageSquare,
  Package,
  RefreshCcw,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const sidebarLinks = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard", active: true },
  { label: "Tables", icon: Table2, to: "/datasets" },
  { label: "Billing", icon: CreditCard, to: "#" },
  { label: "RTL", icon: Globe, to: "#" },
];

const accountLinks = [
  { label: "Profile", icon: User, to: "/profile" },
  { label: "Sign In", icon: LogIn, to: "#" },
  { label: "Sign Up", icon: UserPlus, to: "#" },
];

const projectImages = [
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80",
];

const MiniChart = ({ color }: { color: string }) => (
  <svg viewBox="0 0 60 30" className="w-16 h-8" fill="none">
    <polyline
      points="0,25 10,18 20,22 30,10 40,15 50,8 60,12"
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CircularProgress = ({ value }: { value: number }) => {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg viewBox="0 0 120 120" className="w-36 h-36">
      <circle cx="60" cy="60" r={r} stroke="#1e2a4a" strokeWidth="10" fill="none" />
      <circle
        cx="60"
        cy="60"
        r={r}
        stroke="url(#grad)"
        strokeWidth="10"
        fill="none"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
      />
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4facfe" />
          <stop offset="100%" stopColor="#00f2fe" />
        </linearGradient>
      </defs>
      <text x="60" y="55" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
        {value}%
      </text>
      <text x="60" y="72" textAnchor="middle" fill="#8899aa" fontSize="9">
        Current load
      </text>
    </svg>
  );
};

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [settings, setSettings] = useState({
    emailFollow: true,
    emailAnswer: false,
    emailMention: true,
    newLaunches: false,
    monthlyUpdates: false,
    newsletter: true,
    weeklyMails: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const toggle = (key: keyof typeof settings) =>
    setSettings((s) => ({ ...s, [key]: !s[key] }));

  return (
    <div className="flex min-h-screen" style={{ background: "linear-gradient(135deg, #0b0f2a 0%, #0c1344 50%, #080d24 100%)" }}>
      {/* ── Sidebar ── */}
      <aside
        className="fixed top-0 left-0 h-full w-60 z-40 flex flex-col pt-6 pb-6 px-4"
        style={{
          background: "linear-gradient(180deg,rgba(15,22,60,0.95) 0%,rgba(8,13,36,0.98) 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-3 mb-8">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <Database className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-base tracking-wide">VISION UI FREE</span>
        </div>

        {/* Main nav */}
        <nav className="flex flex-col gap-1 mb-6">
          {sidebarLinks.map(({ label, icon: Icon, to, active }) => (
            <Link
              key={label}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${active
                  ? "text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
            >
              <span
                className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-200 ${active
                    ? "bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30"
                    : "bg-white/5 group-hover:bg-white/10"
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </span>
              {label}
            </Link>
          ))}
        </nav>

        <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
          Account Pages
        </p>
        <nav className="flex flex-col gap-1">
          {accountLinks.map(({ label, icon: Icon, to }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 group"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all duration-200">
                <Icon className="w-3.5 h-3.5" />
              </span>
              {label}
            </Link>
          ))}
        </nav>

        {/* Help card */}
        <div className="mt-auto">
          <div
            className="rounded-2xl p-4 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg,#2563eb 0%,#7c3aed 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background:
                  "radial-gradient(ellipse at 70% 30%,rgba(255,255,255,0.3) 0%,transparent 70%)",
              }}
            />
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-3">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <p className="text-white font-semibold text-xs mb-0.5">Need help?</p>
              <p className="text-blue-200 text-[10px] mb-3">Please check our docs</p>
              <button className="w-full bg-white text-blue-700 text-[11px] font-semibold rounded-xl py-1.5 hover:bg-blue-50 transition-colors">
                DOCUMENTATION
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="ml-60 flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-8 py-4"
          style={{
            background: "rgba(10,15,40,0.7)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <span>Pages</span>
            <span>/</span>
            <span className="text-white font-medium">Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-400"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Type here...
            </div>

            {/* Avatar → profile */}
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              <Avatar className="h-7 w-7 border border-white/20">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-blue-600 text-[10px]">
                  {user?.user_metadata?.full_name?.[0] || "G"}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs hidden md:block">{user?.user_metadata?.full_name || "Sign in"}</span>
            </button>

            {/* Bell */}
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-blue-500" />
            </button>

            {/* Settings cog */}
            <button className="text-slate-400 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-8 py-6 space-y-6">
          {/* Breadcrumb title */}
          <div>
            <p className="text-xs text-slate-400">Pages / Dashboard</p>
            <h1 className="text-white font-bold text-xl">Dashboard</h1>
          </div>

          {/* ── Row 1: Welcome + Data Cards + Profile Info ── */}
          <div className="grid grid-cols-12 gap-5">
            {/* Welcome card */}
            <div
              className="col-span-12 lg:col-span-3 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[200px]"
              style={{
                background: "linear-gradient(135deg,#1a237e 0%,#283593 40%,#1565c0 100%)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 60% 20%,rgba(100,150,255,0.35) 0%,transparent 65%)",
                }}
              />
              <div className="relative z-10">
                <h2 className="text-white font-bold text-lg leading-tight">Welcome back!</h2>
                <p className="text-blue-200 text-xs mt-1">
                  Nice to see you, {user?.user_metadata?.full_name?.split(" ")[0] || "User"}!
                </p>
              </div>
              <button className="relative z-10 flex items-center gap-1 text-white text-xs font-medium mt-4 hover:gap-2 transition-all duration-200">
                Turn on your car <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Dataset stats */}
            <div className="col-span-12 lg:col-span-5 rounded-2xl p-5 space-y-4" style={{ background: "rgba(15,22,55,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div>
                <p className="text-white font-semibold text-sm">Data Informations</p>
                <p className="text-slate-400 text-xs">Hello, {user?.user_metadata?.full_name?.split(" ")[0] || "User"}! Your Data is ready.</p>
              </div>

              <div className="flex items-center gap-4">
                <CircularProgress value={68} />
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      className="rounded-xl p-2.5"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <p className="text-slate-400 text-[10px]">Data Quality</p>
                      <p className="text-white font-bold text-lg">76%</p>
                      <MiniChart color="#4facfe" />
                    </div>
                    <div
                      className="rounded-xl p-2.5"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <p className="text-slate-400 text-[10px]">Efficiency</p>
                      <p className="text-white font-bold text-lg">+20%</p>
                      <MiniChart color="#00f2a9" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      className="rounded-xl p-2.5 flex items-center gap-2"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Database className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-slate-400 text-[10px]">Total Sets</p>
                        <p className="text-white font-bold text-sm">128</p>
                      </div>
                    </div>
                    <div
                      className="rounded-xl p-2.5 flex items-center gap-2"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                        <Activity className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-slate-400 text-[10px]">This Week</p>
                        <p className="text-white font-bold text-sm">1.342k</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-slate-400 text-xs">0h 12min · Last updated</p>
            </div>

            {/* Profile Informations */}
            <div
              className="col-span-12 lg:col-span-4 rounded-2xl p-5"
              style={{ background: "rgba(15,22,55,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-white font-semibold text-sm mb-3">Profile Informations</p>
              <p className="text-slate-400 text-xs mb-4 leading-relaxed">
                Hi, I'm {user?.user_metadata?.full_name || "Guest"}. Decisions: If you can't decide, the answer is no.
                If two equally difficult paths, choose the one more painful in the short term.
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 min-w-[70px]">Full Name:</span>
                  <span className="text-white font-medium">{user?.user_metadata?.full_name || "Guest User"}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 min-w-[70px]">Mobile:</span>
                  <span className="text-white font-medium">(44) 123 1234 123</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 min-w-[70px]">Email:</span>
                  <span className="text-blue-400 font-medium">{user?.email || "guest@example.com"}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 min-w-[70px]">Location:</span>
                  <span className="text-white font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    United States
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 min-w-[70px]">Social Media:</span>
                  <div className="flex gap-2">
                    <Facebook className="w-3.5 h-3.5 text-blue-400 cursor-pointer hover:text-blue-300 transition-colors" />
                    <Twitter className="w-3.5 h-3.5 text-sky-400 cursor-pointer hover:text-sky-300 transition-colors" />
                    <Instagram className="w-3.5 h-3.5 text-pink-400 cursor-pointer hover:text-pink-300 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Row 2: Platform Settings + Projects ── */}
          <div className="grid grid-cols-12 gap-5">
            {/* Platform Settings */}
            <div
              className="col-span-12 lg:col-span-4 rounded-2xl p-5"
              style={{ background: "rgba(15,22,55,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-white font-semibold text-sm mb-1">Platform Settings</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-3 mt-4">Account</p>

              <div className="space-y-3">
                {[
                  { label: "Email me when someone follows me", key: "emailFollow" },
                  { label: "Email me when someone answers to...", key: "emailAnswer" },
                  { label: "Email me when someone mentions me", key: "emailMention" },
                ].map(({ label, key }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-slate-400 text-xs">{label}</span>
                    <Switch
                      checked={settings[key as keyof typeof settings]}
                      onCheckedChange={() => toggle(key as keyof typeof settings)}
                      className="scale-75 data-[state=checked]:bg-blue-500"
                    />
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-3 mt-5">Application</p>
              <div className="space-y-3">
                {[
                  { label: "New launches and projects", key: "newLaunches" },
                  { label: "Monthly product updates", key: "monthlyUpdates" },
                  { label: "Subscribe to newsletter", key: "newsletter" },
                  { label: "Receive mails weekly", key: "weeklyMails" },
                ].map(({ label, key }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-slate-400 text-xs">{label}</span>
                    <Switch
                      checked={settings[key as keyof typeof settings]}
                      onCheckedChange={() => toggle(key as keyof typeof settings)}
                      className="scale-75 data-[state=checked]:bg-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div
              className="col-span-12 lg:col-span-8 rounded-2xl p-5"
              style={{ background: "rgba(15,22,55,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-white font-semibold text-sm">Projects</p>
              <p className="text-slate-400 text-xs mb-4">Open-source data sets</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    img: projectImages[0],
                    num: "Project #1",
                    title: "Modern",
                    desc: "India Pincodes works through a comprehensive dataset for location-based lookups.",
                    avatars: ["#3b82f6", "#06b6d4", "#8b5cf6"],
                  },
                  {
                    img: projectImages[1],
                    num: "Project #2",
                    title: "Scandinavian",
                    desc: "Data is something that every person has and various types of organizations rely on.",
                    avatars: ["#10b981", "#f59e0b", "#ef4444"],
                  },
                  {
                    img: projectImages[2],
                    num: "Project #3",
                    title: "Minimalist",
                    desc: "Different people have different tastes, and various types of music preferences.",
                    avatars: ["#a855f7", "#ec4899", "#14b8a6"],
                  },
                ].map((proj) => (
                  <div
                    key={proj.title}
                    className="rounded-xl overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <img
                      src={proj.img}
                      alt={proj.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <p className="text-slate-500 text-[10px]">{proj.num}</p>
                      <p className="text-white font-semibold text-sm mb-1">{proj.title}</p>
                      <p className="text-slate-400 text-[10px] leading-relaxed mb-3">{proj.desc}</p>
                      <div className="flex items-center justify-between">
                        <button className="text-[10px] font-semibold text-white border border-white/20 rounded-full px-3 py-1 hover:bg-white/10 transition-colors">
                          VIEW ALL
                        </button>
                        <div className="flex -space-x-1.5">
                          {proj.avatars.map((color, i) => (
                            <div
                              key={i}
                              className="w-5 h-5 rounded-full border border-slate-800 flex items-center justify-center text-[8px] text-white font-bold"
                              style={{ background: color }}
                            >
                              {String.fromCharCode(65 + i)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="flex items-center justify-between text-[10px] text-slate-500 pt-2 pb-4 border-t border-white/5">
            <span>© 2024, Made with ♥ for a better web</span>
            <div className="flex gap-4">
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Marketplace</span>
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Blog</span>
              <span className="hover:text-slate-300 cursor-pointer transition-colors">License</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
