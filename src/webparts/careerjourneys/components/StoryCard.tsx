import type { KeyboardEvent, MouseEvent } from "react";
import { SuccessStory } from "../types";
import HexAvatar from "./HexAvatar";
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
        <HexAvatar
          imageUrl={story.imageUrl || ""}
          alt={story.name}
          size={186}
          borderColor="rgba(0, 127, 0, 0.18)"
          innerBorderColor="rgba(255, 255, 255, 0.94)"
          borderWidth={5}
          innerBorderWidth={4}
          className="mt-3"
        />

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
