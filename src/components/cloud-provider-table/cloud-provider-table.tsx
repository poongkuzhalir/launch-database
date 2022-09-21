import {
  StyledTableCell,
  StyledTableRow,
  StyledTableNoResults,
} from "./cloud-provider-table.style";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { ICloudList } from "../../interfaces/ICloudLists";

interface ICloudProviderTable {
  listsToShow: ICloudList[];
  radius: number;
}

const CloudProviderTable = (props: ICloudProviderTable) => {
  const { listsToShow, radius } = props;

  const tableTitle = [
    "Cloud name",
    "Latitude",
    "Longitude",
    "Region",
    "Description",
  ];

  return (
    <>
      <TableContainer>
        <Table
          sx={{ minWidth: 200 }}
          aria-label="Provider-table"
          data-testid="cloud-provider-table"
        >
          <TableHead>
            <StyledTableRow>
              {tableTitle?.map((title: string) => (
                <StyledTableCell key={title}>{title}</StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {listsToShow?.map((list: ICloudList) => (
              <StyledTableRow
                key={list.cloud_name}
                data-testid="cloud-provider-row"
              >
                <StyledTableCell component="th" scope="row">
                  {list.cloud_name}
                </StyledTableCell>
                <StyledTableCell>{list.geo_latitude}</StyledTableCell>
                <StyledTableCell>{list.geo_longitude}</StyledTableCell>
                <StyledTableCell>{list.geo_region}</StyledTableCell>
                <StyledTableCell>{list.cloud_description}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {Boolean(!listsToShow.length) && (
        <StyledTableNoResults>
          No cloud provider found in {radius} radius!
        </StyledTableNoResults>
      )}
    </>
  );
};

export default CloudProviderTable;
