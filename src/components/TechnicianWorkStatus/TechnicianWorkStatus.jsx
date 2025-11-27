import React from "react";

const STATUS_STEPS = [
  { key: "approved", label: "Approved" },
  { key: "dispatch", label: "Dispatched" },
  { key: "inprogress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "confirm", label: "Payment" },
];

export default function TechnicianWorkStatus({ workStatus }) {
  const currentIndex = STATUS_STEPS.findIndex(
    (step) => step.key === workStatus
  );

  return (
    <div className="w-full flex justify-center py-6">
      <div className="flex items-center justify-center gap-6 w-full max-w-[900px] px-2">
        {STATUS_STEPS.map((step, index) => {
          const isDone = index <= currentIndex;
          const isLast = index === STATUS_STEPS.length - 1;

          return (
            <div
              key={step.key}
              className="flex flex-col items-center relative flex-1"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold z-10 max-[768px]:h-5 max-[768px]:w-5
                  ${
                    isDone
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }
                `}
              >
                {index + 1}
              </div>

              <p className="mt-2 text-xs sm:text-sm text-center w-full max-[768px]:text-[10px] max-[768px]:h-[25px] ">
                {step.label}
              </p>

              {!isLast && (
                <div className="absolute top-3 left-1/2 w-full h-1 flex-1">
                  <div
                    className={`h-1 w-full max-[768px]:w-[70px] ${
                      index < currentIndex ? "bg-green-500" : "bg-gray-300"
                    } max-[768px]:!ml-[15%] z-[-1]`}
                    style={{ marginLeft: "8.7%" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
