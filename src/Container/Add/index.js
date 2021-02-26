import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom"
import { Button, Container, TextField, InputLabel, MenuItem, FormControl, Select, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

export default function Add() {
  let location = useLocation();
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    type: 'error',
    msg: ""
  });
  const [state, setState] = useState({
    first: "",
    second: "",
    oprater: "+"
  })
  const [result, setResult] = useState("")

  useEffect(() => {
    if (!location.state) {
      history.push({
        pathname: "/",
      })
    } else {
      setState({ ...state, first: location.state.firstNo })
    }
  }, [location.state, history])

  // Change oprater and oprand value
  const handleChange = (event) => {
    const { name, value } = event.target
    setState({
      ...state,
      [name]: value
    })
    setResult("");
  }

  // Submit final Opration and get result value
  const handleOpration = () => {
    const { first, second, oprater } = state
    if (second) {
      const firstNo = parseInt(first)
      const secondNo = parseInt(second)
      switch (oprater) {
        case "+":
          const sum = firstNo + secondNo;
          setResult(sum);
          break;
        case "-":
          const substract = firstNo - secondNo;
          setResult(substract);
          break;
        case "*":
          const multiplication = firstNo * secondNo;
          setResult(multiplication);
          break;
        case "/":
          const division = firstNo / secondNo
          setResult(division);
          break;
        default:
          setResult("");
          break;
      }
    } else {
      setOpen(true);
      setAlertInfo({
        type: "error",
        msg: "Please add second oprand value."
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
    <div className="add-main">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertInfo.type}>
          {alertInfo.msg}
        </Alert>
      </Snackbar>
      <Container>
        <div className="add-text-value">
          <span className="text-value">{state.first}</span>
          <span className="text-value">{state.second}</span>
          <span className="text-value">{state.oprater}</span>
        </div>
        <div className="equal-sign">
          <span>=</span>
        </div>
        <div className="answer-main">
          <span>{result}</span>
        </div>
        <div className="select-text-main">

          <div className="selectbox-text-value text-box-detail">

            <FormControl variant="filled" className="formControl">
              <InputLabel id="demo-simple-select-filled-label">Operator</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                value={state.oprater}
                name="oprater"
                onChange={handleChange}
                id="demo-simple-select-filled"

              >
                <MenuItem value="+">+</MenuItem>
                <MenuItem value="-">-</MenuItem>
                <MenuItem value="*">*</MenuItem>
                <MenuItem value="/">/</MenuItem>
              </Select>
            </FormControl>

            <TextField type="number" value={state.second} onChange={handleChange} name="second" id="filled-basic" label="Operand" variant="filled" />

          </div>
          <Button
            type="button"
            variant="contained"
            onClick={handleOpration}
            className="button-secondary comman-btn"
          >
            Add Operation
        </Button>

        </div>
      </Container>
    </div>
  );
}
