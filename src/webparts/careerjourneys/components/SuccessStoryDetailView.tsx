import * as React from "react";
import type { ReactNode } from "react";
import EmployeeProfileCard from "./EmployeeProfileCard";
import SkillsBackpack from "./SkillsBackpack";
import CareerJourneyVisualization from "./CareerJourneyVisualization";
import type { DetailedSuccessStory } from "../types";
import { entities } from "../../selfEvaluation/data/skillsData";
import { departmentMap } from "../shared/utils/skillsDataAccess";

const SuccessStoryBg =
  (require("../assets/images/success-story-bg.png").default ??
    require("../assets/images/success-story-bg.png")) as string;

interface SuccessStoryDetailViewProps {
  story: DetailedSuccessStory;
  backSlot?: ReactNode;
  skillFallbackMessage?: string;
  className?: string;
}

const defaultSkillFallback =
  "Skills backpack data is coming soon for this journey.";

export default function SuccessStoryDetailView({
  story,
  backSlot,
  skillFallbackMessage = defaultSkillFallback,
  className,
}: SuccessStoryDetailViewProps) {
  const [activeEntityId, setActiveEntityId] = React.useState<string | null>(
    null,
  );
  const entityBarRef = React.useRef<HTMLDivElement>(null);

  const hasSkills =
    Array.isArray(story.skillsBackpack) && story.skillsBackpack.length > 0;

  const entityStepsMap = React.useMemo(() => {
    const map = new Map<string, typeof story.careerPath>();

    story.careerPath.forEach((step) => {
      const mappedId =
        departmentMap[step.department as keyof typeof departmentMap];
      if (!mappedId) {
        return;
      }
      const entityId = mappedId;

      if (!map.has(entityId)) {
        map.set(entityId, []);
      }

      map.get(entityId)!.push(step);
    });

    return map;
  }, [story.careerPath]);

  React.useEffect(() => {
    setActiveEntityId(null);
  }, [story.id]);

  React.useEffect(() => {
    if (!activeEntityId) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        entityBarRef.current &&
        !entityBarRef.current.contains(event.target as Node)
      ) {
        setActiveEntityId(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveEntityId(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeEntityId]);

  return (
    <div
      className={`relative mx-auto w-full max-w-[1366px] ${
        className ? className : ""
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 px-0">
        <div className="flex items-center gap-2 text-primary">{backSlot}</div>
        <p className="text-xs text-muted-foreground">
          Click each job title to know about key experience.
        </p>
      </div>

      <div>
        <div className="pointer-events-none absolute inset-0">
          <img
            src={SuccessStoryBg}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/92 via-white/55 to-transparent" />
        </div>

        {/* <div className="relative z-10 flex flex-col gap-6 px-6 pb-10 pt-6 lg:flex-row"> */}
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row">
          <aside className="flex w-full max-w-[454px] flex-shrink-0 flex-col gap-5">
            <EmployeeProfileCard
              name={story.name}
              careerJourney={story.careerJourney}
              quote={story.testimonial}
              imageUrl={story.imageUrl || ""}
            />

            {hasSkills ? (
              <SkillsBackpack skills={story.skillsBackpack} />
            ) : (
              <div className="flex w-full max-w-[427px] items-center justify-center rounded-md border border-dashed border-primary/40 bg-white/85 px-6 py-12 text-center text-sm text-muted-foreground">
                {skillFallbackMessage}
              </div>
            )}

            {story.quote && (
              <blockquote className="rounded-md border border-primary/20 bg-white/90 p-4 text-sm italic text-foreground">
                {story.quote}
              </blockquote>
            )}
          </aside>

          <div className="flex flex-1 items-stretch justify-center lg:pl-4">
            <div className="flex w-full max-w-[1003px] items-center justify-center">
              <CareerJourneyVisualization storyData={story} />
            </div>
          </div>
        </div>

        <div
          ref={entityBarRef}
          className="absolute mt-[4%] ml-[13%] z-10 flex flex-wrap items-center justify-end gap-2 px-6 pb-6"
        >
          <span className="flex items-center gap-2 rounded-full border border-[#D1D5DB] bg-white/95 px-3 py-1 text-xs text-foreground shadow-sm">
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <g clipPath="url(#clip0_success_detail_view)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.99988 14.401C3.13331 14.4009 -0.000976562 11.2659 -0.000976562 7.39929C-0.00071536 3.53292 3.13347 0.398527 6.99988 0.398438C10.8664 0.398437 14.0013 3.53287 14.0016 7.39929C14.0016 11.2659 10.8665 14.401 6.99988 14.401ZM8.38586 6.69946C8.33232 5.30123 8.12215 4.06863 7.82104 3.16528C7.64471 2.63637 7.45026 2.25828 7.26819 2.0271C7.17879 1.9137 7.10552 1.85259 7.05713 1.82288C7.03436 1.80891 7.01886 1.80308 7.01099 1.80066C7.00379 1.79847 6.99988 1.7981 6.99988 1.7981C6.99988 1.7981 6.99611 1.79871 6.98962 1.80066C6.98183 1.80304 6.96565 1.80876 6.94263 1.82288C6.89423 1.85264 6.82167 1.91388 6.73242 2.0271C6.55029 2.25826 6.35511 2.63617 6.17871 3.16528C5.87762 4.06861 5.66829 5.30129 5.61475 6.69946H8.38586ZM12.5558 6.69946C12.2928 4.5915 10.8605 2.84655 8.92676 2.13818C9.00672 2.32395 9.08125 2.51964 9.14893 2.72266C9.50472 3.79005 9.73316 5.1777 9.78723 6.69946H12.5558ZM4.21252 6.69946C4.26659 5.17774 4.49505 3.79005 4.85083 2.72266C4.91846 2.5198 4.99225 2.32383 5.07214 2.13818C3.13888 2.8468 1.70693 4.59186 1.44397 6.69946H4.21252ZM8.92761 12.6595C10.861 11.9508 12.293 10.2069 12.5558 8.09912L9.78723 8.09912C9.73321 9.62102 9.50472 11.0093 9.14893 12.0768C9.08145 12.2792 9.0073 12.4743 8.92761 12.6595ZM7.01099 12.9988C7.01886 12.9964 7.03422 12.9898 7.05713 12.9757C7.10556 12.9459 7.1789 12.8856 7.26819 12.7723C7.45032 12.5411 7.64466 12.1625 7.82104 11.6333C8.1221 10.7299 8.33237 9.49732 8.38586 8.09912H5.61475C5.66824 9.49726 5.87768 10.7299 6.17871 11.6333C6.35512 12.1625 6.55027 12.5411 6.73242 12.7723C6.8215 12.8853 6.89423 12.9459 6.94263 12.9757C6.96564 12.9898 6.98178 12.9964 6.98962 12.9988C6.99606 13.0007 6.99988 13.0005 6.99988 13.0005C6.99988 13.0005 7.00373 13.001 7.01099 12.9988ZM5.07214 12.6595C4.99246 12.4743 4.9183 12.2792 4.85083 12.0768C4.49503 11.0093 4.26655 9.62102 4.21252 8.09912L1.44397 8.09912C1.7067 10.2068 3.13893 11.9507 5.07214 12.6595Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_success_detail_view">
                  <rect
                    width="14"
                    height="14"
                    fill="white"
                    transform="translate(0 0.398438)"
                  />
                </clipPath>
              </defs>
            </svg>
            Expat
          </span>

          {entities.map((entity) => {
            const isPrimary = entity.id === story.primaryEntityId;
            const entitySteps = entityStepsMap.get(entity.id) ?? [];
            const displayedSteps = entitySteps.slice(0, 3);
            const extraSteps = entitySteps.length - displayedSteps.length;
            const isActive = activeEntityId === entity.id;

            return (
              <div key={entity.id} className="relative">
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() =>
                    setActiveEntityId((prev) =>
                      prev === entity.id ? null : entity.id,
                    )
                  }
                  className={`flex items-center gap-2 rounded-[4px] border px-3 py-[6px] text-xs font-medium shadow-sm transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                  style={{
                    borderColor: entity.color,
                    backgroundColor: entity.color,
                    color: entity.textColor,
                    boxShadow: isActive
                      ? "0 6px 18px rgba(0,0,0,0.18)"
                      : "0 4px 10px rgba(0,0,0,0.1)",
                    transform: isActive ? "translateY(-1px)" : "translateY(0)",
                  }}
                >
                  {entity.name}
                  {isPrimary && (
                    <span
                      className="rounded-sm px-1 text-[10px] font-semibold uppercase tracking-wide"
                      style={{
                        backgroundColor:
                          entity.textColor === "#FFFFFF"
                            ? "rgba(0,0,0,0.35)"
                            : "rgba(255,255,255,0.5)",
                        color:
                          entity.textColor === "#FFFFFF"
                            ? "#FFFFFF"
                            : entity.textColor,
                      }}
                    >
                      Primary
                    </span>
                  )}
                </button>

                {isActive && (
                  <div
                    className="shc-entity-popover"
                    style={{
                      borderColor: "rgba(17, 24, 39, 0.08)",
                      borderTopColor: entity.color,
                      ["--shc-popover-arrow-color" as any]:
                        "rgba(255,255,255,0.98)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className="text-sm font-semibold leading-5"
                          style={{ color: entity.color }}
                        >
                          {entity.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {entitySteps.length > 0
                            ? `Experiences tagged to ${entity.name} in this journey:`
                            : `No roles from ${story.name}'s journey are tagged to this entity yet.`}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveEntityId(null)}
                        className="text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={`Close details for ${entity.name}`}
                      >
                        Close
                      </button>
                    </div>

                    {displayedSteps.length > 0 && (
                      <ul className="mt-3 flex flex-col gap-3">
                        {displayedSteps.map((step, index) => {
                          const mobilityText =
                            step.countryMobility === "Yes"
                              ? "Global mobility"
                              : "Local move";
                          const movementLabel =
                            step.movementType === "Vertical"
                              ? "Vertical move"
                              : "Lateral move";

                          return (
                            <li key={`${entity.id}-${index}`}>
                              <p className="text-sm font-medium text-foreground">
                                {step.role}
                              </p>
                              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                                {movementLabel} · {mobilityText}
                              </p>
                              {step.learningMilestones && (
                                <p className="mt-1 text-xs leading-4 text-muted-foreground">
                                  {step.learningMilestones}
                                </p>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    {extraSteps > 0 && (
                      <p className="mt-3 text-xs font-medium text-muted-foreground">
                        +{extraSteps} additional role
                        {extraSteps > 1 ? "s" : ""} linked to {entity.name}.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
