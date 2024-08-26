import { Card, Typography } from "@material-tailwind/react";
 
const TABLE_HEAD = ["Question", "Answer", ""];
 
const TABLE_ROWS = [
  {
    Question: "ABCDEFG1",
    Answer: "Yes",
  },
  {
    Question: "ABCDEFG2",
    Answer: "Yes",
  },
  {
    Question: "ABCDEFG3",
    Answer: "Yes",
  },
  {
    Question: "ABCDEFG4",
    Answer: "Yes",
  },
  {
    Question: "ABCDEFG5",
    Answer: "Yes",
  },
  {
    Question: "ABCDEFG5",
    Answer: "Yes",
  },
  {
    Question: "ABCDEFG5",
    Answer: "Yes",
  },
  
];
 
export function QuestionTable() {
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
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
          {TABLE_ROWS.map(({ Question, Answer }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={Question}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {Question}
                  </Typography>
                </td>
                <td className={`${classes} blue-gray`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {Answer}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/30`}>
                  <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                    Edit
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}