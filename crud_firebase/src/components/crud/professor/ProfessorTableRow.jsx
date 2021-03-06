import React from "react";
import { Link } from "react-router-dom";
import FirebaseProfessorService from "../../../services/FirebaseProfessorService";
//import axios from "axios"

const ProfessorTableRow = (props) => {
    const {_id,name,university,degree} = props.professor

    function deleteProfessor(){
        if (window.confirm(`Deseja excluir o elemento de ID: ${_id}?`)) {
            //axios.delete(`http://localhost:3001/students/${_id}`)
            /*axios.delete(`http://localhost:3002/crud/professors/delete/${_id}`)
                .then(response => props.deleteProfessorById(_id))
                .catch(error => console.log(error))*/
             FirebaseProfessorService.delete(
                 props.firestoreDb,
                 () => {},
                 _id
             )   
        }
    }

    return (
        <tr>
            <td>
                {_id}
            </td>
            <td>
                {name}
            </td>
            <td>
                {university}
            </td>
            <td>
                {degree}
            </td>
            <td style={{textAlign:"center"}}>
                <Link to={`/editProfessor/${_id}`} className="btn btn-primary">Editar</Link>
            </td>
            <td style={{textAlign:"center"}}>
                <button className = "btn btn-danger" onClick = {() => deleteProfessor() }>Apagar</button>
            </td>
        </tr>
    )
}

export default ProfessorTableRow