import React from 'react';
import TopBar from '../components/Page-FinalRes/TopBar';
import { Card } from '@material-tailwind/react';
import SourceZone from '../components/Page-FinalRes/SourceZone';
import StorageToolsZoneBatch from '../components/Page-FinalRes/StorageToolsZoneBatch';
import StorageToolsZoneStreaming from '../components/Page-FinalRes/StorageToolsZoneStreaming';

const FinalRes = () => {
  const model = 1;

  return (
    <div className="flex flex-col gap-2 w-full h-screen bg-gray-300 overflow-auto justify-center">
      {/* TopBar section */}
      <div className="flex items-center bg-white mx-4 p-2 mt-4 h-1/6 rounded-xl">
        <TopBar />
      </div>

      {/* Main content section */}
      <div className="flex flex-row bg-white mx-4 mb-4 p-2 flex-1 rounded-xl">
        {/* Source Zone */}
        <div className="w-2/12 h-full">
          <SourceZone />
        </div>

        {/* Storage Tools Zone */}
        <div className="flex flex-col items-center w-7/12 h-full">
          {/* Streaming Tools */}
          <div className="h-1/4 w-full">
            <StorageToolsZoneStreaming />
          </div>

          {/* Batch Storage Tools */}
          <div className="flex flex-row w-full h-3/4">
            <div className="w-1/2 h-full">
              <StorageToolsZoneBatch />
            </div>
            <div className="w-1/2 h-full">
              <StorageToolsZoneBatch />
            </div>
          </div>
        </div>

        {/* Right-Side Batch Tools */}
        <div className="w-3/12 h-full">
          <StorageToolsZoneBatch />
        </div>
      </div>
    </div>
  );
};

export default FinalRes;
