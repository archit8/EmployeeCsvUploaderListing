import React from "react";

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const csv = e.target.csvFile.files[0];
    console.log(csv); // This actually logs the file object

    const formData = new FormData();
    formData.append('uploadCsv', csv);

    const options = {
      method: 'POST',
      body: formData,
    };
    console.log("options", options);
    fetch('http://localhost:8000/handleFile', options)
      .then((res) => res.text())
      .then((data) => {
        this.props.onFormSubmit();
        console.log("api result data", data)
      }); // output: {}
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="file" name="csvdata" id="csvFile" />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}