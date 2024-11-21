import React, { useState } from 'react';
import TopBar from '../components/Page-FinalRes/TopBar';
import SourceZone from '../components/Page-FinalRes/SourceZone';
import StorageToolsZoneBatch from '../components/Page-FinalRes/StorageToolsZoneBatch';
import StorageToolsZoneStreaming from '../components/Page-FinalRes/StorageToolsZoneStreaming';
import { FinalResProvider } from '../context/finalResContext'
import { useLocation } from 'react-router-dom';

const FinalRes = () => {

  const location = useLocation();
  const { dataToPass } = location.state || {};

  // Variable that show where the data from, normally from page question so false,
  // some time data will come from page history

  console.log("接受到的数据", dataToPass)

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
  const { fromH = false } = dataToPass || {};

  console.log("fromH", fromH)

  let sourceBatch;
  let sourceStreaming;
  let sourceRealtimeStreaming;

  let storageZone1;
  let rankZone1;

  let storageZone2;
  let rankZone2;
  let rankZone2RealtimeStreaming;

  let storageZone3;
  let rankZone3;

  let totalQ;
  let timer;

  let model;
  let sourceZoneModel;

  let resultStore;
  let allQuestionsData;
  let sourceAndTargetStep1;
  let architectureCloud;
  let platform;



  const deployMode = dataToPass.deployMode ? dataToPass.deployMode : "On-premises";

  if (deployMode === "Cloud") {
    allQuestionsData = dataToPass.allQuestionsData;
    architectureCloud = dataToPass.architectureCloud;
    platform = dataToPass.platform;
    timer = dataToPass.timer;
    totalQ = parseInt(allQuestionsData.length);

    const source = architectureCloud.source;

    console.log("source", source)

    if (source === "batch") {
      model = 2;
      sourceZoneModel = "Batch"
    } else if (source === "streaming") {
      model = 3;
      sourceZoneModel = "Streaming"
    } else if (source === "hybrid") {
      model = 1;
      sourceZoneModel = "Batch and Streaming"
    }

    console.log("model", model, sourceZoneModel)

    storageZone1 = storageZone2 = storageZone3 = architectureCloud.storage;
    rankZone1 = architectureCloud.ingestion.slice(0, 2);

    architectureCloud.processing.map((item) => {
      if (item.complex) {
        rankZone2 = item.complex;
      } else if (item.simple) {
        rankZone2 = item.simple;
      }

      if (item.realTime) {
        rankZone2RealtimeStreaming = item.realTime
      } else if (item.complex) {
        rankZone2RealtimeStreaming = item.complex
      } else {
        rankZone2RealtimeStreaming = item.simple
      }

    })

    if (architectureCloud.ingestion.length === 4) {
      rankZone2RealtimeStreaming = architectureCloud.ingestion.slice(-2,-1);
    } else if (architectureCloud.ingestion.length === 3) {
      rankZone2RealtimeStreaming = architectureCloud.ingestion.slice(-1);
    }
    

    rankZone3 = architectureCloud.query

    console.log("all data cloud", storageZone1, rankZone1, rankZone2, rankZone3, rankZone2RealtimeStreaming)

  } else {
    // get the data passed from QuestionRightSideBar
    resultStore = dataToPass.resultStore;
    allQuestionsData = dataToPass.allQuestionsData;
    sourceAndTargetStep1 = dataToPass.sourceAndTargetStep1;
    timer = dataToPass.timer;

    // Calculate the total number of questions
    totalQ = parseInt(allQuestionsData.length);

    console.log(resultStore, allQuestionsData, sourceAndTargetStep1)


    // Search the model from allQuestionData
    const getAnswerById = (qId) => {
      const question = allQuestionsData.find(q => q.questionId === qId);
      return question ? Object.values(question.userSelections[0])[0] : null;
    }


    // Calculate the data for <SourceZone>
    // sourceBatch is a LIST !!!
    sourceBatch = sourceAndTargetStep1.filter(pair => pair.step === 1 && (pair.sourceStreaming === 0 || !pair.hasOwnProperty('sourceStreaming'))).map(pair => pair.source)

    sourceRealtimeStreaming = sourceAndTargetStep1
      .filter(pair => pair.step === 2 && pair.sourceStreaming === 1)
      .map(pair => pair.source);

    sourceStreaming = sourceAndTargetStep1
      .filter(pair => pair.step === 1 && pair.ingestType === "Streaming")
      .map(pair => pair.source);

    // Calculate 1st Zone => <Ingestion zone>
    // NEED 2 things => 1. target step 1 from sourceAndTargetStep1
    storageZone1 = sourceAndTargetStep1.filter(pair => pair.step === 1 && (pair.sourceStreaming === 0 || !pair.hasOwnProperty('sourceStreaming'))).map(pair => pair.target)
    console.log("storageZone1", storageZone1)

    // 2. tools rank from resultStore & step 1
    rankZone1 = resultStore[1]
    //console.log("rank z1", rankZone1)

    // Calculate 2nd Zone => <Preparation zone>
    storageZone2 = sourceAndTargetStep1.filter(pair => pair.step === 2).map(pair => pair.target)
    rankZone2 = resultStore[2]
    console.log("storageZone2", storageZone2)

    // Calculate 3rd Zone => <Analyse zone>
    storageZone3 = sourceAndTargetStep1
      .filter(pair => (pair.step === 3) || (pair.step === 1 && pair.sourceStreaming === 1))
      .map(pair => {
        if (pair.step === 1 && pair.sourceStreaming === 1) {
          return pair.target + " (source : " + pair.source + ")";
        }
        return pair.target;
      });


    rankZone3 = resultStore[3]
    console.log("storageZone3", storageZone3)


    // Analyse the answer5 & Answer16 to determine which model 3to use  
    const Answer5 = getAnswerById(5);
    const Answer16 = getAnswerById(16);

    if (Answer5 === "Batch") {
      model = 2;
      sourceZoneModel = "Batch"
    } else if (Answer5 === "Streaming") {
      if (Answer16 === "Offline analysis") {
        model = 2;
        sourceZoneModel = "Batch"
      } else {
        model = 3;
        sourceZoneModel = "Streaming"
      }
    } else if (Answer5 === "Hybrid") {
      if (Answer16 === "Offline analysis") {
        model = 2;
        sourceZoneModel = "Batch and Streaming"
      } else {
        model = 1;
        sourceZoneModel = "Batch and Streaming"
      }
    }
  }


  const renderContent = (model) => {
    switch (model) {
      case 1:
        return (<>
          {/* ---- Hybrid Section ---- */}
          {/* TopBar section */}
          <div className="flex items-center bg-white mx-4 p-2 mt-4 h-1/6 rounded-xl">
            <TopBar totalQ={totalQ} timer={timer} dataToSave={dataToSave} fromH={fromH} />
          </div>

          {/* Main content section */}
          <div className="flex flex-row bg-white mx-4 mb-4 p-2 flex-1 rounded-xl">
            {/* Source Zone */}
            <div className="w-2/12 h-full">
              <SourceZone sourceBatch={sourceBatch} model={sourceZoneModel} sourceStreaming={sourceStreaming} />
            </div>

            {/* Storage Tools Zone */}
            <div className="flex flex-col items-center w-7/12 h-full">
              {/* Streaming Tools */}
              <div className="h-1/4 w-full">
                <StorageToolsZoneStreaming rankZone={rankZone2} />
              </div>

              {/* Batch Storage Tools */}
              <div className="flex flex-row w-full h-3/4">
                <div className="w-1/2 h-full">
                  <StorageToolsZoneBatch nameZone={"Ingestion Zone"} storageZone={storageZone1} rankZone={rankZone1} />
                </div>
                <div className="w-1/2 h-full">
                  <StorageToolsZoneBatch nameZone={"Preparation Zone"} storageZone={storageZone2} rankZone={rankZone2} />
                </div>
              </div>
            </div>

            {/* Right-Side Batch Tools */}
            <div className="w-3/12 h-full">
              <StorageToolsZoneBatch nameZone={"Analyse Zone"} storageZone={storageZone3} rankZone={rankZone3} />
            </div>
          </div>
        </>)

      case 2:
        return (<>
          {/* ---- Batch Section ---- */}
          {/* TopBar section */}
          <div className="flex items-center bg-white mx-4 p-2 mt-4 h-1/6 rounded-xl">
            <TopBar totalQ={totalQ} timer={timer} dataToSave={dataToSave} fromH={fromH} />
          </div>

          {/* Main content section */}
          <div className="flex flex-row bg-white mx-4 mb-4 p-2 flex-1 rounded-xl">
            {/* Source Zone */}
            <div className="w-2/12 h-full">
              <SourceZone sourceBatch={sourceBatch} model={sourceZoneModel} sourceStreaming={sourceStreaming} />
            </div>
            {/* Storage & Tools Zone */}
            <div className='flex w-full'>
              <div className="w-1/3 h-full">
                <StorageToolsZoneBatch nameZone={"Ingestion Zone"} storageZone={storageZone1} rankZone={rankZone1} />
              </div>
              <div className="w-1/3 h-full">
                <StorageToolsZoneBatch nameZone={"Preparation Zone"} storageZone={storageZone2} rankZone={rankZone2} />
              </div>
              <div className="w-1/3 h-full">
                <StorageToolsZoneBatch nameZone={"Analyse Zone"} storageZone={storageZone3} rankZone={rankZone3} />
              </div>
            </div>
          </div>
        </>)

      case 3:
        return (<>
          {/* ---- Streaming Section ---- */}
          {/* TopBar section */}
          <div className="flex items-center bg-white mx-4 p-2 mt-4 h-1/6 rounded-xl">
            <TopBar totalQ={totalQ} timer={timer} dataToSave={dataToSave} fromH={fromH} />
          </div>

          {/* Main content section */}
          <div className="flex flex-row bg-white mx-4 mb-4 p-2 flex-1 rounded-xl">
            {/* Source Zone */}
            <div className="w-2/12 h-full">
              <SourceZone sourceBatch={sourceBatch} model={sourceZoneModel} sourceStreaming={sourceRealtimeStreaming} />
            </div>

            {/* Storage Tools Zone */}
            <div className="flex flex-col items-center justify-center w-7/12 h-full">
              {/* Streaming Tools */}
              <div className="h-1/2 w-full">
                <StorageToolsZoneStreaming rankZone={rankZone2} />
              </div>
            </div>

            {/* Right-Side Batch Tools */}
            <div className="w-3/12 h-full">
              <StorageToolsZoneBatch nameZone={"Analyse Zone"} storageZone={storageZone2} />
            </div>
          </div>
        </>)
      default:
        break;
    }
  }

  const rederCloudArchitectureContent = (model) => {
    switch (model) {
      case 1:
        return (
          <>
            {/* Hybrid Cloud Architecture */}
            {/* TopBar section */}
            <div className="flex items-center bg-white mx-4 p-2 mt-4 h-1/6 rounded-xl">
              <TopBar totalQ={totalQ} timer={timer} dataToSave={dataToSave} fromH={fromH} />
            </div>

            {/* Main content section */}
            <div className="flex flex-row justify-center bg-white mx-4 mb-4 p-2 flex-1 rounded-xl">
              {/* Storage Tools Zone */}
              <div className="flex flex-col items-center w-7/12 h-full">
                {/* Streaming Tools */}
                <div className="h-1/4 w-full">
                  <StorageToolsZoneStreaming rankZone={rankZone2RealtimeStreaming} deployType={deployMode} />
                </div>

                {/* Batch Storage Tools */}
                <div className="flex flex-row w-full h-3/4">
                  <div className="w-1/2 h-full">
                    <StorageToolsZoneBatch nameZone={"Ingestion Zone"} storageZone={storageZone1} rankZone={rankZone1} deployType={deployMode} />
                  </div>
                  <div className="w-1/2 h-full">
                    <StorageToolsZoneBatch nameZone={"Preparation Zone"} storageZone={storageZone2} rankZone={rankZone2} deployType={deployMode} />
                  </div>
                </div>
              </div>

              {/* Right-Side Batch Tools */}
              <div className="w-3/12 h-full">
                <StorageToolsZoneBatch nameZone={"Analyse Zone"} storageZone={storageZone3} rankZone={rankZone3} deployType={deployMode} />
              </div>
            </div>

          </>
        )
      case 2:
        return (<>
          {/* ---- Batch Section ---- */}
          {/* TopBar section */}
          <div className="flex items-center bg-white mx-4 p-2 mt-4 h-1/6 rounded-xl">
            <TopBar totalQ={totalQ} timer={timer} dataToSave={dataToSave} fromH={fromH} />
          </div>

          {/* Main content section */}
          <div className="flex flex-row bg-white mx-4 mb-4 p-2 flex-1 rounded-xl">
            {/* Storage & Tools Zone */}
            <div className='flex w-full'>
              <div className="w-1/3 h-full">
                <StorageToolsZoneBatch nameZone={"Ingestion Zone"} storageZone={storageZone1} rankZone={rankZone1} deployType={deployMode}/>
              </div>
              <div className="w-1/3 h-full">
                <StorageToolsZoneBatch nameZone={"Preparation Zone"} storageZone={storageZone2} rankZone={rankZone2} deployType={deployMode}/>
              </div>
              <div className="w-1/3 h-full">
                <StorageToolsZoneBatch nameZone={"Analyse Zone"} storageZone={storageZone3} rankZone={rankZone3} deployType={deployMode}/>
              </div>
            </div>
          </div>
        </>)
      case 3:
        return (<>
          {/* ---- Streaming Section ---- */}
          {/* TopBar section */}
          <div className="flex items-center justify-center bg-white mx-4 p-2 mt-4 h-1/6 rounded-xl">
            <TopBar totalQ={totalQ} timer={timer} dataToSave={dataToSave} fromH={fromH} />
          </div>

          {/* Main content section */}
          <div className="flex flex-row bg-white mx-4 mb-4 p-2 flex-1 rounded-xl">
            {/* Storage Tools Zone */}
            <div className="flex flex-col items-center justify-center w-7/12 h-full">
              {/* Streaming Tools */}
              <div className="h-1/2 w-full">
                <StorageToolsZoneStreaming rankZone={rankZone1} deployType={deployMode} />
              </div>
            </div>

            {/* Right-Side Batch Tools */}
            <div className="w-3/12 h-full">
              <StorageToolsZoneBatch nameZone={"Analyse Zone"} storageZone={storageZone2} rankZone={rankZone2} deployType={deployMode} />
            </div>
          </div>
        </>)
      default:
        break;
    }
  }


  // Create a dataset to send to Topbar for saving into the database
  const dataToSave = {
    timer,
    currentUser,
    model,
    sourceZoneModel,
    resultStore,
    allQuestionsData,
    sourceAndTargetStep1,
    deployMode,
    architectureCloud,
  }

  console.log("发给TOP的数据", dataToSave)

  return (
    <FinalResProvider>
      <div className='min-h-screen w-full bg-gray-300 p-2'>
        <div className="flex flex-col gap-2 w-full h-screen justify-center">
          {deployMode != "Cloud"
            ? renderContent(model)
            : (
              rederCloudArchitectureContent(model)
            )
          }
        </div>
      </div>
    </FinalResProvider>
  );
};

export default FinalRes;
