import React, { Component } from "react";
import { Table, Button, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import { AddEmpModal } from "./AddEmpModal";
import { EditEmpModal } from "./EditEmpModal";

export class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = { emps: [], addModalShow: false, editModalShow: false };
  }

  componentDidMount() {
    this.refrshList();
  }

  componentDidUpdate() {
    this.refrshList();
  }

  refrshList() {
    fetch("https://localhost:44306/api/employee").then(response =>
      response.json().then(data => {
        this.setState({ emps: data });
      })
    );
  }

  deleteEmp(empid) {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44306/api/employee/" + empid, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
    }
  }

  render() {
    const { emps, empid, empname, department, mailid, doj } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });

    return (
      <div className="mt-5 d-flex justify-content-left">
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th> EmployeeID </th>
              <th> EmployeeName </th>
              <th> Department </th>
              <th> MailID </th>
              <th> DOJ </th>
              <th> Option </th>
            </tr>
          </thead>
          <tbody>
            {emps.map(emp => (
              <tr key={emp.EmployeeID}>
                <td>{emp.EmployeeID}</td>
                <td>{emp.EmployeeName}</td>
                <td>{emp.Department}</td>
                <td>{emp.MailID}</td>
                <td>{emp.DOJ}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          empid: emp.EmployeeID,
                          empname: emp.EmployeeName,
                          department: emp.Department,
                          mailid: emp.MailID,
                          doj: emp.DOJ
                        })
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      className="mr-2"
                      onClick={() => this.deleteDep(emp.EmployeeID)}
                      variant="danger"
                    >
                      Delete
                    </Button>

                    <EditEmpModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      empid={empid}
                      empname={empname}
                      department={department}
                      mailid={mailid}
                      doj={doj}
                    />
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Employee
          </Button>
          <AddEmpModal show={this.state.addModalShow} onHide={addModalClose} />
        </ButtonToolbar>
      </div>
    );
  }
}
