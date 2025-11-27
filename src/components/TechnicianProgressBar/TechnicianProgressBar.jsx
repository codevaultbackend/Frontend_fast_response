import React, { useEffect, useState } from "react";

function TechnicianProgressBar({ works }) {
  const [barValue, setBarValue] = useState("0");
  const [barNumber, setBarNumber] = useState("0");
  const [currentWork, setCurrentWork] = useState(null);

  useEffect(() => {
    if (!works || works.length === 0) {
      setBarValue("0");
      setBarNumber("0");
      setCurrentWork(null);
      return;
    }

    const activeWork = works.find(work =>
      ["inprogress", "dispatch", "completed"].includes(work.status)
    );

    if (!activeWork) {
      setBarValue("0");
      setBarNumber("0");
      setCurrentWork(null);
      return;
    }

    setCurrentWork(activeWork);

    const status = activeWork.status;

    if (["inprogress", "dispatch"].includes(status)) {
      setBarValue("50");
      setBarNumber("2");
    } else if (status === "completed") {
      setBarValue("75");
      setBarNumber("3");
    } else if (["open", "taken", "approved"].includes(status)) {
      setBarValue("25");
      setBarNumber("1");
    } else {
      setBarValue("100");
      setBarNumber("4");
    }
  }, [works]);

  return (
    <div className="TechnicianProgressBar max-w-[1120px] p-[15px] bg-white mx-auto my-[10px] shadow-[0px_1px_3px_0px_#0000001A] mb-[10px] max-[870px]:max-w-[95%] max-[870px]:mx-auto">
      <div className="divmain flex justify-between flex-col gap-2">
        <div className="bar-header flex justify-between">
          <p className="text-[11px] text-[#364153] font-semibold">Daily Progress</p>
          <p className="text-[#2E7D32] font-[700] text-[10px]">{barValue}%</p>
        </div>

        <div className="outerbar h-[12px] bg-[#E5E7EB] relative w-full rounded-[26px] overflow-hidden">
          <div
            className="inneroverlay absolute h-full bg-gradient-to-r from-[#FFC2CA] to-[#00C950]"
            style={{ width: `${barValue}%` }}
          ></div>
        </div>

        <div className="bar-footer flex justify-between">
          <p className="text-[#6A7282] text-[9.4px]">{barNumber} of 4 completed</p>
          <p className="text-[9.4px] text-[#155DFC]">
            <i className="fa-regular fa-clock"></i> {currentWork ? 1 : 0} in progress
          </p>
        </div>
      </div>
    </div>
  );
}

export default TechnicianProgressBar;
