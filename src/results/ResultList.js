import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import Zoom from '@material-ui/core/Zoom';
import Portal from '@material-ui/core/Portal';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Badge from '@material-ui/core/Badge';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { formatResult } from 'timer/utils';
import { Penalties } from './actions';

const ResultListPaper =  styled(Paper)`
  margin: 2rem;
`;

const DeleteButton = styled(Button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
`;

const DialogScramble = styled(DialogContent)`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.8rem;
`;

const PenaltyItem = styled(MenuItem)`
  &.selected {
    background: #F5F5F5;
  }
`;

class ResultList extends React.Component {
  state = {
    currentResult: null,
    open: false,
    checked: [],
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleOpen = result => {
    this.setState({
      currentResult: result,
      open: true,
    });
  };

  handleToggle = id => () => {
    const index = this.state.checked.indexOf(id);
    const updated = [...this.state.checked];

    if (index >= 0) {
      updated.splice(index, 1);
    } else {
      updated.push(id);
    }

    this.setState({
      checked: updated,
    });
  };

  handleDelete = () => {
    this.props.handleDelete(this.state.checked);

    this.setState({
      checked: [],
    });
  };

  render() {
    const currentResult = this.state.currentResult &&
      this.props.results.find(result =>
        result.id === this.state.currentResult,
      );

    return (
      <div>
        <ResultListPaper>
          <List>
            {this.props.results.map(result => (
              <ListItem
                key={result.id}
                dense
                button
                onClick={this.handleToggle(result.id)}
              >
                <Checkbox
                  checked={this.state.checked.includes(result.id)}
                  disableRipple
                />

                <ListItemText primary={formatResult(result)} />

                <ListItemSecondaryAction>
                  <IconButton onClick={() => this.handleOpen(result.id)}>
                    <SettingsIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </ResultListPaper>

        <Portal>
          <Zoom in={this.props.visible}>
            <DeleteButton
              disabled={this.state.checked.length === 0}
              variant="fab"
              color="secondary"
              aria-label="add"
              onClick={this.handleDelete}
            >
              <DeleteIcon />
            </DeleteButton>
          </Zoom>
        </Portal>

        <Dialog
          fullScreen={this.props.fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
        >
          {currentResult && (
            <div>
              <DialogTitle>
                {formatResult(currentResult)}
              </DialogTitle>

              <DialogScramble>
                <a
                  href={`https://alg.cubing.net/?setup=${currentResult.scramble}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {currentResult.scramble}
                </a>
              </DialogScramble>
            </div>
          )}

          <DialogActions>
            <Button onClick={this.handleClose}>
              Close
            </Button>

            <Button
              onClick={event => this.setState({ anchor: event.currentTarget })}
            >
              Penalty
            </Button>
          </DialogActions>
        </Dialog>

        {currentResult && (
          <Menu
            anchorEl={this.state.anchor}
            open={Boolean(this.state.anchor)}
            onClose={() => this.setState({ anchor: null })}
          >
            <PenaltyItem
              onClick={() => this.props.handleClearPenalty(currentResult.id)}
              className={classNames({ selected: currentResult.penalty === Penalties.NONE})}
            >
              None
            </PenaltyItem>

            <PenaltyItem
              onClick={() => this.props.handleSetPlusTwo(currentResult.id)}
              className={classNames({ selected: currentResult.penalty === Penalties.PLUS_TWO})}
            >
              + 2
            </PenaltyItem>
            
            <PenaltyItem
              onClick={() => this.props.handleSetDNF(currentResult.id)}
              className={classNames({ selected: currentResult.penalty === Penalties.DNF})}
            >
              DNF
            </PenaltyItem>
          </Menu>
        )}
      </div>
    );
  }
}

export default withMobileDialog()(ResultList);



/*
import React from 'react';
import styled from 'styled-components';
import Result from './Result';
import { cubingAverage } from 'statistics/cubingStatistics';
import theme from 'theme';


const StyledResultList = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: scroll;
  position: relative;

  table {
    position: absolute;
  }
`;

const Buttons = styled.div`
  margin: 1em;

  button:not(:first-child) {
    margin-left: .3em;
  }
`;

class ResultList extends React.Component {
  constructor() {
    super();

    this.state = {
      selected: {},
    };
  }

  handleSelect(id) {
    this.setState({
      selected: {
        ...this.state.selected,
        [id]: !this.state.selected[id],
      }
    })
  }

  getSelected() {
    return Object.keys(this.state.selected).filter((key) =>
      this.state.selected[key],
    );
  }

  handleDelete() {
    this.setState({
      selected: {},
    });

    this.props.onDelete(this.getSelected());
  }

  handleDNF() {
    this.props.onToggleDNF(this.getSelected());
  }

  handlePlusTwo() {
    this.props.onTogglePlusTwo(this.getSelected());
  }

  render() {
    const results = this.props.results;
    console.log(results)
    return (
      <Column>
        <Container>
          <StyledResultList>
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>Time</th>
                  <th>ao5</th>
                  <th>ao12</th>
                </tr>
              </thead>

              <TableBody>
                {results.map((result, index) =>
                  <Result key={result.id}
                    selected={this.state.selected}
                    handleSelect={(id) => this.handleSelect(id)}
                    currentAo5={index >= 4 && cubingAverage(results.slice(index - 4, index + 1))}
                    currentAo12={index >= 11 && cubingAverage(results.slice(index - 11, index + 1))}
                    {...result}
                  />
                ).reverse()}
              </TableBody>
            </Table>
          </StyledResultList>

          <Buttons>
            <button onClick={() => this.handleDelete()}>Delete</button>
            <button onClick={() => this.handlePlusTwo()}>+2</button>
            <button onClick={() => this.handleDNF()}>DNF</button>
          </Buttons>
        </Container>
      </Column>
    );
  }
}

export default ResultList;

*/
