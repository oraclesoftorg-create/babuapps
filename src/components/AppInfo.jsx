import React from "react";
import { FaRocket, FaShieldAlt } from "react-icons/fa";
import { GrShieldSecurity } from "react-icons/gr";
const AppInfo = () => {
  return (
    <div className="w-full py-[30px] space-y-5">
      {/* Section: About App */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-[500]">About this app</h2>
          <span className="text-gray-500 text-lg">→</span>
        </div>
        <p className="text-gray-700 mt-2">
        <span className="">Apply for an Electronic Travel Authority (ETA) to travel to Australia. An Australian Government mobile app that you can use to lodge an Australian ETA application. The ETA allows eligible passport holders to travel to Australia for short-term stays for tourism or business visitor purposes. It is recommended that you apply well ahead of when you want to travel. It is suggested that you do not make travel arrangements</span>
        </p>
      </div>

      {/* Section: Latest Update */}
      <div>
        <h2 className="text-lg font-[500] mb-[10px]">Latest Update</h2>
        <p className="text-gray-500 text-sm">12.01.2025</p>
        <div className="flex space-x-2 mt-2 flex-wrap justify-start items-center space-y-3">
          <span className="bg-gray-200 text-nowrap text-gray-700 px-3 py-1 rounded-full text-sm">
         Travel & local
          </span>
        </div>
      </div>

      {/* Section: Data Protection */}
      <div>
        <h2 className="text-[15px] font-[600] flex items-center">
          <GrShieldSecurity className="text-blue-500 mr-2" /> Data safety
        </h2>
        <p className="text-gray-700 mt-2">
          Safety starts with understanding how developers collect and share your data. Data privacy and security practices may vary based on your use, region, and age. The developer provided this information and may update it over time
        </p>
      </div>
    </div>
  );
};

export default AppInfo;
