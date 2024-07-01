import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";
import { getProducts } from "../../apis/menu/products";
import { getAccesstoken } from "../../utlis/utils";
import Actions from "../products/actions";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const access_token = getAccesstoken();
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts({ access_token });
      !res.error && setProducts(res.products);
    };
    fetchProducts();
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Container
      sx={{
        border: "solid",
        borderColor: "black",
        borderWidth: "2",
        height: "100vh",
        maxWidth: "none",
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
          Products
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/products/create-product")}
        >
          Add product
        </Button>
      </Box>
      <Paper sx={{ width: "100%", overflow: "auto" }}>
        <TableContainer sx={{ maxHeight: "80vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "15%" }}>Title</TableCell>
                <TableCell sx={{ width: "15%" }}>Description</TableCell>
                <TableCell sx={{ width: "15%" }}>Purchase Price</TableCell>
                <TableCell sx={{ width: "15%" }}>Quantity on Hand</TableCell>
                <TableCell sx={{ width: "15%" }}>Selling Price</TableCell>
                <TableCell sx={{ width: "15%" }}>Unit of Measure</TableCell>
                <TableCell sx={{ width: "15%" }}>Vendor Name</TableCell>
                <TableCell sx={{ width: "15%" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.purchasePrice}</TableCell>
                      <TableCell>{row.quantityOnHand}</TableCell>
                      <TableCell>{row.sellingPrice}</TableCell>
                      <TableCell>{row.unitOfMeasure}</TableCell>
                      <TableCell>{row.vendorName}</TableCell>
                      <TableCell>
                        <Actions id={row.id} />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={products.length}
          rowsPerPage={10}
          page={0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default Products;
