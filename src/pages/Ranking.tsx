import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import NavBar from "../components/Navbar/Navbar";
import {
  Card,
  Container,
  CardContent,
  Typography,
  Button,
  AppBar,
  CardHeader,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RowsFromBackend } from "../utils/types";

const onDragEnd = (result: any, rows: any, setRows: any) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = rows[source.droppableId];
    const destColumn = rows[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setRows({
      ...rows,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = rows[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setRows({
      ...rows,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

interface RankingProps {
  initialRows: RowsFromBackend;
  rows: RowsFromBackend;
  setRows: React.Dispatch<React.SetStateAction<RowsFromBackend>>;
}

function Ranking({ initialRows, rows, setRows }: RankingProps) {
  const navigate = useNavigate();

  function onRestart(): void {
    setRows(initialRows);
  }
  function onContinue(): void {
    if (rows.List.items.length == 0) {
      setRows(rows);
      navigate("blankcards");
    }
  }

  return (
    <div>
      <AppBar />
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, rows, setRows)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              width: "100%",
            }}
            key={"List"}
          >
            <Container
              sx={{
                marginBottom: "2rem",
                display: "flex",
                flexDirection: "column",
                minWidth: "100vw",
                backgroundColor: "#DEE2E6",
                marginRight: 0,
                marginLeft: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/*  <div style={{marginBottom:"1rem", marginTop:"1rem"}}>
                    <Typography variant="h6">List of indicators</Typography>
                    </div> */}
              <div>
                <Droppable
                  droppableId={"List"}
                  key={"List"}
                  direction="horizontal"
                >
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          padding: 4,
                          margin: "1rem",
                          display: "flex",
                          flexDirection: "row",
                          overflowX: "auto",
                          marginBottom: "1rem",
                          justifyContent: "flex-start",
                          minHeight:
                            rows["List"].items.length > 0 ? "12rem" : "2rem",
                          alignContent: "center",
                        }}
                      >
                        {rows["List"].items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <Card
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 4,
                                      margin: "1rem",
                                      height: "12rem",
                                      minHeight: "12rem",
                                      width: "10rem",
                                      minWidth: "10rem",
                                      backgroundColor: snapshot.isDragging
                                        ? "thistle"
                                        : "white",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <CardContent>
                                      <Typography
                                        sx={{
                                          fontSize: 14,
                                          fontWeight: "bold",
                                        }}
                                        color="text.primary"
                                        gutterBottom
                                      >
                                        {item.content}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </Container>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            {Object.entries(rows).map(([columnId, column], index) => {
              if (columnId == "List") {
                return;
              } else {
                return (
                  <Card
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: "1rem",
                      border: "solid thin",
                      borderColor: "#B9B9B9",
                      minWidth: "12rem",
                    }}
                    variant="outlined"
                    key={columnId}
                  >
                    <CardHeader component={Typography} title={column.name} />
                    <CardContent>
                      <Droppable
                        droppableId={columnId}
                        key={columnId}
                        direction="vertical"
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                background: snapshot.isDraggingOver
                                  ? "lightblue"
                                  : "white",
                                display: "flex",
                                flexDirection: "column",
                                overflowX: "auto",
                                //: columnId=="List"?'100vw':"14rem",
                                justifyContent: "space-around",
                                minHeight: "12rem",
                                alignContent: "center",
                              }}
                            >
                              {column.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                  >
                                    {/* list of all the cards in the same rank */}
                                    {(provided, snapshot) => {
                                      return (
                                        <Card
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            userSelect: "none",
                                            padding: 4,
                                            margin: "1rem",
                                            height: "12rem",
                                            minHeight: "12rem",
                                            width: "10rem",
                                            minWidth: "10rem",
                                            backgroundColor: snapshot.isDragging
                                              ? "thistle"
                                              : "white",
                                            color: "white",
                                            ...provided.draggableProps.style,
                                          }}
                                        >
                                          <CardContent>
                                            <Typography
                                              sx={{
                                                fontSize: 14,
                                                fontWeight: "bold",
                                              }}
                                              color="text.primary"
                                              gutterBottom
                                            >
                                              {item.content}
                                            </Typography>
                                          </CardContent>
                                        </Card>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </div>
                          );
                        }}
                      </Droppable>
                    </CardContent>
                  </Card>
                );
              }
            })}
          </div>
        </DragDropContext>
        <div
          style={{
            padding: "1rem",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            onClick={onRestart}
            sx={{ marginRight: "1rem" }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={onContinue}
            disabled={rows["List"].items.length > 0 ? true : false}
          >
            Continue
          </Button>
        </div>
      </Container>
    </div>
  );
}
export default Ranking;
