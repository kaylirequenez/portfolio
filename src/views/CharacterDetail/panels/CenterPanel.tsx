// views/CharacterDetail/panels/CenterPanel.tsx
import { Canvas } from "@react-three/fiber";
import { profile } from "../../../data/profile";

import Avatar from "../../../avatar/Avatar";
import AvatarCamera from "../../../avatar/AvatarCamera";
import StatusBadge from "../components/StatusBadge";
import DialogueWheel from "../components/DialogueWheel";
import HelpButton from "../../../components/HelpButton";

type Props = {
  onBack?: () => void;
};

export default function CenterPanel({ onBack }: Props) {
  return (
    <div className="flex flex-col gap-3 h-full items-center overflow-auto px-2 pb-4">
      {/* Name + title */}
      <div className="text-center space-y-1 flex-shrink-0 mt-2">
        <div className="relative inline-block">
          {/* Shadow layer */}
          <h1
            className="absolute text-2xl lg:text-4xl uppercase tracking-widest font-mono select-none"
            style={{
              fontWeight: "bold",
              left: "0px",
              top: "6px",
              letterSpacing: "0.2em",
              color: "#0a3a2a",
              opacity: 0.7,
              zIndex: 0,
            }}
          >
            {profile.name}
          </h1>

          {/* Glow / gradient layer */}
          <h1
            className="relative text-2xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-300 to-cyan-300 uppercase tracking-widest font-mono select-none"
            style={{
              fontWeight: "bold",
              letterSpacing: "0.2em",
              textShadow:
                "0 0 30px rgba(16, 185, 129, 1), 0 0 60px rgba(16, 185, 129, 0.6)",
              filter: "drop-shadow(0 0 25px rgba(16, 185, 129, 0.8))",
              zIndex: 1,
            }}
          >
            {profile.name}
          </h1>
        </div>

        <div className="text-emerald-300 uppercase tracking-wider font-mono text-xs">
          {profile.title}
        </div>
      </div>

      {/* Avatar */}
      <div
        className="relative flex items-end justify-center h-[28rem] flex-shrink-0 cursor-pointer group mt-4 lg:mt-8"
        onClick={onBack}
      >
        <div className="absolute bottom-0 w-64 h-2 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full blur-sm" />

        <div className="relative h-full flex items-end justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/30 via-transparent to-transparent rounded-lg blur-3xl" />

          <div className="relative z-10 w-80 h-full">
            <Canvas camera={{ fov: 35 }}>
              <AvatarCamera preset="detail" />
              <ambientLight intensity={0.6} />
              <directionalLight position={[2, 2, 2]} intensity={0.8} />
              <Avatar mainView={false} />
            </Canvas>
          </div>

          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-emerald-400/50 -translate-x-6 -translate-y-2" />
          <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-cyan-400/50 translate-x-6 -translate-y-2" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-emerald-400/50 -translate-x-6 translate-y-2" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-cyan-400/50 translate-x-6 translate-y-2" />
        </div>
      </div>

      {/* Status badges */}
      <div className="flex gap-2 items-center flex-shrink-0">
        <StatusBadge label="ACTIVE" />
        <HelpButton
          fixed={false}
          tips={[
            "Click on Avatar to return to home",
            "Click on Archives to view previous projects",
            "Click on Operations to view previous job experience",
            "Click on Initiate Contact for LinkedIn, GitHub, or Email",
          ]}
        />
      </div>

      {/* Dialogue wheel */}
      <div className="relative flex-shrink-0 mt-2">
        <DialogueWheel comms={profile.comms} />
      </div>
    </div>
  );
}
