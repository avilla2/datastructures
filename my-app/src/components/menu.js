import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import Tree from './graph'
import RBTree from '../api/redBlack'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: "20px 0 0 40px",
  },
  text: {
    '& > *': {
      margin: theme.spacing(1),
      width: '18ch',
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  btn: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  nodeEntry: {
    display: "flex",
    alignItems: "center",
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
var mytree = new RBTree();

export default function MainMenu() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openFind, setOpenFind] = useState(false);
  const [openArray, setOpenArray] = useState(false);
  const [list, setList] = useState([])
  const [insertValue, setInsertValue] = useState("")
  const [rbTree, setTree] = useState(mytree)

  const handleClick = () => {
    setOpen(!open);
  };
  const handleFind = () => {
    setOpenFind(!openFind);
  };

  const handleArray = () => {
    setOpenArray(!openArray);
  };

  const addNode = () => {
    rbTree.insert(parseInt(insertValue, 10));
    setTree(rbTree);
    let new_list = rbTree.traverse();
    setList(new_list);
    setInsertValue("")
  };

  const handleTextChange = (event) => {
    setInsertValue(event.target.value);
  }

  return (
    <Grid container className={classes.base} spacing={2}>
        <Grid item xs={4}>
            <div className={classes.root}>
                <Paper elevation={3}>
                    <List component="nav" aria-label="main menu" subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Red Black Tree Visualizer
                        </ListSubheader>
                    }>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Insert Node" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem className={classes.nested}>
                                <form className={classes.nodeEntry} noValidate autoComplete="off">
                                        <div className={classes.text}>
                                            <TextField id="insert-node-value" label="Node Value" variant="outlined" size="small"  value={insertValue} onChange={handleTextChange}/>
                                        </div>
                                        <div className={classes.btn}>
                                            <Button onClick={addNode} variant="contained" color="primary">
                                                Insert
                                            </Button>
                                        </div>
                                    </form>
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem button onClick={handleFind}>
                            <ListItemIcon>
                                <SearchIcon />
                            </ListItemIcon>
                            <ListItemText primary="Find Node" />
                                {openFind ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                        <Collapse in={openFind} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem className={classes.nested}>
                                    <form className={classes.nodeEntry} noValidate autoComplete="off">
                                        <div className={classes.text}>
                                            <TextField id="find-node-value" label="Node Value" variant="outlined" size="small" />
                                        </div>
                                        <div className={classes.btn}>
                                            <Button variant="contained" color="primary">
                                                Insert
                                            </Button>
                                        </div>
                                    </form>
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                  <Divider />
                  <List component="nav" aria-label="tools">
                    <ListItem button>
                      <ListItemText primary="Get Minimum" />
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary="Get Maximum" />
                    </ListItem>
                    <ListItem button onClick={handleArray}>
                      <ListItemText primary="To Array" />
                      {openArray ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openArray} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem className={classes.nested}>
                                    <div className={classes.btnGroup}>
                                        <ButtonGroup size="small" color="primary" variant="contained" aria-label="outlined primary button group">
                                            <Button>Preorder</Button>
                                            <Button>Inorder</Button>
                                            <Button>Postorder</Button>
                                        </ButtonGroup>
                                    </div>
                                </ListItem>
                            </List>
                        </Collapse>
                  </List>
                </Paper>
            </div>
        </Grid>
        <Grid item xs={8}>
            <Tree nodes={list} />
        </Grid>
    </Grid>
  );
}