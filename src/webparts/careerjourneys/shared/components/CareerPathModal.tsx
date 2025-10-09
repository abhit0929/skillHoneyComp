import { X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface CareerPathModalData {
  role: string;
  description: string;
  learningMilestones: string;
}

interface CareerPathModalProps {
  careerStep: CareerPathModalData | null;
  onClose: () => void;
  opener?: HTMLElement | null; // Reference to the element that opened the modal
}

export function CareerPathModal({
  careerStep,
  onClose,
  opener,
}: CareerPathModalProps) {
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

    if (careerStep) {
      document.addEventListener("keydown", handleEscape);
      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 300); // After animation completes
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [careerStep]);

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

  if (!careerStep) return null;

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
          {/* Learning Milestone */}
          <div className="mb-4">
            <p className="text-sm text-white leading-relaxed">
              <span className="text-base font-bold">Learning Milestone:</span>{" "}
              {careerStep.learningMilestones}
            </p>
          </div>

          {/* Role Description */}
          <div>
            <p className="text-sm text-white leading-relaxed">
              <span className="text-base font-bold">{careerStep.role}:</span>{" "}
              {careerStep.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
