import { SkillCategoryReference } from "../types";
import { getSkill } from "../shared/utils/skillsDataAccess";

interface SkillsBackpackProps {
  skills: SkillCategoryReference[];
}

function StarRating({
  rating,
  maxRating,
}: {
  rating: number;
  maxRating: number;
}) {
  return (
    <div className="flex items-start gap-0.5">
      {Array.from({ length: maxRating }).map((_, index) => (
        <svg
          key={index}
          className="h-5 w-5"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.398438"
            width="20"
            height="20"
            rx="10"
            fill={index < rating ? "#666666" : "#DDDDDD"}
          />
          <path
            d="M10.0245 4.86196C10.1741 4.40131 10.8259 4.40131 10.9755 4.86196L11.9593 7.88983C12.0263 8.09584 12.2183 8.23532 12.4349 8.23532H15.6186C16.1029 8.23532 16.3043 8.85513 15.9124 9.13983L13.3368 11.0112C13.1615 11.1385 13.0882 11.3642 13.1552 11.5702L14.139 14.598C14.2886 15.0587 13.7614 15.4417 13.3695 15.157L10.7939 13.2857C10.6186 13.1584 10.3814 13.1584 10.2061 13.2857L7.63045 15.157C7.23859 15.4417 6.71136 15.0587 6.86103 14.598L7.84484 11.5702C7.91178 11.3642 7.83845 11.1385 7.66321 11.0112L5.08755 9.13983C4.6957 8.85513 4.89708 8.23532 5.38145 8.23532H8.56513C8.78174 8.23532 8.97372 8.09584 9.04066 7.88983L10.0245 4.86196Z"
            fill="white"
          />
        </svg>
      ))}
    </div>
  );
}

function SkillIndicator({
  proficiency,
}: {
  proficiency: "Basic" | "Intermediate" | "Advanced" | "Excellent";
}) {
  const colors = {
    Basic: "#BBBBBB",
    Intermediate: "#3C7D22",
    Advanced: "#3C7D22",
    Excellent: "#3C7D22",
  };

  return (
    <svg
      className="h-[11px] w-[13.59px]"
      width="15"
      height="12"
      viewBox="0 0 15 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.5 6.39844L3.89702 0.898437L10.6911 0.898437L14.0882 6.39844L10.6911 11.8984L3.89702 11.8984L0.5 6.39844Z"
        fill={colors[proficiency]}
      />
      <path
        d="M4.1748 1.39844L10.4121 1.39844L13.5 6.39844L10.4121 11.3984L4.1748 11.3984L1.08789 6.39844L4.1748 1.39844Z"
        stroke={proficiency === "Basic" ? "black" : "white"}
        strokeOpacity={proficiency === "Basic" ? "0.2" : "0.15"}
      />
    </svg>
  );
}

export default function SkillsBackpack({ skills }: SkillsBackpackProps) {
  return (
    <div className="flex w-full max-w-[427px] flex-col items-start gap-2.5">
      <div className="flex flex-col items-start gap-2.5 self-stretch">
        <div
          className="flex flex-col items-start gap-[17px] self-stretch rounded-b-md bg-white/90 p-[15px]"
          style={{ maxHeight: 320, overflowY: 'auto', paddingRight: 8 }}
        >
          {/* Header */}
          <div className="flex flex-col items-start gap-1.5 self-stretch">
            <div className="flex items-center justify-center gap-[15px]">
              <h3 className="text-2xl font-bold text-foreground">
                Skills backpack
              </h3>
            </div>
            <p className="self-stretch text-xs font-normal text-muted-foreground">
              Each stop represents a role. The path shows the career journey.
              The backpack contains the skills collected along the way.
            </p>
          </div>

          {/* Skills Categories */}
          <div className="flex flex-col items-start gap-[7px] self-stretch">
            {skills.map((category, categoryIndex) => {
              const categorySkill = getSkill(category.categoryId);
              const rating = parseInt(category.ratings) || 0;
              const maxRating = 5;

              return (
                <div key={categoryIndex} className="w-full">
                  {/* Category Header */}
                  <div className="flex items-center justify-between self-stretch rounded-sm bg-[#EBEBEB]/80 px-2.5 py-[5px] mb-1">
                    <div className="text-sm font-bold leading-[19px] text-[#252530]">
                      {categorySkill?.name || category.categoryId}
                    </div>
                    <StarRating rating={rating} maxRating={maxRating} />
                  </div>

                  {/* Skills List */}
                  {category.skills.map((skill, skillIndex) => {
                    const skillData = getSkill(skill.skillId);
                    return (
                      <div
                        key={skillIndex}
                        className={`flex items-center gap-1 ${skillIndex === category.skills.length - 1 ? "pb-2" : ""} pl-2`}
                      >
                        <div className="flex h-5 items-center gap-2">
                          <div className="flex items-center gap-2.5 self-stretch border-0 border-[#FFE600]">
                            <span className="text-sm font-normal leading-[19px] text-[#252530]">
                              {skillData?.name || skill.skillId}
                            </span>
                          </div>
                        </div>
                        <SkillIndicator proficiency={skill.proficiencyLevel} />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
