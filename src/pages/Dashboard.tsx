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
import { NavLink } from "@/components/NavLink";
import Profile from "./Profile";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const sidebarLinks = [

];

const accountLinks = [
  { label: "Home", icon: LayoutDashboard, to: "/" },
  { label: "Profile", icon: User, to: "#profile-info" },
  { label: "Log Out", icon: LogIn, to: "/login" },
  

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
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
         
          {sidebarLinks.map((link) => (
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

          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-8 mb-4 px-2">Account</p>
          {accountLinks.map((link) => (
            link.label === "Log Out" ? (
              <AlertDialog key={link.label}>
                <AlertDialogTrigger asChild>
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-400 transition-all hover:bg-white/5"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
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
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-400 transition-all hover:bg-white/5"
                activeClassName="bg-blue-600/10 text-white font-medium shadow-[inset_0_0_0_1px_rgba(37,99,235,0.2)]"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </NavLink>
            )
          ))}
        </nav>

        {/* Upgrade card */}
        {/* <div className="mt-auto bg-blue-600/10 border border-blue-500/20 rounded-2xl p-4">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center mb-3">
            <Star className="w-4 h-4 text-white fill-white" />
          </div>
          <p className="text-white text-xs font-semibold mb-1">Need help?</p>
          <p className="text-slate-400 text-[10px] mb-3">Please check our documentation</p>
          <button className="w-full py-2 rounded-xl bg-white text-slate-900 text-[10px] font-bold hover:bg-slate-100 transition-colors">
            DOCUMENTATION
          </button>
        </div> */}
      </aside>

      {/* ── Main content ── */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Page content */}
        <main className="flex-1 px-8 py-6 flex flex-col">
          {/* Profile Informations */}
          <Profile user={user} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
