import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  &:not(:first-child) {
    margin-left: 0.3em;
  }
`;

const Buttons = styled.div`
  margin: 1em;
`;

const Sets = styled.div`
  margin-left: 1em;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 1em 1em 1em;
`;

const Cell = styled.div`
  flex: 0 0 33.3333%;
  padding: 1em 0 0 1em;
  &:nth-child(3n + 1) {
    padding-left: 0;
  }
`;

const Box = styled.div`
  background: #FdFdFd;
  border: 1px solid #EEE;
  border-radius: 2px 2px 0 0;
  border-bottom: 5px solid #EEE;
  box-shadow: 0 0 5 rgba(0, 0, 0, 0.5);
  padding: 1em;
`;

const AlgorithmBox = ({ algorithm }) => (
  <Cell>
    <Box>
      This an algo: {algorithm}
    </Box>
  </Cell>
);

class AlgorithmsPanel extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  createSet() {
    if (this.state.value) {
      this.props.createSet(this.state.value);

      this.setState({
        value: '',
      })
    }
  }

  addAlgorithm() {
    if (this.state.value && this.props.selectedSet) {
      this.props.addAlgorithm(this.state.value, this.props.selectedSet);

      this.setState({
        value: '',
      })
    }
  }

  render() {
     const {
       sets,
       selectedSet,
       selectSet,
     } = this.props;

     return (
       <div>
         <Buttons>
           <input
             type="text"
             onChange={(e) => this.handleChange(e)}
             placeholder="set name / algorithm"
             value={this.state.value}
           />

           <Button onClick={() => this.createSet()}>Create set</Button>
           <Button onClick={() => this.addAlgorithm()}>Add algorithm</Button>
         </Buttons>

         <Sets>
           {Object.keys(sets).map((key) =>
             <Button
               key={key}
               onClick={() => selectSet(key)}
             >{sets[key].name}</Button>
           )}
         </Sets>

         <Grid>
           {selectedSet && sets[selectedSet].algorithms.map((data) =>
             <AlgorithmBox
               algorithm={data.algorithm}
               key={data.id}
             />
           )}
         </Grid>
       </div>
     );
  }
}

export default AlgorithmsPanel;
