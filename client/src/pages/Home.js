import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../App.css'

function Home() {

    return (
        <div>
            <h1>Welcome to The Record Maintenence Web Page!</h1>
            <h1>Introduction of the company's business could be found by clicking <a href="https://www.google.com">here</a></h1>
        </div>
    )
}

export default Home
