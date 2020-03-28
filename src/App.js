import React, { useState,useEffect } from 'react';

import './App.css';
import {firestore} from './index'
import Task from './Task'

function App() {
  const [tasks,setTasks] =useState([]
  )

  const [name,setName] =useState('')
      useEffect(() =>{
retriveData()
      },[])


    const retriveData =() =>{
      firestore.collection("tasks").onSnapshot( (snapshot) => {
        console.log(snapshot.docs)
          let myTask =snapshot.docs.map( d =>{
          const{id,name}= d.data()
          console.log(id,name)
          return {id ,name}
        })
        setTasks(myTask)
      })
    }
    const deleteTask = (id) =>{
      firestore.collection("tasks").doc(id+'').delete()

    }
    const  editTask  = (id) =>{
      firestore.collection("tasks").doc(id+'').set({id,name})
    }


  const renderTask =() =>{
    if(tasks && tasks.length)
    {
    return(
      tasks.map (( task, index)=>{
        return(
          <Task key ={index} task ={task}
                deleteTask={deleteTask}
                editTask ={editTask} />
        )
      }
      )
    )
    }
    else
    {
     return(<li>No task</li>)
    }
  }

  const addTask =()  =>{
  let id =(tasks.length ===0)?1:tasks[tasks.length-1].id+1
    firestore.collection("tasks").doc(id+'').set({id,name})
  }
  return (
    <div  >
    <h1>Client-Lab8</h1>
    <div className="back">
    <h2>todo</h2>
    <div className="input_">
    <input type ="text" name ="name" onChange={(e)=>{setName(e.target.value)}} />
    <button onClick={addTask} >Submit</button>
    </div>
   
    <ul style={{display:'flex',listStyle:'none'}}>{ renderTask()}</ul>
    </div>
    </div>
  );
}

export default App;
