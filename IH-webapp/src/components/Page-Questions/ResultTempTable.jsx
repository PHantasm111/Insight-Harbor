import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Name", "AVG_Rank"];


export function ResultTempTable({ resultStore, step }) {

  return (
    <Card className="w-full max-w-4xl max-h-96 overflow-auto">
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
          {resultStore && resultStore.length >= step && resultStore.length != 0 ? (
            resultStore.map((stepResult, stepIndex) => {

              const tools = stepResult[step];

              return tools.map((t, index) => {
                const isLast = index === tools.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={t.Id_t}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {t.name_t}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                  </tr>
                );
              });
            })
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  No results available
                </Typography>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}