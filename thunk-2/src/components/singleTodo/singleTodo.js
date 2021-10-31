import {Col,Row,Container} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import { useState, useEffect } from "react";
import {v4 as uuid} from "uuid";
import axios from "axios";
import {useParams,Link} from "react-router-dom"
import {singleTask} from "../../redux/todoReducer/actions"
// import { addTask } from "../../redux/todoReducer/actions";
export default function SingleTodo(){
    const {id} = useParams();
    const [task,setTask] = useState({});
    const [subTasks,setSubTasks] = useState([]);
    const [subTask,setSubtask]  = useState("") 
    const dispatch = useDispatch();
    const {isLoading,todos,isError,err}= useSelector((state)=>state.todoReducer);
    // async function handleGetTask(){
    //     try{
    //         dispatch(getTodoLaoding())
    //         const {data} = await axios.get("http://localhost:3333/todos/"+id)
    //         setTask({...data});
    //         setSubTasks(data.subTasks)
    //         dispatch(getTodoSuccess())
    //         console.log(data)
    //     }catch(err){
    //         dispatch(getTodoError(err))
    //         console.log(err)
    //     }
    // }

    useEffect(async()=>{
        const data = await dispatch(singleTask(id))
        setTask(data)
        setSubTasks(data.subTasks)
        console.log("thisa is useffect",data)
    },[])
    
    async function handleSubmit(){
        if(!task.title){return}
        try{
            const {data} = await axios.patch("http://localhost:3333/todos/"+id,task);
            console.log(data);
            setTask(data);
        }catch(err){
            console.log(err)
        }
    }
    
    
    function handleAddSubtasks(){
        if(!subTask){return}
        setSubTasks([...subTasks,{_id:uuid(),title:subTask,status:"false"}]);
        setSubtask("")
        setTask({
            ...task,
            subTasks:[...subTasks,{_id:uuid(),title:subTask,status:"false"}]
        })
    }

    function handleSubtaskInput(e){
        const {value} = e.target
        setSubtask(value)
    }
    function handleToggleSubtask(id){
        subTasks.map(
            e=> e._id === id ?  e.status === "false" ? e.status="true": e.status="false" : e=e
        )
        setSubTasks([...subTasks])
    }

    function handleSubTaskDelete(id){
        setSubTasks([...subTasks.filter(e=>e._id !== id)]);
        setTask({
            ...task,
            subTasks:[...subTasks.filter(e=>e._id !== id)]
        })}
    function handleInput(e,id){
        const {name,value,type}  = e.target
        console.log(name,value,type)
        
        setTask({
            ...task,
            [name]:value,
            subTasks
        })
        console.log(task)
    }
// isLoading ? "Loading..." : isError ? "there is error" : 
    return  isLoading ? "Loading..." : isError ? err :  (<div>
        <Container fluid>
        <Row>
        <Col className="col-3 p-2 border">
            <Row>
            <Col>Username: Ar1fshaikh</Col></Row>
            <Row>
            <br/>
            <br/>
            <br/>
            <Col><Link to="/">Home</Link></Col>
            </Row></Col>
        <Col className="col-9 p-4 border text-start">
            <Row>
            <Col className="col-4">
                <label>Title </label>{" "}<br/>
                <input defaultValue={task.title}  onChange={handleInput}  type="text" placeholder="Title" name="title"  />
                <br/>
                <br/>
                <label>Descirption </label>{" "}<br/>
                <input defaultValue={task.description} onChange={handleInput} type="text" placeholder="Descirption" name="description" />
                <br/>
                <br/>
                <label>Status </label>{" "}<br/>
                <input onClick={handleInput} type="checkbox" className="p-1 mx-2"  name="todo"  defaultValue={task.todo === "true"}/>
                <label htmlFor="vehicle1"> to-do</label><br/>
                <input onClick={handleInput} type="checkbox" className="mx-2 p-1"  name="inProgress" defaultValue={task.inProgress === "true"} />
                <label htmlFor="vehicle2"> In progress</label><br/>
                <input onClick={handleInput}  type="checkbox" className="mx-2 p-1"  name="done" defaultValue={task.done == "true"}/>
                <label htmlFor="vehicle3"> Done</label>
                <br/>
                <br/>
                <label>Tag </label>{" "}<br/>
                <input onClick={handleInput}type="checkbox" className="p-1 mx-2"  name="office" defaultValue={task.office == "true"}/>
                <label htmlFor="vehicle1"> office</label><br/>
                <input onClick={handleInput}  type="checkbox" className="mx-2 p-1"  name="personal" defaultValue={task.personal == "true"} />
                <label htmlFor="vehicle2"> personal</label><br/>
                <input onClick={handleInput} type="checkbox" className="mx-2 p-1"  name="other" defaultValue={task.other === "true"}  />
                <label htmlFor="vehicle3"> other</label>
            </Col>
            <Col className="col-5">
                <label>Sub-Task</label>{" "}<br/>
                <input value={subTask}  onChange={handleSubtaskInput} label="title" type="text"name="subTask" placeholder="Title" />
                <button onClick={handleAddSubtasks}>Add</button>               
                <br/>
                <br/>
                <br/>
                <div>
                {
                    subTasks.map((subt)=><div key={subt._id} className="p-1 py-2 border my-1 d-flex justify-content-between align-center">
                    <div><input  type="checkbox" onChange={()=>{handleToggleSubtask(subt._id)}}   checked={subt.status === "true"}  className="p-1 mx-2 align-center"  name="office" value="office"/>
                    <label htmlFor={subt._id}>{subt.title}</label></div>
                    <button onClick={()=>handleSubTaskDelete(subt._id)}>Delete</button>
                    </div>)
                }                   
                </div>
            </Col>
            <Col className="col-3 py-4">
                <button onClick={handleSubmit} >Update</button>
            </Col>
            </Row>
        </Col>
        </Row>
        </Container>
    </div>)
}