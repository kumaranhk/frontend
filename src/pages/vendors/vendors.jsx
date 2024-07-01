import { useEffect, useState } from "react";
import { deleteVendor, getVendors } from "../../apis/menu/vendors";
import { Box, Button, Container, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Actions from "./actions";
import { Link } from "react-router-dom";
import { getAccesstoken } from "../../utlis/utils";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [columns] = useState([
    { id: "vendorName", label: "Vendor Name", minWidth: 170 },
    {
      id: "contactEmail",
      label: "Email",
      minWidth: 170,
      align: "center",
    },
    {
      id: "contactName",
      label: "Contact Name",
      minWidth: 170,
      align: "center",
    },
    {
      id: "contactPhone",
      label: "Phone",
      minWidth: 170,
      align: "center",
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 170,
      align: "center",
    },
  ]);
  const access_token = getAccesstoken();
  useEffect(() => {
    const fetchVendors = async () => {
      const data = await getVendors({ access_token });
      setVendors(data.vendors);
    };
    fetchVendors();
  }, []);

  return (
    <Container
      sx={{
        border: "solid",
        borderColor: "black",
        borderWidth: "2",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "left", m: 2, ml: 0 }}>
          Vendors
        </Typography>
        <Button variant="contained">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={"/vendors/vendor?type=create"}
          >
            Add Vendor
          </Link>
        </Button>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "80vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "actions" ? (
                            <Actions id={row.id} />
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={vendors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default Vendors;
