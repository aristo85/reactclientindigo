import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const style = {
  position: "absolute",
  top: `${visualViewport.height / 2}px`,
  left: `${visualViewport.width / 2}px`,
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10%",
  boxShadow: 24,
  p: 4,
  padding: 0,
};

const Modala = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <AccountCircleIcon
        style={{ height: "40px", width: "40px" }}
        onClick={handleOpen}
      >
        Open modal
      </AccountCircleIcon>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="mymodal">
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default Modala;
