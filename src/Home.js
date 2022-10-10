import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";

import './Home.css';

import StudentList from "./StudentList";
import AddStudent from "./AddStudent";

const Home = () => {
  const [studentList, setStudentList] = useState([])
  const [eventsList, setEventsList] = useState([])
  const [citiesList, setCitiesList] = useState([])

  const getStudents = () => {
    axios.get(
      'http://localhost:5050/api/students/all'
    )
      .then((res) => {
        setStudentList(res.data)
      })
      .catch((err) => {
        console.log('Axios error', err)
      });
  }

  const getEvents = () => {
    axios.get(
      'http://localhost:5050/api/events/all'
    )
      .then((res) => {
        setEventsList(res.data)
      })
      .catch((err) => {
        console.log('Axios error', err)
      });
  }

  const getCities = () => {
    axios.get(
      'http://localhost:5050/api/cities/all'
    )
      .then((res) => {
        setCitiesList(res.data)
      })
      .catch((err) => {
        console.log('Axios error', err)
      })
  }

  useEffect(() => {
    getStudents();
    getEvents();
    getCities()
  }, []);



  return (
    <div className="home-app">
      <h1>Lista studenów</h1>
      <StudentList studentList={studentList} getStudents={getStudents} eventsList={eventsList} citiesList={citiesList} />
      <AddStudent studentList={studentList} getStudents={getStudents} eventsList={eventsList} citiesList={citiesList} />
    </div>
  )
}

export default Home;