import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbari({ message }) {
  const [state, setState] = React.useState(true);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={state}
        sx={{ width: "100%" }}
        message={message}
        autoHideDuration={6000}
      >
        <Alert
          onClose={() => setState(false)}
          severity="success"
          sx={{ width: "100%", position: "absolute", top: "5vh" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
