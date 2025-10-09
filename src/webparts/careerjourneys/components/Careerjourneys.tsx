import * as React from "react";
import type { ICareerjourneysProps } from "./ICareerjourneysProps";
import StoryCard from "./StoryCard";
import SuccessStoryDetailView from "./SuccessStoryDetailView";
import {
  successStoriesListData,
  getDetailedStoryById,
} from "./../data/detailedStories";
import type { DetailedSuccessStory, SuccessStory } from "../types";
import "../assets/global.css";

const SkillBg = (
  require("../assets/page-background.png").default ??
  require("../assets/page-background.png")
) as string;

interface CareerjourneysState {
  selectedStoryId: string | null;
}

export default class Careerjourneys extends React.Component<
  ICareerjourneysProps,
  CareerjourneysState
> {
  public state: CareerjourneysState = {
    selectedStoryId: null,
  };

  public componentDidMount(): void {
    try {
      document.body.classList.add("shc-hide-commandbar");
    } catch {
      // ignore in restricted environments
    }

    this.initializeFromLocation();
  }

  public componentDidUpdate(
    _: ICareerjourneysProps,
    prevState: CareerjourneysState,
  ): void {
    if (prevState.selectedStoryId !== this.state.selectedStoryId) {
      this.syncStoryToUrl();
    }
  }

  public componentWillUnmount(): void {
    try {
      document.body.classList.remove("shc-hide-commandbar");
    } catch {
      // ignore
    }
  }

  private initializeFromLocation(): void {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const url = new URL(window.location.href);
      const storyParam = url.searchParams.get("story");

      if (storyParam) {
        const decodedId = decodeURIComponent(storyParam);
        const story = getDetailedStoryById(decodedId);

        if (story) {
          this.setState({ selectedStoryId: story.id });
        }
      }
    } catch {
      // ignore invalid URL states
    }
  }

  private syncStoryToUrl(): void {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const url = new URL(window.location.href);

      if (this.state.selectedStoryId) {
        url.searchParams.set("story", this.state.selectedStoryId);
      } else {
        url.searchParams.delete("story");
      }

      window.history.replaceState({}, "", url.toString());
    } catch {
      // ignore
    }
  }

  private scrollPageToTop = (): void => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      // ignore on unsupported browsers
    }
  };

  private handleStorySelect = (story: SuccessStory): void => {
    this.setState(
      {
        selectedStoryId: story.id,
      },
      this.scrollPageToTop,
    );
  };

  private handleBackToList = (): void => {
    this.setState(
      {
        selectedStoryId: null,
      },
      this.scrollPageToTop,
    );
  };

  private renderStoryGrid(): React.ReactNode {
    return (
      <>
        <section className="container px-8 pb-5 pt-[35px]">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <h1 className="text-[28px] font-light text-foreground">
                Illustrative career journeys
              </h1>
            </div>
            <p className="text-sm leading-5 text-muted-foreground">
              At bp, careers are journeys of exploration and growth. These
              stories show how our people gained diverse skills, embraced new
              opportunities, and built confidence by shaping their own unique
              paths.
            </p>
          </div>
        </section>

        <section
          className="container px-8 pb-16"
          aria-label="Success stories collection"
        >
          <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
            {successStoriesListData.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onSelect={this.handleStorySelect}
              />
            ))}
          </div>
        </section>
      </>
    );
  }

  private renderStoryDetail(story: DetailedSuccessStory): React.ReactNode {
    return (
      <div className="px-8 pb-16 pt-[35px]">
        <SuccessStoryDetailView
          story={story}
          backSlot={
            <button
              type="button"
              onClick={this.handleBackToList}
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
            </button>
          }
        />
      </div>
    );
  }

  public render(): React.ReactElement<ICareerjourneysProps> {
    const { selectedStoryId } = this.state;
    const selectedStory = selectedStoryId
      ? getDetailedStoryById(selectedStoryId)
      : undefined;

    const content = selectedStory
      ? this.renderStoryDetail(selectedStory)
      : this.renderStoryGrid();

    return (
      <div
        className="shc-root -mt-[3.125em]"
        style={{
          backgroundImage: `url(${SkillBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "repeat-y",
        }}
      >
        <div className="relative min-h-screen">
          {/* Background with pattern */}
          <div className="absolute inset-0 -z-10 bg-[#F7F7F7]">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='1366' height='1212' viewBox='0 0 1366 1212' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M284.495 -125.637L369.839 -77.3247L369.839 19.3004L284.495 67.6136L199.152 19.3004L199.152 -77.3247L284.495 -125.637Z' fill='%23007F00'/%3E%3C/svg%3E\")",
                backgroundSize: "cover",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
          </div>

          {content}
        </div>
      </div>
    );
  }
}
