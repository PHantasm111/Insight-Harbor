import { Button, Card, Typography } from '@material-tailwind/react'
import React from 'react'

const QuestionMiddleDownContent = () => {
  return (
    <div>
      <Card className='bg-white h-72'>
        <Typography variant='h2' className='p-4'>
          Choices :
        </Typography>
        <div className='p-4'> 
          <table className='w-full text-center text-xl border border-black'>
            <thead>
              <tr>
                <th className='border border-black'>Step</th>
                <th className='border border-black'>Source</th>
                <th className='border border-black'>Cible</th>
                <th className='border border-black'>Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border border-black'>1</td>
                <td className='border border-black'>2</td>
                <td className='border border-black'>3</td>
                <td className='border border-black'><Button variant="text">text</Button></td>
              </tr>
              <tr>
                <td className='border border-black'>1</td>
                <td className='border border-black'>2</td>
                <td className='border border-black'>3</td>
                <td className='border border-black'><Button variant="text">text</Button></td>
              </tr>
              <tr>
                <td className='border border-black'>1</td>
                <td className='border border-black'>4</td>
                <td className='border border-black'>5</td>
                <td className='border border-black'><Button variant="text">text</Button></td>
              </tr>
            </tbody>
          </table> 
        </div>
      </Card>
    </div>
  )
}

export default QuestionMiddleDownContent