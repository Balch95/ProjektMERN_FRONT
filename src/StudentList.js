import React, { useState } from "react";
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row, Container, Button, Table, Form, Alert } from "react-bootstrap";

import './StudentList.css'



const StudentList = (props) => {

  const [updateStatus, setUpdateStatus] = useState(false)
  const [studentID, setStudentID] = useState();
  const [studentName, setStudentName] = useState();
  const [studentEvent, setStudentEvent] = useState();
  const [studentCity, setStudentCity] = useState();
  const [studentError, setStudentError] = useState();




  let studentListElement = props.studentList.map((listObj, index) => {
    return (
      <tr key={listObj._id}>
        <td>{index + 1}</td>
        <td>{listObj.name}</td>
        <td>{listObj.event}</td>
        <td>{listObj.city}</td>
        <td><Button variant="outline-primary" onClick={() => { setUpdateStatus(true); setStudentData(listObj) }}>Edytuj</Button></td>
        <td><Button variant="outline-danger" onClick={() => removeStudent(listObj._id)}>Usuń</Button></td>
      </tr>
    );
  });

  let eventListElement = props.eventsList.map((listObj) => {
    return (
      <option key={listObj._id} value={listObj.nameEvent}>{listObj.nameEvent}</option>
    )
  })

  let citiesListElement = props.citiesList.map((listObj) => {
    return (
      <option key={listObj._id} value={listObj.cityName}>{listObj.cityName}</option>
    )
  })




  const removeStudent = (id) => {
    console.log(id)

    axios.delete(
      `http://localhost:5050/api/students/remove/${id}`
    )
      .then(() => {
        props.getStudents()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const sendUpdateStudentData = () => {

    let updateObj = {
      name: studentName,
      event: studentEvent,
      city: studentCity,
    }



    axios.put(
      `http://localhost:5050/api/students/updatestudent/${studentID}`,
      updateObj
    ).then((res) => {
      props.getStudents()
      console.log(res)
    })
      .catch((err) => {
        console.log(err)
      })

  }

  const setStudentData = (data) => {
    setStudentID(data._id);
    setStudentName(data.name);
    setStudentEvent(data.event);
    setStudentCity(data.city)
  }

  const updateStudentData = (data) => {
    const { id, value } = data.target

    if (id === "name") {
      setStudentName(value)
      setStudentError()
    } else {
      setStudentError("Proszę podać imię i nazwisko studenta")
    }
    if (id === "event") {
      setStudentEvent(value)
      setStudentError()
    } else {
      setStudentError("Proszę wybrać kurs")
    }
    if (id === "city") {
      setStudentCity(value)
      setStudentError()
    } else {
      setStudentError("Proszę wybrać miasto")
    }
  }




  const updateStudentPanel = (id) => {
    return (
      <div className="update-student-form">
        <Container>
          <Alert variant="danger">
            <h2>Edytuj studenta</h2>
            <Form onSubmit={() => { setUpdateStatus(false); sendUpdateStudentData(id) }}>
              <Form.Group className="mb-3">
                <Form.Label>Imię i nazwisko</Form.Label>
                <Form.Control type="text" id="name" value={studentName} onChange={(e) => updateStudentData(e)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Wydarzenie</Form.Label>
                <Form.Select id="event" onChange={(e) => updateStudentData(e)} value={studentEvent}>
                  <option>Wybierz kurs</option>
                  {eventListElement}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Miasto</Form.Label>
                <Form.Select id="city" onChange={(e) => updateStudentData(e)} value={studentCity}>
                  <option>Wybierz miasto</option>
                  {citiesListElement}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Zaakceptuj zmiany" required />
              </Form.Group>

              <Button variant="primary" type="submit" className="mx-auto">
                Wyślij
              </Button>
              <Button variant="primary" onClick={() => setUpdateStatus(false)}>
                Zamknij
              </Button>
            </Form>
          </Alert>
        </Container>
      </div>
    )
  }




  return (
    <div className='student-l'>
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>L.p.</th>
                  <th>Imię i nazwisko</th>
                  <th>Wydarzenie</th>
                  <th>Miasto</th>
                </tr>
              </thead>
              <tbody>
                {studentListElement}
              </tbody>
            </Table>
            {updateStatus && <div className="update-student-panel">{updateStudentPanel()}</div>}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default StudentList;

