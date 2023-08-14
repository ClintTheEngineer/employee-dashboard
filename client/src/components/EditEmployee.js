import React, { useState} from 'react'

const EditEmployee = ({ employee }) => {
    
    const [firstName, setFirstName] = useState(`${employee.first_name}`);
    const [lastName, setLastName] = useState(`${employee.last_name}`);
    const [jobTitle, setJobTitle] = useState(`${employee.job_title}`);
    const [dateOfHire, setDateOfHire] = useState(`${employee.date_of_hire}`);
    const [salary, setSalary] = useState(`${employee.salary}`);
    const [email, setEmail] = useState(`${employee.e_mail}`);
    const [id] = useState(`${employee.id}`);

    const updateEmployee = async e => {
        e.preventDefault();
        try {
            const body = { id, firstName, lastName, jobTitle, dateOfHire, salary, email };
            await fetch(`https://wild-jade-cricket-garb.cyclic.app/employees/${employee.id}`,
             {
                method: 'PUT', 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
        );

            window.location = "/"
        } catch (err) {
            console.log(err.message)
        }
    }

  return (
<>   
<button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${employee.id}`}
      >
        Edit
      </button>
      <div
        className="modal"
        id={`id${employee.id}`}
        
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Employee</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setFirstName(employee.firstName)}
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
              />

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={(e) => updateEmployee(e)}
              >
                Update Employee
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={(e) => updateEmployee(e)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditEmployee;