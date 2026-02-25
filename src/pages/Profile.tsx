import {
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Github,
  Globe,
  Users,
  BookOpen,
  Save,
  Loader2,
} from "lucide-react";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface GitHubProfile {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  location: string;
  blog: string;
  twitter_username: string;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

const Profile = ({ user: initialUser }: { user?: any }) => {
  const [user, setUser] = useState<any>(initialUser || null);
  const [github, setGithub] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newGithubUsername, setNewGithubUsername] = useState("");
  const { toast } = useToast();

  // get supabase session
  useEffect(() => {
    if (!initialUser) {
      supabase.auth.getSession().then(({ data }) => {
        setUser(data.session?.user ?? null);
        setNewGithubUsername(data.session?.user?.user_metadata?.github_username || "");
      });

      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setNewGithubUsername(session?.user?.user_metadata?.github_username || "");
      });

      return () => data.subscription.unsubscribe();
    } else {
      setNewGithubUsername(initialUser?.user_metadata?.github_username || "");
    }
  }, []);

  // fetch github profile
  useEffect(() => {
    const githubUsername = user?.user_metadata?.github_username;

    if (!githubUsername) {
      setGithub(null);
      setLoading(false);
      return;
    }

    fetch(`https://api.github.com/users/${githubUsername}`)
      .then(res => res.json())
      .then(data => {
        setGithub(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  const handleUpdateGithub = async () => {
    setUpdating(true);
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          github_username: newGithubUsername,
        },
      });

      if (error) throw error;

      setUser(data.user);
      toast({
        title: "Profile Updated",
        description: `GitHub username set to ${newGithubUsername}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="text-white p-6">Loading profile...</div>
    );

  return (
    <div className="w-full">

      {/* Profile Card */}
      <div
        className="rounded-3xl p-8 backdrop-blur-xl"
        style={{
          background: "rgba(15,22,55,0.6)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >

        {/* Header */}
        <div className="flex items-center gap-6">

          {/* Avatar */}
          <img
            src={
              github?.avatar_url ||
              "https://ui-avatars.com/api/?name=User&size=200"
            }
            className="w-24 h-24 rounded-full border border-white/20 shadow-xl"
          />

          {/* Name + Username */}
          <div>
            <h2 className="text-white text-2xl font-bold">
              {github?.name || user?.email}
            </h2>

            <p className="text-blue-400">@{github?.login}</p>

            <p className="text-slate-400 mt-1 max-w-md">
              {github?.bio || "No bio available"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">

          <div className="bg-white/5 rounded-xl p-4 text-center">
            <BookOpen className="mx-auto text-blue-400 mb-1" />
            <p className="text-white font-bold">
              {github?.public_repos}
            </p>
            <p className="text-slate-400 text-sm">Repositories</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 text-center">
            <Users className="mx-auto text-green-400 mb-1" />
            <p className="text-white font-bold">
              {github?.followers}
            </p>
            <p className="text-slate-400 text-sm">Followers</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 text-center">
            <Users className="mx-auto text-purple-400 mb-1" />
            <p className="text-white font-bold">
              {github?.following}
            </p>
            <p className="text-slate-400 text-sm">Following</p>
          </div>

        </div>

        {/* Info */}
        <div className="mt-6 space-y-3 text-sm">

          <div className="flex items-center gap-2 text-slate-300">
            <MapPin size={16} />
            {github?.location || "Unknown location"}
          </div>

          {github?.blog && (
            <a
              href={github.blog}
              target="_blank"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              <Globe size={16} />
              Website
            </a>
          )}

          <a
            href={github?.html_url}
            target="_blank"
            className="flex items-center gap-2 text-white hover:text-blue-400"
          >
            <Github size={16} />
            View GitHub Profile
          </a>

        </div>

        {/* Socials */}
        <div className="flex gap-4 mt-6">

          {github?.twitter_username && (
            <a
              href={`https://twitter.com/${github.twitter_username}`}
              target="_blank"
            >
              <Twitter className="text-sky-400 hover:text-sky-300 cursor-pointer" />
            </a>
          )}

        </div>

      

      </div>

    </div>
  );
};

export default Profile;