"use client";

import { useState } from "react";
import { Play } from "lucide-react";

type VideoItem = {
  vimeoId: string;
  vimeoHash?: string;
  thumbnail: string;
  title: string;
  description: string;
};

const trainingVideos: VideoItem[] = [
  {
    vimeoId: "676750263",
    vimeoHash: "8f32bee019",
    thumbnail: "/images/training/training-4.jpg",
    title: "Master Ron van Beukering – technieken demonstratie",
    description:
      "Master Ron van Beukering (6e Dan) demonstreert Hapkido Combinatie-technieken. Zelfverdediging op hoog niveau zoals geleerd door G.M. Booth, de grondlegger van Kwan Nyom Hapkido.",
  },
  {
    vimeoId: "1199536635",
    vimeoHash: "87f62c18bd",
    thumbnail: "/images/training/training-1.jpg",
    title: "Hapkido training stand-up technieken",
    description:
      "Trainingsopname bij Hapkido Yong Berkel-Enschot. Werpen, klemmen en stand-up technieken zoals die elke les aan bod komen, voor beginners én gevorderden.",
  },
  {
    vimeoId: "1199526926",
    vimeoHash: "7df3cf2241",
    thumbnail: "/images/training/training-2.jpg",
    title: "Groepsles gemixte groep",
    description:
      "Sfeerimpressie van een gemixte groepsles. Alle leeftijden trainen samen: je leert van elkaar en het niveau wordt altijd aangepast aan de deelnemer.",
  },
  {
    vimeoId: "809686134",
    vimeoHash: "ff39f90e59",
    thumbnail: "/images/training/training-3.jpg",
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
            className="absolute inset-0 w-full h-full"
            src={`https://player.vimeo.com/video/${video.vimeoId}?${video.vimeoHash ? `h=${video.vimeoHash}&` : ""}autoplay=1&color=c25a00`}
            title={video.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            style={{ backgroundImage: `url(${video.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center" }}
            className="w-full h-full flex items-center justify-center group cursor-pointer relative"
            aria-label={`Speel ${video.title} af`}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#1ab7ea]/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                <Play size={26} className="text-white ml-1" fill="currentColor" />
              </div>
            </div>
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
