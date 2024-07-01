import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAccesstoken } from "../../utlis/utils";
import { deleteProduct } from "../../apis/menu/products";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const Actions = ({ id }) => {
  const navigate = useNavigate();
  const access_token = getAccesstoken();
  const removeProduct = async (id) => {
    const data = await deleteProduct({ id, access_token });
    // console.log(data);
    !data.error && location.reload();
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
      <Tooltip title="Make Order">
        <IconButton
          variant="filled"
          onClick={() => {
            navigate(`/products/product?type=purchase&id=${id}`);
          }}
        >
          <LocalMallIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          variant="filled"
          onClick={() => {
            removeProduct(id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Actions;
