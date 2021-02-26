import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { Button, Snackbar, Container, TextField } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

export default function Home() {
  let history = useHistory();
  const [firstOprand, setFirstOprand] = useState("")
  const [open, setOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    type: 'error',
    msg: ""
  });
  useEffect(() => {
    history.replace({
      state: null
    });
  }, [])

  // Change oprand value
  const handleChange = (e) => {
    const { value } = e.target
    setFirstOprand(value)
  }
  
  // Submit oprand value
  const handleAddNumber = () => {
    if (firstOprand) {
      history.push({
        pathname: "/add",
        state: { firstNo: firstOprand }
      })
    } else {
      setOpen(true);
      setAlertInfo({
        type: "error",
        msg: "Please add oprand value."
      })
    }
  }

  // Handle close Notification
  const handleClose = () => {
    setOpen(false);
  };

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div className="expression-main">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertInfo.type}>
          {alertInfo.msg}
        </Alert>
      </Snackbar>
      <Container>
        <h2>Expression <br></br>Evaluator</h2>
        <div className="text-box-detail">
          <TextField type="number" id="filled-basic" value={firstOprand} onChange={handleChange} label="Please enter a number" variant="filled" />
          <Button
            type="button"
            variant="contained"
            onClick={handleAddNumber}
            className="button-secondary comman-btn"
          >
            Add number
        </Button>
        </div>
      </Container>
    </div>
  );
}
