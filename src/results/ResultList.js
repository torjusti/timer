import React from 'react';
import styled from 'styled-components';
import Zoom from '@material-ui/core/Zoom';
import Portal from '@material-ui/core/Portal';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import { formatResult } from 'timer/utils';

const ResultListPaper =  styled(Paper)`
  margin: 2rem;
`;

const DeleteButton = styled(Button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
`;

class ResultList extends React.Component {
  state = {
    checked: [],
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
                  <IconButton>
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
      </div>
    );
  }
}

export default ResultList;



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
