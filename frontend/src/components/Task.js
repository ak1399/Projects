import React, { useEffect, useState } from 'react';
import { MdAdd, MdDelete, MdEdit, MdOutlineDoneAll } from "react-icons/md";
import Addtask from './Addtask';
import Edittask from './Edittask';
import axios from 'axios';

const TaskList = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    getTask();
  }, [step]);

  const getTask = async () => {
    try {
      const response = await axios.get("http://localhost:3010/task");
      if (response.status === 200) {
        setTasks(response.data);
      }
    } catch (error) {
      console.log('Error fetching tasks:', error);
    }
  };

  const addTask = () => {
    setStep(1);
  };

  const updateTask = (task) => {
    setData(task);
    setStep(2);
  };




  const updateTaskStatus = async (id) => {
    setError('');
    try {
      const response = await axios.patch(`http://localhost:3010/task/complete/${id}`);
      if (response.status === 200) {
        setSuccessMessage('Task Completed successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          setError('');
          setStep(0);
          window.location.reload(); // Force page reload
        }, 3000);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteTask = async (id) => {
    setError('');
    try {
      // Display a confirmation dialog
      const confirmed = window.confirm('Are you sure you want to delete this task?');
      
      if (!confirmed) {
        return; // Do nothing if the user cancels the deletion
      }
  
      const response = await axios.delete(`http://localhost:3010/task/${id}`);
      if (response.status === 200) {
        setSuccessMessage(response.data.message ? response.data.message : 'Task Deleted successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          setError('');
          setStep(0);
          window.location.reload(); // Force page reload
        }, 3000);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteAllTasks = async () => {
    setError('');
    try {
      const response = await axios.delete('http://localhost:3010/task/');
      if (response.status === 200) {
        setSuccessMessage('All tasks deleted successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          setError('');
          setStep(0);
          window.location.reload(); // Force page reload
        }, 3000);
      } else {
        // Handle unexpected status codes
        setError(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      // Handle network or server errors
      setError(`Error: ${error.message}`);
    }
  };
  
  

  return (
    <>
      {step === 0 && (
        <div className='p-5'>
          <h2 className='text-center p-3'>Daily Task Manager </h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <table className="table table-bordered table-striped text-center">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map(task => (
                  <tr key={task._id}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.status}</td>
                    <td className='d-flex justify-content-around'>
                      <button
                        className="btn btn-primary mr-2"
                        onClick={() => updateTask(task)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="btn btn-success mr-2"
                        onClick={() => updateTaskStatus(task._id)}
                      >
                        <MdOutlineDoneAll />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteTask(task._id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="fixed-bottom mb-2 me-0 d-flex justify-content-end me-5 p-5">
            <button className="btn btn-primary" onClick={addTask}>
              <MdAdd /> Add New Task
            </button>
            <button className="btn btn-danger ms-2" onClick={deleteAllTasks}>
              <MdDelete /> Delete All Tasks
            </button>
          </div>

        
        </div>
      )}
      {step === 1 && (
        <Addtask setStep={setStep} />
      )}
      {step === 2 && (
        <Edittask setStep={setStep} data={data} />
      )}
    
    </>
  );
};

export default TaskList;











// import React, { useEffect, useState } from 'react';
// import { MdAdd, MdDelete, MdEdit, MdOutlineDoneAll } from "react-icons/md";
// import Addtask from './Addtask';
// import Edittask from './Edittask';
// import axios from 'axios';

// const TaskList = () => {
//   const [step, setStep] = useState(0);
//   const [data, setData] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
 

//   useEffect(() => {    
//     getTask();   
//   }, []);
  
//   const getTask = async () => {
//     try {
//       const response = await axios.get("http://localhost:3010/task");
//       if (response.status === 200) {
//         setTasks(response.data);
//       }
//     } catch (error) {
//       console.log('Error fetching tasks:', error);
//     }
//   };

//   const addTask = () => {
//     setStep(1);
//   };

//   const updateTask = (task) => {
//     setData(task);
//     setStep(2);
//   };

//   const updateTaskStatus = async (id) => {
//     setError('');
//     try {
//       const response = await axios.patch(`http://localhost:3010/task/complete/${id}`);
//       if (response.status === 200) {
//         setSuccessMessage('Task Completed successfully!');
//         setTimeout(() => {
//           setSuccessMessage('');
//           setError('');
//           setStep(0);
//         }, 3000);
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const deleteTask = async (id) => {
//     setError('');
//     try {
//       const response = await axios.delete(`http://localhost:3010/task/${id}`);
//       if (response.status === 200) {
//         setSuccessMessage(response.message ? response.message : 'Task Deleted successfully!');
//         setTimeout(() => {
//           setSuccessMessage('');
//           setError('');
//           setStep(0);
//         }, 3000);
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <>
//       {step === 0 ? (
//         <>
//           <div className='p-5'>
//             <h2 className='text-center p-3'>Daily Task Manager </h2>
//             {error && <div className="alert alert-danger">{error}</div>}
//             {successMessage && <div className="alert alert-success">{successMessage}</div>}
//             <table className="table table-bordered table-striped text-center">
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>Description</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tasks && tasks.length > 0 ? (
//                   tasks.map(task => (
//                     <tr key={task._id}>
//                       <td>{task.title}</td>
//                       <td>{task.description}</td>
//                       <td>{task.status}</td>
//                       <td className='d-flex justify-content-around'>
//                         <button
//                           className="btn btn-primary mr-2"
//                           onClick={() => updateTask(task)}
//                         >
//                           <MdEdit />
//                         </button>
//                         <button
//                           className="btn btn-success mr-2"
//                           onClick={() => updateTaskStatus(task._id)}
//                         >
//                           <MdOutlineDoneAll />
//                         </button>
//                         <button
//                           className="btn btn-danger"
//                           onClick={() => deleteTask(task._id)}
//                         >
//                           <MdDelete />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="text-center">No data available</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//             <div className="fixed-bottom mb-2 me-0 d-flex justify-content-end me-5 p-5">
//               <button className="btn btn-primary" onClick={addTask}>
//                 <MdAdd /> Add New Task
//               </button>
//             </div>
//           </div>
//         </>
//       ) : null}
//       {step === 1 ? (
//         <Addtask setStep={setStep} />
//       ) : null}
//       {step === 2 ? (
//         <Edittask setStep={setStep} data={data} />
//       ) : null}
//     </>
//   );
// };

// export default TaskList;






















// import React, { useEffect, useState } from 'react';
// import { MdAdd, MdDelete, MdEdit, MdOutlineDoneAll } from "react-icons/md";
// import Addtask from './Addtask';
// import Edittask from './Edittask';
// import axios from 'axios';

// const TaskList = () => {
//   const [step, setStep] = useState(0);
//   const [data, setData] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     getTask();
//   }, []);

//   const getTask = async () => {
//     try {
//       const response = await axios.get("http://localhost:3010/task");
//       if (response.status === 200) {
//         setTasks(response.data);
//       }
//     } catch (error) {
//       console.log('Error fetching tasks:', error);
//     }
//   };


//   const addTask = () => {
//     setStep(1)
//   }
//   const updateTask = (task) => {
//     setData(task)
//     setStep(2)
//   }
//   const updateTaskStatus = async (id) => {
//     setError('')
//     try {
//       const response = await axios.patch(`http://localhost:3010/task/complete/${id}`);

//       if (response.status === 200) {
//         setSuccessMessage('Task Completed successfully!');
//         setTimeout(() => {
//             setSuccessMessage('');
//             setError('')
//             setStep(0);
//         }, 3000);
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   }

//   const deleteTask =async (id) => {
//     setError('')
//     try {
//       const response = await axios.delete(`http://localhost:3010/task/${id}`);
//       if (response.status === 200) {
//         setSuccessMessage(response.message? response.message: 'Task Deleted successfully!');
//         setTimeout(() => {
//             setSuccessMessage('');
//             setError('')
//             setStep(0);
//         }, 3000);
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   }

  
//   return (
//     <>
//       {
//         step === 0 ? (
//           <>
//             <div className='p-5'>
//               <h2 className='text-center p-3'>Daily Task Manger </h2>
//               {error && <div className="alert alert-danger">{error}</div>}
//               {successMessage && <div className="alert alert-success">{successMessage}</div>}
//               <table className="table table-bordered table-striped text-center">
//                 <thead>
//                   <tr>
//                     <th>Title</th>
//                     <th>Description</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>

//                   {tasks && tasks.length > 0 ? (
//                     tasks.map(task => (
//                       <tr key={task._id}>
//                         <td>{task.title}</td>
//                         <td>{task.description}</td>
//                         <td>{task.status}</td>
//                         <td className='d-flex justify-content-around'>
//                           <button
//                             className="btn btn-primary mr-2"
//                             onClick={() => updateTask(task)}
//                           >
//                             <MdEdit />
//                           </button>
//                           <button
//                             className="btn btn-success mr-2"
//                             onClick={() => updateTaskStatus(task._id)}
//                           >
//                             <MdOutlineDoneAll />
//                           </button>
//                           <button
//                             className="btn btn-danger"
//                             onClick={() => deleteTask(task._id)}
//                           >
//                             <MdDelete />
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="4" className="text-center">No data available</td>
//                     </tr>
//                   )}

//                 </tbody>
//               </table>

//               <div className="fixed-bottom mb-2 me-0 d-flex justify-content-end me-5 p-5">
//                 <button className="btn btn-primary" onClick={addTask}>
//                   < MdAdd /> Add New Task
//                 </button>
//               </div>
//             </div>
//           </>) : null
//       }
//       {
//         step === 1 ?
//           (
//             <>
//               <Addtask setStep={setStep} />
//             </>
//           ) : null
//       }
//       {
//         step === 2 ?
//           (
//             <><Edittask setStep={setStep} data={data} /></>
//           ) : null
//       }
//     </>

//   );
// };

// export default TaskList;
