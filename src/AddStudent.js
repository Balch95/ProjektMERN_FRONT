import React, { useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Button, Form, Alert } from "react-bootstrap";

const AddStudent = (props) => {

    const [studentName, setStudentName] = useState();
    const [studentEvent, setStudentEvent] = useState();
    const [studentCity, setStudentCity] = useState();
    const [studentError, setStudentError] = useState();


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


    const setStudentData = (e) => {

        const { id, value } = e.target

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

    const addNewStudent = (e) => {

        let studentDataObj = {
            name: studentName,
            event: studentEvent,
            city: studentCity,
        }

        axios.post(
            'http://localhost:5050/api/students/addstudent',
            studentDataObj,
        ).then((res) => {
            props.getStudents()
            console.log(res);
        }).catch((res, err) => {
            console.log(res, err);
        })

        e.preventDefault()

    }

    return (
        <div className="add-student-form">
            <Container>
                <Alert>
                    <h2>Dodaj studenta</h2>
                    <Form onSubmit={(e) => { addNewStudent(e) }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Imię i nazwisko</Form.Label>
                            <Form.Control type="text" id="name" onChange={(e) => setStudentData(e)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Wydarzenie</Form.Label>
                            <Form.Select id="event" onChange={(e) => setStudentData(e)} >
                                <option>Wybierz kurs</option>
                                {eventListElement}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Miasto</Form.Label>
                            <Form.Select id="city" onChange={(e) => setStudentData(e)} >
                                <option>Wybierz miasto:</option>
                                {citiesListElement}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="Potwierdź formularz" required />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mx-auto">
                            Wyślij
                        </Button>
                    </Form>
                </Alert>
            </Container>
        </div>
    )

}

export default AddStudent;