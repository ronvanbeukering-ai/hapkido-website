"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

type VideoItem = {
  src: string;
  title: string;
  description: string;
  poster: string;
};

const trainingVideos: VideoItem[] = [
  {
    src: "/videos/training-les-1.mp4",
    poster: "/images/training/training-4.jpg",
    title: "Hapkido training stand-up technieken",
    description:
      "Trainingsopname bij Hapkido Yong Berkel-Enschot. Je ziet werpen, klemmen en stand-up technieken zoals die elke les aan bod komen, voor beginners én gevorderden.",
  },
  {
    src: "/videos/training-les-2.mp4",
    poster: "/images/training/training-2.jpg",
    title: "Groepsles gemixte groep",
    description:
      "Sfeerimpressie van een gemixte groepsles. Alle leeftijden trainen samen: je leert van elkaar en het niveau wordt altijd aangepast aan de deelnemer.",
  },
  {
    src: "/videos/training-les-3.mp4",
    poster: "/images/training/training-3.jpg",
    title: "Hapkido Combinatie technieken demonstratie",
    description:
      "Demonstratie van Hapkido Combinatie-technieken: zelfverdediging in de praktijk, de kracht van diverse vechtsporten gecombineerd in één stijl.",
  },
];

function VideoCard({ video }: { video: VideoItem }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const ref = useRef<HTMLVideoElement>(null);

  async function toggle() {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
      setPlaying(false);
    } else {
      try {
        await ref.current.play();
        setPlaying(true);
      } catch {
        // play() geblokkeerd door browser
      }
    }
  }

  function toggleMute() {
    if (!ref.current) return;
    ref.current.muted = !muted;
    setMuted(!muted);
  }

  function openFullscreen() {
    if (!ref.current) return;
    if (ref.current.requestFullscreen) {
      ref.current.requestFullscreen();
    }
  }

  return (
    <article className="group rounded-xl overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-video bg-stone-900">
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          muted={muted}
          playsInline
          loop
          preload="metadata"
          className="w-full h-full object-cover"
          aria-label={video.title}
          onEnded={() => setPlaying(false)}
        />

        {/* Overlay controls */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}
        >
          <div className="absolute inset-0 bg-[#0e0b08]/30 group-hover:bg-[#0e0b08]/20 transition-colors" />

          <button
            type="button"
            onClick={toggle}
            className="relative z-10 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-xl"
            aria-label={playing ? "Pauzeer video" : "Speel video af"}
          >
            {playing ? (
              <Pause size={22} className="text-stone-900" />
            ) : (
              <Play size={22} className="text-stone-900 ml-0.5" fill="currentColor" />
            )}
          </button>
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-0 inset-x-0 p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={toggleMute}
              className="w-8 h-8 rounded-md bg-[#0e0b08]/60 flex items-center justify-center text-white hover:bg-[#0e0b08]/80 transition-colors"
              aria-label={muted ? "Geluid aan" : "Geluid uit"}
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>
          <button
            type="button"
            onClick={openFullscreen}
            className="w-8 h-8 rounded-md bg-[#0e0b08]/60 flex items-center justify-center text-white hover:bg-[#0e0b08]/80 transition-colors"
            aria-label="Volledig scherm"
          >
            <Maximize size={14} />
          </button>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-[family-name:var(--font-display)] text-xl text-[color:var(--color-heading)]">
          {video.title}
        </h3>
        <p className="mt-2 text-sm text-[color:var(--color-muted)] leading-relaxed">
          {video.description}
        </p>
      </div>
    </article>
  );
}

export function VideoGallery() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trainingVideos.map((v) => (
        <VideoCard key={v.src} video={v} />
      ))}
    </div>
  );
}
