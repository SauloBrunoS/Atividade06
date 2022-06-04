import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import FirebaseProfessorService from "../../../services/FirebaseProfessorService";
import FirebaseContext from "../../../utils/FirebaseContext";
//import axios from "axios";

const EditProfessorPage = () =>
    <FirebaseContext.Consumer>
        {(firebase) => <EditProfessor firebase={firebase} />}
    </FirebaseContext.Consumer>

function EditProfessor(props) {

    const [name, setName] = useState("")
    const [university, setUniversity] = useState("")
    const [degree, setDegree] = useState("Graduado")
    const params = useParams()
    const navigate = useNavigate()

    useEffect(
        () => {
            /*
            axios.get(`http://localhost:3002/crud/professors/retrieve/` + params.id)
            .then(
                (response) => {
                setName(response.data.name)
                setUniversity(response.data.university)
                setDegree(response.data.degree)
                }
            )
            .catch((error) => console.log(error))
            */
            FirebaseProfessorService.retrieve_promise(
                props.firebase.getFirestoreDb(),
                (professor) => {
                    setName(professor.name)
                    setUniversity(professor.university)
                    setDegree(professor.degree)
                },
                params.id
            )
        }, [params.id, props]
    )

    const handleSubmit = (event) => {
        event.preventDefault()
        const updatedProfessor = { name, university, degree }
        /*
        axios.put(`http://localhost:3002/crud/professors/update/`+ params.id, updatedProfessor)
        .then (
           (response) => navigate("/listProfessor")
        )
        .catch((error) => console.log(error))
        */
        FirebaseProfessorService.update(
            props.firebase.getFirestoreDb(),
            () => {
                navigate("/listProfessor")
            },
            params.id,
            updatedProfessor)
    }

    return (
        <>
            <main>
                <h2>
                    Editar Professor
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text"
                            className="form-control"
                            value={(name == null || name === undefined) ? "" : name}
                            name="name"
                            onChange={(event) => { setName(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Universidade: </label>
                        <input type="text"
                            className="form-control"
                            value={university ?? ""}
                            name="university"
                            onChange={(event) => { setUniversity(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Titulação: </label>
                        <input type="text"
                            className="form-control"
                            value={degree ?? 0}
                            name="degree"
                            onChange={(event) => { setDegree(event.target.value) }} />
                    </div>
                    <div className="form-group" style={{ paddingTop: 20 }}>
                        <input type="submit" value="Atualizar Professor" className="btn btn-primary" />
                    </div>
                </form>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default EditProfessorPage