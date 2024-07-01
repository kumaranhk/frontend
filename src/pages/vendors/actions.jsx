import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Tooltip } from "@mui/material";
import { deleteVendor, editVendor as e } from "../../apis/menu/vendors";
import { useNavigate } from "react-router-dom";
import { getAccesstoken } from "../../utlis/utils";

const Actions = ({ id }) => {
  const navigate = useNavigate();
  const access_token = getAccesstoken();
  const removeVendor = async (id) => {
    const data = await deleteVendor({ id, access_token });
    console.log(data);
    !data.error && location.reload();
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
      <Tooltip title="Edit">
        <Button
          variant="filled"
          onClick={() => {
            navigate(`/vendors/vendor?type=edit&id=${id}`);
          }}
        >
          <EditIcon />
        </Button>
      </Tooltip>
      <Tooltip title="Delete">
        <Button
          variant="filled"
          onClick={() => {
            removeVendor(id);
          }}
        >
          <DeleteIcon />
        </Button>
      </Tooltip>
    </Box>
  );
};

export default Actions;
