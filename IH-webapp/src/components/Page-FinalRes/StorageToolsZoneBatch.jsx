import { Card, Chip, List, ListItem, ListItemSuffix, Typography } from '@material-tailwind/react'
import React from 'react'

const StorageToolsZoneBatch = ({ nameZone, storageZone, rankZone, deployType }) => {

  // IF there is no data, hide this component
  const showContent = storageZone && rankZone

  return (
    <div className="w-full h-full p-2">
      {storageZone && <Card className="bg-yellow-50 h-full w-full p-4">
        {/* Functional Zone Header */}
        <div className="flex justify-center h-auto mn-4">
          <Typography variant="h5" color="black" className="p-2">
            {nameZone ? nameZone : "Functional zone"}
          </Typography>
        </div>

        {/* Tools Section */}
        {rankZone &&
          <>
            <div className='my-4'>
              <Typography variant="lead" color="black" className="mb-2">
                Tools
              </Typography>
              <div className="h-40 overflow-auto">
                <List className="bg-green-50 p-1">
                  {/* List items for tools */}
                  {deployType != "Cloud"
                    ? (
                      rankZone?.map((toolData, index) => (
                        <ListItem key={toolData.Id_t} className="py-1 px-2">
                          {toolData.name_t}
                          <ListItemSuffix>
                            <Chip value={index + 1} variant="ghost" size="lg" />
                          </ListItemSuffix>
                        </ListItem>
                      )))
                    : (
                      nameZone === "Ingestion Zone"
                        ? (
                          rankZone?.map((tool, index) => (
                            <ListItem key={index} className="py-1 px-2">
                              {tool}
                              <ListItemSuffix>
                                <Chip value={index + 1} variant="ghost" size="lg" />
                              </ListItemSuffix>
                            </ListItem>
                          ))
                        )
                        : nameZone === "Preparation zone"
                          ? (
                            <ListItem>{rankZone}</ListItem>
                          )
                          : (
                            <ListItem>{rankZone}</ListItem>
                          )
                    )
                  }
                </List>
              </div>
            </div>

            <div className='h-10 flex flex-col justify-between items-center gap-1'>
              <i className="fa-solid fa-sort-down fa-2xl"></i>
              <i className="fa-solid fa-sort-down fa-2xl"></i>
              <i className="fa-solid fa-sort-down fa-2xl"></i>
            </div>
          </>
        }


        {/* Storage Section */}
        <div className="my-4">
          <Typography variant="lead" color="black" className="mb-2">
            Storage
          </Typography>
          <div className="max-h-40 overflow-auto">
            <List className="bg-green-50 p-1">
              {/* List items for storage */}
              {deployType != "Cloud"
                ? (
                  storageZone?.map((storage, index) => (
                    <ListItem key={index} className="py-1 px-2">
                      {storage}
                    </ListItem>
                  ))
                )
                : (
                  <ListItem>{storageZone}</ListItem>
                )
              }
            </List>
          </div>
        </div>
      </Card>}
    </div>
  )
}

export default StorageToolsZoneBatch