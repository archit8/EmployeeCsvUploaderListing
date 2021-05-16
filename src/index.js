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
      data: []
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
  render() {
    const { data } = this.state;
    console.log("resdata", data);
    return (
      <div>
        <ReactTable
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
