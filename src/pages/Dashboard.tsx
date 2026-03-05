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


const sidebarLinks = [

];

const accountLinks = [
  { label: "Home", icon: LayoutDashboard, to: "/" },
  { label: "Profile", icon: User, to: "#profile-info" },
  { label: "Submit a dataset", icon: UserPlus, to: "/submit-dataset" },
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
  return (
    <div className="flex min-h-screen" style={{ background: "linear-gradient(135deg, #0b0f2a 0%, #0c1344 50%, #080d24 100%)" }}>
      {/* ── Sidebar ── */}
      < aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900/50 backdrop-blur-xl border-r border-white/5 p-6 flex flex-col z-40" >
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


      </aside >

      {/* ── Main content ── */}
      < div className="ml-64 flex-1 flex flex-col min-h-screen" >
        {/* Page content */}
        {/* Main content removed or replaced with static */}
      </div >
    </div >
  );
};

export default Dashboard;
