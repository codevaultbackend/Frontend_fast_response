import React from "react";

function MetchTechnicians({
  loadingTechs,
  selectedTechnician,
  technicians,
  setSelectedTechnician,
  setShowPopup,
  setStep,
}) {
  return (
    <div className="MetchTechnicians">
      <div>
        <h3 className="text-xl font-bold mb-4 text-center">
          Select a Technician
        </h3>

        {loadingTechs ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : technicians.length > 0 ? (
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {technicians.map((tech) => (
              <div
                key={tech._id}
                className={`border rounded-lg p-3 cursor-pointer ${
                  selectedTechnician?._id === tech._id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                } flex  justify-between`}
                onClick={() => setSelectedTechnician(tech)}
              >
                <div className="name-details">
                <p className="font-semibold">
                  {tech.firstName || tech.name} {tech.lastName || ""}
                </p>
                <p className="font-semibold">
                  {tech.email} 
                </p>
                <p className="text-sm text-gray-600">
                  {tech.location}
                </p>
                <p className="text-sm text-gray-600">
                  {tech.specialization?.join(", ")}
                </p>
                </div>
                <p className="text-xs text-green-600">
                  {tech.employeeStatus || "available"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No matching technicians found.
          </p>
        )}

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setShowPopup(false)}
            className="flex-1 border border-gray-400 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            disabled={!selectedTechnician}
            onClick={() => setStep(1)}
            className="flex-1 bg-[#473BF0] text-white py-2 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default MetchTechnicians;
