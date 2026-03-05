import {
  MapPin,
  Globe,
  Users,
  BookOpen,
} from "lucide-react";

const Profile = () => {
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
          <img
            src="https://ui-avatars.com/api/?name=User&size=200"
            className="w-24 h-24 rounded-full border border-white/20 shadow-xl"
            alt="Profile Avatar"
          />
          <div>
            <h2 className="text-white text-2xl font-bold">Local User</h2>
            <p className="text-blue-400">@localuser</p>
            <p className="text-slate-400 mt-1 max-w-md">
              Local development mode
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <BookOpen className="mx-auto text-blue-400 mb-1" />
            <p className="text-white font-bold">0</p>
            <p className="text-slate-400 text-sm">Datasets</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <Users className="mx-auto text-green-400 mb-1" />
            <p className="text-white font-bold">0</p>
            <p className="text-slate-400 text-sm">Followers</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <Users className="mx-auto text-purple-400 mb-1" />
            <p className="text-white font-bold">0</p>
            <p className="text-slate-400 text-sm">Following</p>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin size={16} />
            Local Environment
          </div>
          <div className="flex items-center gap-2 text-blue-400">
            <Globe size={16} />
            localhost
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;