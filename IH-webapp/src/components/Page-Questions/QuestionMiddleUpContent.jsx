import { Card, Checkbox, Typography, Radio, Button } from '@material-tailwind/react'
import React from 'react'

const QuestionMiddleUpContent = () => {
  const QuestionData = [
    {
      id: 1.1,
      content: "Are you familiar with or have you used any of the following ecosystems or tools? (Select all that apply)",
      answerList: [
        "Hadoop ecosystem (e.g. HDFS, Hive, HBase)",
        "Spark ecosystem",
        "Kafka ecosystem",
        "AWS services (e.g. S3, Athena, Redshift)"
      ],
      answerType: "multiple",
    },
  ]

  return (
    <div className='mt-4 mb-2'>
      <Card className='bg-red-500'>
        <Typography variant='h2' className='p-4'>
          Question :
        </Typography>

        <form className='flex flex-col'>
          {QuestionData.map((q) => (
            <Typography key={q.id} variant='h5' className='p-4'>
              <div>
                {q.id}{" "}{q.content}
              </div>
              <div className='flex flex-col justify-center gap-2 mt-4'>
                {q.answerList.map((answer, index) => (
                  <div key={index}>
                    {q.answerType === "multiple" ? (
                      <Checkbox id={`answer-${index}`} />
                    ) : (
                      <Radio name={`question-${q.id}`} id={`answer-${index}`} />
                    )}
                    <label htmlFor={`answer-${index}`} className='ml-2'>{answer}</label>
                  </div>
                ))}
              </div>
            </Typography>
          ))}

          <Button variant="gradient" size='lg' className='self-end m-8'>Next Question</Button>
        </form>
      </Card>
    </div>
  )
}

export default QuestionMiddleUpContent