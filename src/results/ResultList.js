import React from 'react';
import styled from 'styled-components';
import Result from './Result';
import { cubingAverage } from 'statistics/cubingStatistics';
import theme from 'theme';

const Column = styled.div`
  flex-grow: 1;
  min-height: 100%;
  width: 100%;
  background: ${theme.sidebar};
  padding: 1em;
  border-right: 1px solid ${theme.sidebarBorder};

  @media (min-width: 1200px) {
    width: 23%;
  }
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Table = styled.table`
  width: 100%;
  text-align: left;
`;

const TableBody = styled.tbody`
  font-family: monospace;
`;

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

  /**
   * Returns an array containing all the selected results.
   */
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
