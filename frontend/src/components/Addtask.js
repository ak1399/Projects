import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ setStep }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!taskTitle.trim() || !taskDescription.trim()) {
      setError('Please fill out both title and description.');
      return;
    }

    try {
      const response = await axios.post("https://daily-task-manager-qsfq.onrender.com/task", {
        title: taskTitle,
        description: taskDescription,
      });

      if (response.status === 201) {
        setSuccessMessage('Task added successfully!');
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
      <div className="container-fluid vh-100 d-flex justify-content-center  bg-light">
        <div className="col-6">
          <h2 className="text-center mb-4 p-5">Add New Task</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <form className='bg-body p-3 rounded-3'>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Task Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter task title"
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
                placeholder="Enter task description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-primary" onClick={handleAddTask}>
              Add Task
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

export default AddTask;
