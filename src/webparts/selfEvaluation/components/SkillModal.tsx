import { X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface SkillModalData {
  id: string;
  name: string;
  category: string;
  entityIds?: string[];
  description?: string;
}

interface SkillModalProps {
  skill: SkillModalData | null;
  onClose: () => void;
  opener?: HTMLElement | null; // Reference to the element that opened the modal
  skillsData?: any[]; // Skills data for description lookup
  entitiesData?: any[]; // Entities data for tags
}

export function SkillModal({
  skill,
  onClose,
  opener,
  skillsData = [],
  entitiesData = [],
}: SkillModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (skill) {
      document.addEventListener("keydown", handleEscape);
      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 300); // After animation completes
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [skill]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
      // Return focus to the opener
      if (opener) {
        opener.focus();
      }
    }, 300); // Duration of slide down animation
  };

  if (!skill) return null;

  // Find the skill by id first to get its embedded description. Fallback to name match for legacy entries.
  const skillData =
    skillsData.find((s) => s.id === skill.id) ||
    skillsData.find((s) => s.name === skill.name);

  // Get description from skill data with fallback
  const description =
    skill.description ||
    skillData?.subSkillDescription ||
    `No description available for ${skill.name}. This skill is part of the ${skill.category} domain.`;

  // Get entity colors for tags
  const skillEntities = skill.entityIds || [];
  const relatedEntities = entitiesData.filter((entity) =>
    skillEntities.includes(entity.id),
  );

  return (
    <div
      ref={modalRef}
      className={`fixed left-1/2 bottom-0 w-full max-w-[800px] mx-4 z-50 bg-[#4A4A4A] rounded-[12px] p-1 -translate-x-1/2 ${
        isClosing ? "slide-down" : "slide-up"
      }`}
    >
      <div className="border border-[rgba(255,230,0,0.3)] rounded-[12px] m-[10px] p-4">
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors duration-200 z-10"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="pr-10">
          {/* Title */}
          <h2 className="text-white font-bold mb-2 text-base">{skill.name}</h2>

          {/* Description */}
          <p className="text-sm text-[#E0E0E0] mb-4 leading-relaxed">
            {description}
          </p>
          {/* Entity Tags */}
          {relatedEntities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {relatedEntities.map((entity) => (
                <span
                  key={entity.id}
                  className="inline-block px-3 py-1 text-sm rounded-full font-normal text-[12px]"
                  style={{
                    backgroundColor: entity.color,
                    color: entity.textColor,
                  }}
                >
                  {entity.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
