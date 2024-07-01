import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../apis/menu/users";
import { getAccesstoken } from "../../utlis/utils";

const Actions = ({ id }) => {
  const navigate = useNavigate();
  const access_token = getAccesstoken();
  const removeUser = async (id) => {
    const data = await deleteUser({ id, access_token });
    !data.error && location.reload();
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
      <Tooltip title="Edit">
        <Button
          variant="filled"
          onClick={() => {
            navigate(`/users/user?type=edit&id=${id}`);
          }}
        >
          <EditIcon />
        </Button>
      </Tooltip>
      <Tooltip title="Delete">
        <Button
          variant="filled"
          onClick={() => {
            removeUser(id);
          }}
        >
          <DeleteIcon />
        </Button>
      </Tooltip>
    </Box>
  );
};

export default Actions;
