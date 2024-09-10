import { Card, Chip, List, ListItem, ListItemSuffix, Typography } from '@material-tailwind/react'
import React from 'react'

const StorageToolsZoneBatch = () => {
  return (
    <div className="w-full h-full p-2">
      <Card className="bg-yellow-50 h-full w-full p-4">
        {/* Functional Zone Header */}
        <div className="flex justify-center h-auto mb-4">
          <Typography variant="h5" color="black" className="p-2">
            Fonctional Zone
          </Typography>
        </div>

        {/* Storage Section */}
        <div className="mb-4">
          <Typography variant="lead" color="black" className="mb-2">
            Storage
          </Typography>
          <div className="max-h-40 overflow-auto">
            <List className="bg-green-50 p-1">
              {/* List items for storage */}
              {Array.from({ length: 10 }).map((_, index) => (
                <ListItem key={index} className="py-1 px-2">
                  Storage Item {index + 1}
                </ListItem>
              ))}
            </List>
          </div>
        </div>

        {/* Tools Section */}
        <div>
          <Typography variant="lead" color="black" className="mb-2">
            Tools
          </Typography>
          <div className="max-h-40 overflow-auto">
            <List className="bg-green-50 p-1">
              {/* List items for tools */}
              {Array.from({ length: 10 }).map((_, index) => (
                <ListItem key={index} className="py-1 px-2">
                  Tool {index + 1}
                  <ListItemSuffix>
                    <Chip value={index + 1} variant="ghost" size="md" />
                  </ListItemSuffix>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </Card>
    </div>


  )
}

export default StorageToolsZoneBatch