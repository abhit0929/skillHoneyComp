interface EmployeeProfileCardProps {
  name: string;
  careerJourney: string;
  quote: string;
  imageUrl: string;
  employeeId: string;
}

export default function EmployeeProfileCard({
  name,
  careerJourney,
  quote,
  imageUrl,
  employeeId,
}: EmployeeProfileCardProps) {
  return (
    <div className="flex w-full max-w-[427px] flex-col items-start gap-[26px]">
      {/* Profile Card */}
      <div className="flex w-full items-center gap-[-48px]">
        <div className="flex w-full items-center gap-2.5 rounded-t-md border border-[rgba(0,127,0,0.1)] bg-[#FAFCF2] p-2.5">
          {/* Hexagonal Profile Image */}
          <div className="relative h-[90px] w-[80px] flex-shrink-0">
            <svg
              width="82"
              height="91"
              viewBox="0 0 82 91"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id={`hexClipProfile-${employeeId}`}>
                  <path d="M39.3262 2.52734L78.1524 24.5061L78.1524 68.4641L39.3262 90.4433L0.5 68.4641L0.5 24.5061L39.3262 2.52734Z" />
                </clipPath>
              </defs>
              <image
                href={imageUrl}
                x="0.5"
                y="2.5"
                width="77.65"
                height="87.92"
                clipPath={`url(#hexClipProfile-${employeeId})`}
                preserveAspectRatio="xMidYMid slice"
              />
              <path
                opacity="0.4"
                d="M73.0068 27.4248L73.0068 65.541L39.3262 84.6074L5.64648 65.541L5.64648 27.4248L39.3262 8.35937L73.0068 27.4248Z"
                stroke="white"
              />
            </svg>
          </div>

          {/* Name and Details */}
          <div className="flex flex-1 flex-col items-start gap-2.5">
            <div className="flex h-[19px] items-center gap-2.5 self-stretch">
              <h2 className="text-base font-bold text-foreground">{name}</h2>
              <span className="text-right text-xs font-normal text-foreground">
                ({careerJourney})
              </span>
            </div>
            <div className="relative flex flex-col items-start gap-2.5 self-stretch">
              <p className="text-xs font-normal text-foreground">
                <span aria-hidden="true" className="opacity-40">
                  “
                </span>
                {quote}
                <span aria-hidden="true" className="opacity-40">
                  ”
                </span>
              </p>
            </div>
          </div>

          {/* Quote Marks */}
          {/*<svg
            className="absolute left-[108px] top-[48px] h-[10px] w-[12px] opacity-40"
            width="13"
            height="11"
            viewBox="0 0 13 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M-0.00976562 10.3775V7.86585C-0.00976562 7.02171 0.128619 6.14296 0.405389 5.22962C0.695996 4.30245 1.11115 3.41678 1.65085 2.57264C2.19055 1.71465 2.84096 0.974294 3.60208 0.351562L5.78163 1.86688C5.14507 2.78021 4.6538 3.72123 4.30784 4.68992C3.96188 5.64478 3.78889 6.68266 3.78889 7.80358V10.3775H-0.00976562ZM6.52891 10.3775V7.86585C6.52891 7.02171 6.6673 6.14296 6.94407 5.22962C7.23467 4.30245 7.64983 3.41678 8.18953 2.57264C8.72923 1.71465 9.37964 0.974294 10.1408 0.351562L12.3203 1.86688C11.6837 2.78021 11.1925 3.72123 10.8465 4.68992C10.5006 5.64478 10.3276 6.68266 10.3276 7.80358V10.3775H6.52891Z"
              fill="black"
            />
          </svg>*/}
        </div>
      </div>
    </div>
  );
}
