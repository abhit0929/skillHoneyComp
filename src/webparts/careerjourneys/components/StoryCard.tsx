import { SuccessStory } from "../types";
// Use a tiny inline SVG for the arrow to avoid runtime issues from external icon libraries
// Use a plain anchor instead of react-router's Link because this web part
// may be rendered outside a Router provider (SPFx pages typically don't
// provide react-router context). Using <a> avoids the useContext error.
const StoryCardBg = (require("../assets/images/story-card-bg.png").default ?? require("../assets/images/story-card-bg.png")) as string;


interface StoryCardProps {
  story: SuccessStory;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <a href={`/stories/${story.id}`} className="block">
      <article
        className="group flex flex-col items-center rounded-md border border-primary bg-white p-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
        role="article"
        aria-label={`Success story of ${story.name}`}
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
          <div className="relative h-[168px] w-[194px] mt-3" aria-hidden="true">
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
              Career journey: {story.careerJourney}
            </p>
          </div>

          {/* Description */}
          <div className="w-full h-[105px]">
            <p className="text-center text-base leading-[21px] text-foreground line-clamp-5">
              {story.description}
            </p>
          </div>

          {/* Arrow Link */}
          <button
            className="flex items-center gap-2.5 transition-transform hover:translate-x-1"
            aria-label={`Read more about ${story.name}'s story`}
          >
            <svg className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </article>
    </a>
  );
}
