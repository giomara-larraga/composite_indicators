import React from "react";
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
    TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RowsFromBackend } from "../utils/types";


interface BlankCardsProps {
    rows: RowsFromBackend;
    setRows: React.Dispatch<React.SetStateAction<RowsFromBackend>>;
}

function BlankCards({ rows, setRows }: BlankCardsProps) {
    const navigate = useNavigate();

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
                    alignItems:"center",
                }}
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
                            <div>
                                <Typography variant="h6">Insert blank cards</Typography>
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
                                    <div style={{display:"flex", flexDirection: "row", minWidth:"20rem"}}>
                                    <Card
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            marginRight: "1rem",
                                            border: "solid thin",
                                            borderColor: "#B9B9B9",
                                            minWidth: "14rem",
                                        }}
                                        variant="outlined"
                                        key={columnId}
                                    >
                                        <CardHeader component={Typography} title={column.name} />
                                        <CardContent>
                                            {column.items.map((item, index) => {
                                                return (
                                                    <Card
                                                        style={{
                                                            userSelect: "none",
                                                            padding: 4,
                                                            margin: "1rem",
                                                            height: "12rem",
                                                            minHeight: "12rem",
                                                            width: "10rem",
                                                            minWidth: "10rem",
                                                            backgroundColor: "white",
                                                            color: "white",

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
                                            })}

                                        </CardContent>
                                    </Card>
                                    <TextField id="filled-basic" label="Blank cards" variant="filled" defaultValue={0}/>

                                    </div>
                                );
                            }
                        })}
                    </div>
               
                <div
                    style={{
                        padding: "1rem",
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
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

export default BlankCards;