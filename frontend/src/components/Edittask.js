import React, { useState } from 'react';
import axios from 'axios';

const Edittask = ({ setStep, data }) => {
  const [taskTitle, setTaskTitle] = useState(data?.title ? data.title : '');
  const [taskDescription, setTaskDescription] = useState(data?.description ? data.description : '');
  const [taskStatus, setTaskStatus] = useState(data?.status ? data.status : '');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUpdateTask = async () => {
    if (!taskTitle.trim() || !taskDescription.trim()) {
      setError('Please fill out both title and description.');
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:3010/task/${data._id}`, {
        title: taskTitle,
        description: taskDescription,
        status: taskStatus,
      });

      if (response.status === 200) {
        setSuccessMessage('Task updated successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          setStep(0);
        }, 3000);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="container-fluid vh-100 d-flex justify-content-center bg-light">
        <div className="col-6">
          <h2 className="text-center mb-4 p-5">Edit Task</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <form className="bg-body p-3 rounded-3">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Task Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Edit task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Task Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                placeholder="Edit task description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Task Status
              </label>
              <select
                className="form-select"
                id="status"
                aria-label="Select task status"
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
              >
                <option value="Incomplete">Incomplete</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="d-flex justify-content-between">

            <button type="button" className="btn btn-primary" onClick={handleUpdateTask}>
                Update Task
              </button>
             
            <button type="button" className="btn btn-secondary" onClick={() => setStep(0)}>
                Go Back
              </button>

             
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edittask;
