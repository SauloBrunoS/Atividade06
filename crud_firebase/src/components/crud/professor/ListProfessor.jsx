import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FirebaseProfessorService from "../../../services/FirebaseProfessorService";
import FirebaseContext from "../../../utils/FirebaseContext";
//import axios from "axios";

import ProfessorTableRow from "./ProfessorTableRow";

const ListProfessorPage = () =>
    <FirebaseContext.Consumer>
        {(firebase) => <ListProfessor firebase={firebase} />}
    </FirebaseContext.Consumer>


function ListProfessor(props) {

    const [professors, setProfessors] = useState([])

    useEffect(
        () => {
            /*
            axios.get("http://localhost:3002/crud/professors/list")
            .then(
                (response) => {
                    setProfessors(response.data)
                }
            )
            .catch (error => console.log(error))
            */
            FirebaseProfessorService.list_onSnapshot(
                props.firebase.getFirestoreDb(),
                (professors) => {
                    setProfessors(professors)
                }
            )
        }, [props]
    )

    function deleteProfessorById(_id) {
        let professorsTemp = professors
        for (let i = 0; i < professorsTemp.length; i++) {
            if (professorsTemp[i]._id === _id) {
                professorsTemp.splice(i, 1)
            }
        }
        setProfessors([...professorsTemp])
    }

    function generateTable() {
        if (!professors) return
        return professors.map(
            (professor, i) => {
                return <ProfessorTableRow professor={professor} key={i} deleteProfessorById={deleteProfessorById} firestoreDb = {props.firebase.getFirestoreDb()} />
            }
        )
    }

    return (
        <>
            <main>
                <h2>
                    Listar Professores
                </h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Universidade</th>
                            <th>Titulação</th>
                            <th colSpan={2} style={{ textAlign: "center" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateTable()}
                    </tbody>
                </table>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default ListProfessorPage