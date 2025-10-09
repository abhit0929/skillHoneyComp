import * as React from 'react';
import styles from './Careerjourneys.module.scss';
import type { ICareerjourneysProps } from './ICareerjourneysProps';
import { escape } from '@microsoft/sp-lodash-subset';
import StoryCard from "./StoryCard";
import { successStoriesListData } from "./../data/detailedStories"
import "../assets/global.css"; //"../assets/global.css";
const SkillBg = (require("../assets/page-background.png").default ?? require("../assets/page-background.png")) as string;

export default class Careerjourneys extends React.Component<ICareerjourneysProps> {
  // Helper to map entity id to border color
  private getBorderColor(entityId: string): string {
    const borderColors: Record<string, string> = {
      all: "#013201",
      finance: "#8A8AD7",
      procurement: "#4D1478",
      aviation: "#77AD3D",
      biofuels: "#008B68",
      fsm: "#FFFF00",
      tech: "#9B8D04",
      castrol: "#2E5F1B",
      pulse: "#82E650",
      mc: "#B6EDB6",
    };
    return borderColors[entityId] || "#000";
  }

  public componentDidMount(): void {
    try {
      document.body.classList.add('shc-hide-commandbar');
    } catch (e) {
      // ignore in restricted environments
    }
  }

  public componentWillUnmount(): void {
    try {
      document.body.classList.remove('shc-hide-commandbar');
    } catch (e) {
      // ignore
    }
  }

  public render(): React.ReactElement<ICareerjourneysProps> {
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='1366' height='1212' viewBox='0 0 1366 1212' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M284.495 -125.637L369.839 -77.3247L369.839 19.3004L284.495 67.6136L199.152 19.3004L199.152 -77.3247L284.495 -125.637Z' fill='%23007F00'/%3E%3C/svg%3E")`,
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      </div>

      {/* Page Header */}
      <section className="container px-8 pb-5 pt-[35px]">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h1 className="text-[28px] font-light text-foreground">
              Illustrative career journeys
            </h1>
          </div>
          <p className="text-sm leading-5 text-muted-foreground">
            At bp, careers are journeys of exploration and growth. These stories
            show how our people gained diverse skills, embraced new
            opportunities, and built confidence by shaping their own unique
            paths.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section
        className="container px-8 pb-16"
        aria-label="Success stories collection"
      >
        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
          {successStoriesListData.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>
    </div>
    </div>
  );
   
}
}
