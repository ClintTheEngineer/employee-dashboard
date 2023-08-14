import React, { useState, useEffect } from 'react';
import EditEmployee from './EditEmployee'


function EmployeeList() {
const [searchTerm, setSearchTerm] = useState('');
const [results, setResults] = useState([]);


const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [dateOfHire, setDateOfHire] = useState("");
    const [salary, setSalary] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");



const onSubmitForm = async e => {
    e.preventDefault();
    try {
        const body = { firstName, lastName, jobTitle, dateOfHire, salary, email, id };
        await fetch(`https://wild-jade-cricket-garb.cyclic.app/employees`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(body)
        });

        window.location = "/";
    } catch (err) {
        console.error(err.message)
    }
}






const deleteEmployee = async (id) => {
    try {
        await fetch(`https://wild-jade-cricket-garb.cyclic.app/employees/${id}`, {
            method: "DELETE"
        })
        setResults(results.filter(employees => employees.id !== id))
    } catch (err) {
        console.error(err.message)
    }
  }



useEffect(() => {
const fetchResults = async () => {
const response = await fetch(`https://wild-jade-cricket-garb.cyclic.app/search?term=${searchTerm}`);
const data = await response.json();
setResults(data);
}
fetchResults();
}, [searchTerm]); 

const handleChange = (e) => {
setSearchTerm(e.target.value);
};

return (
<>
<h1 className='text-center mt-5'>Cander Employee List</h1>
<input
     id="search-bar"
     placeholder="Search by last name"
     type="text"
     value={searchTerm}
     onChange={handleChange}
   />
<button type="submit" 
        id='search-btn'
        title='Find employee by last name'
        className='btn btn-dark'>Search</button><br></br>


<button
        type="button"
        title="Add New Employee"
        className="btn btn-success"
        data-toggle="modal"
        data-target={`#id${results.id}`}
      >
        Create New Employee
      </button>
      <div
        className="modal"
        id={`id${results.id}`}
        
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Employee</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                
              >
                &times;
              </button>
            </div>
            <div className="modal-body">First Name
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />Last Name
              <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>Job Title
            <input
                type="text"
                className="form-control"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
              />Hire Date
            <input
                type="text"
                className="form-control"
                value={dateOfHire}
                onChange={e => setDateOfHire(e.target.value)}
              />Salary
              <input
                type="text"
                className="form-control"
                value={salary}
                onChange={e => setSalary(e.target.value)}
              />E-mail
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />id
            <input
                type="text"
                className="form-control"
                value={id}
                onChange={e => setId(e.target.value)}
              />
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={(e) => onSubmitForm(e)}
              >
                Add Employee
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    



        
      






<table className='table mt-5 text center'>
<thead>
    <tr>
        <th>Last Name</th>
        <th>First Name</th>
        <th>Job Title</th>
        <th>Edit</th>
        <th>Delete</th>
    </tr>

</thead>
<tbody>
{results.map(result => (
<tr key={result.id}>
    <td>{result.last_name}</td> 
    <td>{result.first_name}</td>
    <td>{result.job_title}</td>
    <td><EditEmployee employee={result}/></td>
<td><button
type = "button"
className='btn btn-danger'
onClick={() => deleteEmployee(result.id)}
>Delete</button></td>
</tr>
))}
</tbody>
</table>

</>

);
}



export default EmployeeList;