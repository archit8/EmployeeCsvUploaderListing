import React from "react";
import { render } from "react-dom";
import { Tips } from "../src/Utils";
import  NameForm  from '../src/nameForm';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      filtered: []
    };
  }
  componentDidMount() {
  let text =   fetch('http://localhost:8000/listUsers').then(function(data) {
      return data.json();
    }).then((text)=> {
      console.log('Request successful', text);
      this.setState({data: text })
    });
}
onFormSubmit = () => {
  let text =   fetch('http://localhost:8000/listUsers').then(function(data) {
    return data.json();
  }).then((text)=> {
    console.log('Request successful', text);
    this.setState({data: text })
  });
}
onFilteredChangeCustom = (value, accessor) => {
  let filtered = this.state.filtered;
  let insertNewFilter = 1;

  if (filtered.length) {
    filtered.forEach((filter, i) => {
      if (filter["id"] === accessor) {
        if (value === "" || !value.length) filtered.splice(i, 1);
        else filter["value"] = value;

        insertNewFilter = 0;
      }
    });
  }

  if (insertNewFilter) {
    filtered.push({ id: accessor, value: value });
  }

  this.setState({ filtered: filtered });
};
  render() {
    const { data } = this.state;
    console.log("resdata", data);
    return (
      <div>
        <ReactTable
          filterable
          filtered={this.state.filtered}
          onFilteredChange={(filtered, column, value) => {
            this.onFilteredChangeCustom(value, column.id || column.accessor);
          }}
          data={data}
          columns={[
            {
              Header: "First Name",
              accessor: "firstName",
              className: "sticky",
              headerClassName: "sticky"
            },
            {
              Header: "Last Name",
              accessor: "lastName",
              className: "sticky",
              headerClassName: "sticky"
            },
            {
              Header: "Age",
              accessor: "age",
              className: "sticky",
              headerClassName: "sticky"
            },
            {
              Header: "DOB",
              accessor: "dob",
              className: "sticky",
              headerClassName: "sticky"
            },
            {
              Header: "Reporting Manager",
              accessor: "reportingManager",
              className: "sticky",
              headerClassName: "sticky"
            },
            {
              Header: "Annual Salary",
              accessor: "annualSalary",
              className: "sticky",
              headerClassName: "sticky"
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        <Tips />
          <NameForm onFormSubmit={this.onFormSubmit}/>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
