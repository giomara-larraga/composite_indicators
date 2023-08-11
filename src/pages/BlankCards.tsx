import React from "react";
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface BlankCardsProps {
    rows: RowsFromBackend;
    setRows: React.Dispatch<React.SetStateAction<RowsFromBackend>>;
}

function BlankCards({ rows, setRows }: BlankCardsProps) {
    const navigate = useNavigate();

    function onReset(): void {

    }
    function onBack(): void {
        if (rows.List.items.length == 0) {
            setRows(rows);
            navigate("/");
        }
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
                <Container
                    sx={{
                        padding: "1rem",
                        marginBottom: "1rem"
                    }}
                >
                    <Typography variant="h6"> Instructions: Add blank cards between each two consecutive rank classes, to indicate the importance differences among them. Note the number of blank cards does not need to be an integer. </Typography>
                </Container>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><Typography sx={{fontWeight:"bold"}}>RANK</Typography></TableCell>
                                <TableCell align="center"><Typography sx={{fontWeight:"bold"}}>INDICATORS</Typography></TableCell>
                           
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(rows).map(([columnId, column], index) => {
                                if (columnId == "List" || column.items.length == 0) {
                                    return;
                                } else {
                                    return (
                                        <>
                                        <TableRow key={columnId} sx={{backgroundColor:"rgba(16, 55, 120, 0.1)"}}>
                                            <TableCell component="th" scope="row">
                                                   <Typography>{column.name}</Typography>
                                             </TableCell>
                                             <TableCell component="th" scope="row" sx={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Card className="card-indicator">
                                                                <CardContent>
                                                                    <Typography>
                                                                        {item.content}
                                                                    </Typography>
                                                                </CardContent>
                                                            </Card>
                                                        );
                                                    })}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{backgroundColor:"rgba(5, 147, 162, 0.2)"}}>
                                            <TableCell align="right" colSpan={2}>
                                                <div  style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                                                <Typography sx={{marginRight:"1rem", fontWeight:"bold"}}>Blank cards:</Typography>
                                                <TextField variant="outlined" defaultValue={0}  type="number" sx={{backgroundColor:"white"}}></TextField>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        </>
                                    );
                                }
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div className="buttons-bar">
                    <Button
                        variant="contained"
                        onClick={onBack}
                        sx={{ marginRight: "1rem" }}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ marginRight: "1rem" }}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onContinue}
                    >
                        Continue
                    </Button>
                </div>
            </Container>
        </div>
    );
}

export default BlankCards;