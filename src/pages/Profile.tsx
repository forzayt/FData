import { MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const Profile = ({ user: initialUser }: { user?: any }) => {
  const [user, setUser] = useState<any>(initialUser || null);

  useEffect(() => {
    if (!initialUser) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
      });
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
      return () => subscription.unsubscribe();
    }
  }, [initialUser]);

  return (
    <div
      id="profile-info"
      className="w-full rounded-2xl p-6 scroll-mt-6"
      style={{ background: "rgba(15,22,55,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <p className="text-white font-semibold text-lg mb-4">Profile Information</p>
      <p className="text-slate-400 text-sm mb-6 leading-relaxed">
        Hi, I'm {user?.user_metadata?.full_name || "Guest"}. Decisions: If you can't decide, the answer is no.
        If two equally difficult paths, choose the one more painful in the short term.
      </p>
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-slate-400 min-w-[100px]">Full Name:</span>
          <span className="text-white font-medium">{user?.user_metadata?.full_name || "Guest User"}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-slate-400 min-w-[100px]">Mobile:</span>
          <span className="text-white font-medium">(44) 123 1234 123</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-slate-400 min-w-[100px]">Email:</span>
          <span className="text-blue-400 font-medium">{user?.email || "guest@example.com"}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-slate-400 min-w-[100px]">Location:</span>
          <span className="text-white font-medium flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            United States
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-slate-400 min-w-[100px]">Social Media:</span>
          <div className="flex gap-4">
            <Facebook className="w-4 h-4 text-blue-400 cursor-pointer hover:text-blue-300 transition-colors" />
            <Twitter className="w-4 h-4 text-sky-400 cursor-pointer hover:text-sky-300 transition-colors" />
            <Instagram className="w-4 h-4 text-pink-400 cursor-pointer hover:text-pink-300 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
