import { FaShareAlt, FaCloudUploadAlt, FaLock, FaTrashAlt } from "react-icons/fa";

const DataPermissionBox = () => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg  w-full">
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <FaShareAlt className="text-gray-600" />
          <p className="text-gray-700">
           This app may share these data types with third parties
Location, Personal info and 4 others
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <FaCloudUploadAlt className="text-gray-600" />
          <p className="text-gray-700">
          This app may collect these data types
Personal info and Device or other IDs
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <FaLock className="text-gray-600" />
          <p className="text-gray-700">
           Data is encrypted in transit
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <FaTrashAlt className="text-gray-600" />
          <p className="text-gray-700">
            Data can’t be deleted
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataPermissionBox;
