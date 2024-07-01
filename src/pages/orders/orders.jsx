import { useEffect, useState } from "react";
import { Box, Container, Typography, Checkbox, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getOrders } from "../../apis/menu/order";
import { format } from "date-fns"; // Importing date-fns
import { CSVLink } from "react-csv"; // Importing react-csv
import { getAccesstoken } from "../../utlis/utils";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [csvData, setCsvData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelect = (event, row) => {
    const selectedIndex = selected.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleGenerateCsv = () => {
    const formattedData = selected.map((row) => {
      return {
        Product: row.productDetails.title,
        Vendor: row.vendorDetails.vendorName,
        Status: row.orderStatus,
        "Ordered time": format(new Date(row.createdAt), "yyyy-MM-dd HH:mm:ss"),
        "Price per Quantity": row.pricePerQuantity,
        Quantity: row.quantity,
        "Total Price": row.totalPrice,
        "Transaction Type": row.transactionType,
      };
    });
    setCsvData(formattedData);
  };

  const [columns] = useState([
    { id: "checkbox", label: "", minWidth: 50, align: "center" },
    { id: "productDetails.title", label: "Product", minWidth: 170 },
    {
      id: "vendorDetails.vendorName",
      label: "Vendor",
      minWidth: 170,
      align: "center",
    },
    {
      id: "orderStatus",
      label: "Status",
      minWidth: 170,
      align: "center",
    },
    {
      id: "createdAt",
      label: "Ordered time",
      minWidth: 170,
      align: "center",
    },
  ]);
  const access_token = getAccesstoken();
  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders({ access_token });
      // console.log(data);
      setOrders(data.orders);
    };
    fetchOrders();
  }, []);

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((value, key) => value?.[key], obj);
  };

  return (
    <Container
      sx={{
        border: "solid",
        borderColor: "black",
        borderWidth: "2",
        height: "100vh",
        width: "100vw",
        m: 0,
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
          Orders
        </Typography>
        <Button
          variant="contained"
          onClick={handleGenerateCsv}
          disabled={selected.length === 0}
        >
          <CSVLink
            data={csvData}
            filename={"orders.csv"}
            style={{ textDecoration: "none", color: "white" }}
          >
            Generate CSV
          </CSVLink>
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
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      let value = getNestedValue(row, column.id);
                      if (column.id === "createdAt") {
                        value = format(new Date(value), "yyyy-MM-dd HH:mm:ss");
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "checkbox" ? (
                            <Checkbox
                              checked={selected.indexOf(row) !== -1}
                              onChange={(event) => handleSelect(event, row)}
                            />
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
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default Orders;
