import { Card, Typography } from "@material-tailwind/react";
import { useContext } from "react";
import { QuestionContext } from "../../context/questionContext";

const TABLE_HEAD = ["Name", "AVG_Rank"];


export function ResultTempTable({ resultStore, step }) {

  const { allQuestionsData } = useContext(QuestionContext);

  let showRank;

  if (allQuestionsData && allQuestionsData.length > 0) {
    const filteredQuestions = allQuestionsData.filter(q => q.questionId === 1);

    if (filteredQuestions.length > 0) {
      const userSelections = filteredQuestions[0].userSelections;

      if (userSelections && userSelections.length > 0) {
        const userSelectionValue = Object.values(userSelections[0])[0];
        showRank = userSelectionValue !== "On cloud";
      } else {
        console.error("No user selections available for questionId 1");
      }
    } else {
      console.error("No question with questionId 1 found");
    }
  }

  return (
    <Card className="w-full max-w-4xl max-h-96 overflow-auto bg-white/50">
      <table className="w-full table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {resultStore && resultStore.length > 0 ? (
            resultStore.map((stepResult, stepIndex) => {

              const isLast = stepIndex === resultStore.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={stepResult.Id_t}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {stepResult.name_t}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {showRank ? stepIndex + 1 : "-"}
                    </Typography>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  No available result
                </Typography>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}