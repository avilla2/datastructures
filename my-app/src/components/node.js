import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    round: {
      borderRadius: '50%',
      padding: '20px',
    },
  }));


const Node = (props) => {
    const classes = useStyles();
    const [status, setStatus] = useState(props.value);

    const toggle = () => {
        if (status === props.value) { 
            setStatus("X")
        } else { 
            setStatus(props.value)
        }
    }

    return (
        <Button variant="contained" onClick={() => toggle()} className={classes.round} color="primary">
            {status}
        </Button>
    );
}
export default Node;