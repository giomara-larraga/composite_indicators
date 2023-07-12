import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import HelpIcon from '@mui/icons-material/Help';
import { Card, CardHeader, CardContent, CardActions, Button } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import {data} from "../../utils/data";


function IndicatorsContainer() {
  const [tasks, setTasks] = useState(data);

  const getListStyle = (isDraggingOver:boolean, itemsLength:number) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    display: "flex",
    padding: 8,
    width: "100%"
    
  });

  const getItemStyle = (isDragging:boolean, draggableStyle:any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 8 * 2,
    margin: `0 ${8}px 0 0`,
    maxWidth:"150px",
    // change background colour if dragging
    background: isDragging ? "lightblue" : "white",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });

  const onDragEnd = (result:any) => {
    // dropped outside the list
  if (!result.destination) return;
 
  const items = Array.from(tasks);
  const [reorderedItem] = items.splice(result.source.index, 1);
     items.splice(result.destination.index, 0, reorderedItem);
 
     setTasks(items);
   };
  return (
    <Container >
    <div style={{overflow: "hidden", width:"100%", height: "auto"}}>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver, tasks.length)}
            {...provided.droppableProps}
          >
            {tasks.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <CardContent>
                      <Typography sx={{ fontSize: 14, fontWeight:"bold" }} color="text.primary" gutterBottom>
                        {item.title}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing sx={{ mt: "auto" }}>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    </div>
 </Container>
  );
}
export default IndicatorsContainer;

