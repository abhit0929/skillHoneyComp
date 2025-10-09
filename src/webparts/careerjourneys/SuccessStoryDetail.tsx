import * as React from "react";
import { Link, useParams } from "react-router-dom";
import SuccessStoryDetailView from "./components/SuccessStoryDetailView";
import { getDetailedStoryById } from "./data/detailedStories";

const SkillBg =
  (require("./assets/page-background.png").default ??
    require("./assets/page-background.png")) as string;

export default function SuccessStoryDetail() {
  const { id } = useParams<{ id: string }>();
  const story = id ? getDetailedStoryById(id) : undefined;

  if (!story) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F7F7] px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Success Story Not Found
          </h1>
          <p className="mt-3 text-muted-foreground">
            The success story you are looking for does not exist or has been
            moved.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M14.625 9H3.375M8.4375 4.125L3.375 9L8.4375 13.875"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-[#F7F7F7]"
      style={{
        backgroundImage: `url(${SkillBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "repeat-y",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />

      <div className="relative z-10 px-6 pb-20 pt-16 lg:px-8">
        <SuccessStoryDetailView
          story={story}
          backSlot={
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M14.625 9H3.375M8.4375 4.125L3.375 9L8.4375 13.875"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back
            </Link>
          }
        />
      </div>
    </div>
  );
}
