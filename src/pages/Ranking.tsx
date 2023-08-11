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
import { onDragEnd } from "../utils/events";


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
        className="main-container"
      >
        <Container style={{
          padding: "1rem",
        }}>
          <Typography variant="h6"> Instructions: Order the cards corresponding to each indicator according to the importance ranking assigned to them. More that one indicator can be ranked in the same position. </Typography>
        </Container>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, rows, setRows)}
        >
          <div
            className="box-indicator-list"
            key={"List"}
          >
            <Card
              className="card-indicator-list"
              variant="outlined"
            >
              <CardHeader title="List of indicators" component={Typography} titleTypographyProps={{ variant: 'body1', fontWeight: "bold", textTransform: "uppercase", color: "#103778" }} />
              <CardContent>
                {rows["List"].items.length > 0 ? (
                  <Droppable
                    droppableId={"List"}
                    key={"List"}
                    direction="horizontal"
                  >
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          className="droppable-area-indicator-list"
                          ref={provided.innerRef}
                          style={{
                            minHeight:
                              rows["List"].items.length > 0 ? "12rem" : "2rem",
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
                                      className="card-indicator"
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        ...provided.draggableProps.style,
                                        border: snapshot.isDragging
                                          ? "solid 0.2rem"
                                          : "none",
                                        borderColor: snapshot.isDragging
                                          ? "#0593A2"
                                          : "white",
                                      }}
                                    >
                                      <CardContent>
                                        <Typography
                                          className="card-text-indicator"
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
                  </Droppable>) : (<Typography>All the indicators have been ranked.</Typography>)}
              </CardContent>
            </Card>
          </div>
          <div
            className="box-rank-list"
          >
            {Object.entries(rows).map(([columnId, column], index) => {
              if (columnId == "List") {
                return;
              } else {
                return (
                  <Card
                    className="card-rank-list"
                    variant="outlined"
                    key={columnId}
                  >
                    <CardHeader component={Typography} title={column.name} sx={{ backgroundColor: "#F2F7FA" }} titleTypographyProps={{ variant: 'body1', fontWeight: "bold", textTransform: "uppercase", color: "#103778" }}
                    />
                    <CardContent sx={{ backgroundColor: "#F2F7FA" }}>
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
                              className="droppable-area-rank"
                              style={{
                                border: snapshot.isDraggingOver
                                  ? "dashed 1px"
                                  : "none",
                                borderColor: snapshot.isDraggingOver
                                  ? "#0593A2"
                                  : "white",
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
                                          className="card-indicator"
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            ...provided.draggableProps.style,
                                            border: snapshot.isDragging
                                              ? "solid 0.2rem"
                                              : "none",
                                            borderColor: snapshot.isDragging
                                              ? "#0593A2"
                                              : "white",

                                          }}
                                        >
                                          <CardContent>
                                            <Typography
                                              className="card-text-indicator"
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
          className="buttons-bar"
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
