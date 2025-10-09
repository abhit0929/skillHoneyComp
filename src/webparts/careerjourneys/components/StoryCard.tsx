import type { KeyboardEvent, MouseEvent } from "react";
import { SuccessStory } from "../types";
// Use a tiny inline SVG for the arrow to avoid runtime issues from external icon libraries
// Use a plain anchor instead of react-router's Link because this web part
// may be rendered outside a Router provider (SPFx pages typically don't
// provide react-router context). Using <a> avoids the useContext error.
const StoryCardBg = (require("../assets/images/story-card-bg.png").default ?? require("../assets/images/story-card-bg.png")) as string;


interface StoryCardProps {
  story: SuccessStory;
  onSelect?: (story: SuccessStory) => void;
}

export default function StoryCard({ story, onSelect }: StoryCardProps) {
  const handleSelect = (event: MouseEvent | KeyboardEvent) => {
    event.preventDefault();
    onSelect?.(story);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      handleSelect(event);
    }
  };

  return (
    <article
      className="group flex cursor-pointer flex-col items-center rounded-md border border-primary bg-white p-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      role="button"
      tabIndex={0}
      aria-label={`Success story of ${story.name}`}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
    >
      <div
        className="flex w-full flex-col items-center gap-5 rounded-sm border border-primary/20 p-5"
        style={{
          backgroundImage: `url(${StoryCardBg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
        }}
      >
        {/* Hexagonal Avatar Container */}
        <div className="relative mt-3 h-[168px] w-[194px]" aria-hidden="true">
          <svg
            className="absolute inset-0"
            width="194"
            height="168"
            viewBox="0 0 173.205 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Pointy-top hexagon clip (flat left/right orientation) */}
            <defs>
              <clipPath id={`hexClip-${story.id}`}>
                <polygon points="86.6025,0 173.205,50 173.205,150 86.6025,200 0,150 0,50" />
              </clipPath>
            </defs>
            {/* fallback background */}
            <rect x="0" y="0" width="173.205" height="200" fill="#ffffff" />

            <image
              href={story.imageUrl}
              xlinkHref={story.imageUrl}
              x="0"
              y="0"
              width="173.205"
              height="200"
              clipPath={`url(#hexClip-${story.id})`}
              preserveAspectRatio="xMidYMid slice"
            />
            {/* Outer stroke */}
            <polygon
              points="86.6025,0 173.205,50 173.205,150 86.6025,200 0,150 0,50"
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity="0.9"
            />
            {/* Inner stroke */}
            <g transform="translate(86.6025,100) scale(0.88) translate(-86.6025,-100)">
              <polygon
                points="86.6025,0 173.205,50 173.205,150 86.6025,200 0,150 0,50"
                fill="none"
                stroke="white"
                strokeWidth="1"
                opacity="0.9"
              />
            </g>
          </svg>
        </div>

        {/* Name and Journey */}
        <div className="flex flex-col items-center gap-2.5">
          <h3 className="text-2xl font-light text-primary">{story.name}</h3>
          <p className="text-base leading-[21px] text-muted-foreground">
             {story.careerJourney}
          </p>
        </div>

        {/* Description */}
        <div className="h-[105px] w-full">
          <p className="text-center text-base leading-[21px] text-foreground line-clamp-5">
            {story.description}
          </p>
        </div>

        {/* Arrow Link */}
        <div className="flex items-center gap-2.5 transition-transform group-hover:translate-x-1">
          <span className="sr-only">Read the story</span>
          <svg className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 12h14M13 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </article>
  );
}
