import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    round: {
      borderRadius: '50%',
      padding: '20px',
      position: 'relative'
    },
  }));


const Node = (props) => {
    const classes = useStyles();
    const [status, setStatus] = useState(props.value);

    const move = { top: `${props.offset}px` };

    const toggle = () => {
        if (status === props.value) { 
            setStatus("X")
        } else { 
            setStatus(props.value)
        }
    }
    
    return (
        <Button variant="contained" onClick={() => toggle()} style={move} className={classes.round} color={props.color}>
            {status}
        </Button>
    );
}
export default Node;