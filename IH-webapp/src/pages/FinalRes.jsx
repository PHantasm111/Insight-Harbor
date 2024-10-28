import React, { useContext, useState } from 'react';
import TopBar from '../components/Page-FinalRes/TopBar';
import SourceZone from '../components/Page-FinalRes/SourceZone';
import StorageToolsZoneBatch from '../components/Page-FinalRes/StorageToolsZoneBatch';
import StorageToolsZoneStreaming from '../components/Page-FinalRes/StorageToolsZoneStreaming';
import { FinalResContext, FinalResProvider } from '../context/finalResContext'
import { useLocation } from 'react-router-dom';

const FinalRes = () => {

  const location = useLocation();
  const { dataToPass } = location.state || {};

  // Variable that show where the data from, normally from page question so false,
  // some time data will come from page history
  let fromPageHistory = false;

  console.log("接受到的数据", dataToPass)

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

  // get the data passed from QuestionRightSideBar
  const { resultStore, allQuestionsData, sourceAndTargetStep1, timer } = dataToPass;

  const { fromH = false } = dataToPass || {};

  console.log("fromH", fromH)
  console.log("timer",timer)

  // Calculate the total number of questions
  const totalQ = parseInt(allQuestionsData.length);

  console.log(resultStore, allQuestionsData, sourceAndTargetStep1)

  // Search the model from allQuestionData
  const getAnswerById = (qId) => {
    const question = allQuestionsData.find(q => q.questionId === qId);
    return question ? Object.values(question.userSelections[0])[0] : null;
  }

  // Calculate the data for <SourceZone>
  // sourceBatch is a LIST !!!
  const sourceBatch = sourceAndTargetStep1.filter(pair => pair.step === 1 && (pair.sourceStreaming === 0 || !pair.hasOwnProperty('sourceStreaming'))).map(pair => pair.source)
  //console.log(sourceBatch)

  const sourceRealtimeStreaming = sourceAndTargetStep1
    .filter(pair => pair.step === 2 && pair.sourceStreaming === 1)
    .map(pair => pair.source);

  const sourceStreaming = sourceAndTargetStep1
    .filter(pair => pair.step === 1 && pair.ingestType === "Streaming")
    .map(pair => pair.source);
  //console.log("123",sourceStreaming);

  // Calculate 1st Zone => <Ingestion zone>
  // NEED 2 things => 1. target step 1 from sourceAndTargetStep1
  const storageZone1 = sourceAndTargetStep1.filter(pair => pair.step === 1 && (pair.sourceStreaming === 0 || !pair.hasOwnProperty('sourceStreaming'))).map(pair => pair.target)
  console.log("storageZone1", storageZone1)

  // 2. tools rank from resultStore & step 1
  const rankZone1 = resultStore[1]
  //console.log("rank z1", rankZone1)

  // Calculate 2nd Zone => <Preparation zone>
  const storageZone2 = sourceAndTargetStep1.filter(pair => pair.step === 2).map(pair => pair.target)
  const rankZone2 = resultStore[2]
  console.log("storageZone2", storageZone2)

  // Calculate 3rd Zone => <Analyse zone>
  const storageZone3 = sourceAndTargetStep1
    .filter(pair => (pair.step === 3) || (pair.step === 1 && pair.sourceStreaming === 1))
    .map(pair => {
      if (pair.step === 1 && pair.sourceStreaming === 1) {
        return pair.target + " (source : " + pair.source + ")";
      }
      return pair.target;
    });


  const rankZone3 = resultStore[3]
  console.log("storageZone3", storageZone3)


  // Analyse the answer5 & Answer16 to determine which model 3to use  
  const Answer5 = getAnswerById(5);
  const Answer16 = getAnswerById(16);

  // Model of source content
  let sourceZoneModel;

  // Model of the content
  let model;

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

  // Function to switch content model
  const renderContent = (model) => {
    switch (model) {
      case 1:
        return (<>
          {/* ---- Hybrid Section ---- */}
          {/* TopBar section */}
          <div className="flex items-center bg-white mx-4 p-2 mt-4 h-1/6 rounded-xl">
            <TopBar totalQ={totalQ} timer={timer} dataToSave={dataToSave} fromH={fromH}/>
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
            <TopBar totalQ={totalQ} timer={timer} dataToSave={dataToSave} fromH={fromH}/>
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
            <TopBar totalQ={totalQ} timer={timer} dataToSave={dataToSave} fromH={fromH}/>
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

  // Create a dataset to send to Topbar for saving into the database
  const dataToSave = {
    sourceBatch,
    sourceStreaming,
    sourceRealtimeStreaming,
    storageZone1,
    rankZone1,
    storageZone2,
    rankZone2,
    storageZone3,
    rankZone3,
    totalQ,
    timer,
    currentUser,
    model,
    sourceZoneModel,
    resultStore,
    allQuestionsData,
    sourceAndTargetStep1,
  }

  console.log("发给TOP的数据", dataToSave)

  return (
    <FinalResProvider>
      <div className='min-h-screen w-full bg-gray-300 p-2'>
        <div className="flex flex-col gap-2 w-full h-screen justify-center">
          {renderContent(model)}
        </div>
      </div>
    </FinalResProvider>
  );
};

export default FinalRes;
