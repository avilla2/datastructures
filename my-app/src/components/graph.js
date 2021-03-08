import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Node from './node'

const useStyles = makeStyles(() => ({
    root: {
        margin: "0 auto",
        width: "fit-content",
    },
  }));

const Tree = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {props.nodes.map((node) => (
                <Node key={node.key} value={node.value} offset={node.offset} color={node.color === "red" ? "secondary" : "default" }/>
            ))}
        </div>
    );
}

export default Tree;