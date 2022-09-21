import styled from "styled-components";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}:not(:first-child)`]: {
    textAlign: "right",
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}:not(:first-child)`]: {
    textAlign: "right",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "lightgrey",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const StyledTableNoResults = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  color: red;
`;
