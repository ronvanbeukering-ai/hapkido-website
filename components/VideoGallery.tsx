"use client";

import { useState } from "react";
import { Play } from "lucide-react";

type VideoItem = {
  vimeoId: string;
  title: string;
  description: string;
};

const trainingVideos: VideoItem[] = [
  {
    vimeoId: "1199536635",
    title: "Hapkido training stand-up technieken",
    description:
      "Trainingsopname bij Hapkido Yong Berkel-Enschot. Werpen, klemmen en stand-up technieken zoals die elke les aan bod komen, voor beginners én gevorderden.",
  },
  {
    vimeoId: "1199526926",
    title: "Groepsles gemixte groep",
    description:
      "Sfeerimpressie van een gemixte groepsles. Alle leeftijden trainen samen: je leert van elkaar en het niveau wordt altijd aangepast aan de deelnemer.",
  },
  {
    vimeoId: "809686134",
    title: "Hapkido Combinatie technieken demonstratie",
    description:
      "Demonstratie van Hapkido Combinatie-technieken: zelfverdediging in de praktijk, de kracht van diverse vechtsporten gecombineerd in één stijl.",
  },
];

function VideoCard({ video }: { video: VideoItem }) {
  const [active, setActive] = useState(false);

  return (
    <article className="group rounded-xl overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-video bg-stone-900">
        {active ? (
          <iframe
            className="w-full h-full"
            src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&color=c25a00`}
            title={video.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="w-full h-full flex items-center justify-center bg-stone-800 group cursor-pointer relative"
            aria-label={`Speel ${video.title} af`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-[#1ab7ea]/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                <Play size={22} className="text-white ml-0.5" fill="currentColor" />
              </div>
            </div>
            <span className="absolute bottom-3 left-3 text-xs text-white/60 font-medium">Vimeo</span>
          </button>
        )}
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
        <VideoCard key={v.vimeoId} video={v} />
      ))}
    </div>
  );
}
