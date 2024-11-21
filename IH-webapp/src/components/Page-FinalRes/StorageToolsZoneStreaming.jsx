import { Card, Chip, List, ListItem, ListItemSuffix, Typography } from '@material-tailwind/react'
import React from 'react'

const StorageToolsZoneStreaming = ({ rankZone, deployType }) => {
    return (
        <div className='w-full h-full p-2'>
            <Card className='w-full h-full flex flex-col bg-red-50'>

                <div className='flex items-center justify-center'>
                    <Typography variant='h5' color='black' className='pt-2'>Streaming Zone</Typography>
                </div>


                <div className='flex flex-row items-center justify-center gap-10 h-full w-full'>
                    <div>
                        <Typography variant='lead' color='black' className=''>
                            Recommended tools :
                        </Typography>
                    </div>

                    <div className="h-full overflow-scroll scrollbar-hide flex items-center">
                        <List className='bg-green-50 p-1'>
                            {deployType != "Cloud"
                                ? (
                                    rankZone?.map((toolData, index) => (
                                        <ListItem className='py-1 px-2' key={toolData.Id_t}>
                                            {toolData.name_t}
                                            <ListItemSuffix>
                                                <Chip
                                                    value={index + 1}
                                                    variant="ghost"
                                                    size="md"
                                                />
                                            </ListItemSuffix>
                                        </ListItem>
                                    ))
                                ) 
                                : (
                                    rankZone?.map((tool, index) => (
                                        <ListItem className='py-1 px-2' key={index}>
                                            {tool}
                                            <ListItemSuffix>
                                                <Chip
                                                    value={index + 1}
                                                    variant="ghost"
                                                    size="md"
                                                />
                                            </ListItemSuffix>
                                        </ListItem>
                                    ))
                                )
                            }
                        </List>
                    </div>
                </div>

            </Card>
        </div>
    )
}

export default StorageToolsZoneStreaming