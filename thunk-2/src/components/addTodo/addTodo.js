import {Col,Row,Container} from "react-bootstrap"
import { useState } from "react";
import {v4 as uuid} from "uuid";
import {useDispatch} from "react-redux";
import {addTask} from "../../redux/todoReducer/actions";
import {Link} from "react-router-dom"

export default function AddTodo(){
    const [task,setTask] = useState({title:"",description:"",_id:uuid(),todo:"false",inProgress:"false",done:"false",other:"false",personal:"false",office:"false"});
    const dispatch = useDispatch();
    const [subTasks,setSubTasks] = useState([]);
    const [subTask,setSubtask]  = useState("")
    
    
    async function handleSubmit(){
        console.log("in handlesubmit");
        dispatch(addTask(task));
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
            e=> e._id === id ? e.status=== "false" ? "true":"false" : e=e
        )
        setSubTasks([...subTasks])
    }
    function handleSubTaskDelete(id){
        setSubTasks([...subTasks.filter(e=>e._id !== id)]);
        setTask({
            ...task,
            subTasks:[...subTasks.filter(e=>e._id !== id)]
        })}
    function handleInput(e){
        const {name,value}  = e.target
        setTask({
            ...task,
            [name]:value,
            subTasks
        })
    }

    return <div>
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
            </Row>
        </Col>
        <Col className="col-9 p-4 border text-start">
            <Row>
            <Col className="col-4">
                <label>Title </label>{" "}<br/>
                <input onChange={handleInput}  type="text" placeholder="Title" name="title"  />
                <br/>
                <br/>
                <label>Descirption </label>{" "}<br/>
                <input onChange={handleInput} type="text" placeholder="Descirption" name="description" />
                <br/>
                <br/>
                <label>Status </label>{" "}<br/>
                <input onChange={handleInput} type="checkbox" className="p-1 mx-2"  name="todo" value={task.todo === "true" ? "false":"true"} />
                <label htmlFor="vehicle1"> to-do</label><br/>
                <input  onChange={handleInput} type="checkbox" className="mx-2 p-1"  name="inProgress" value={task.inProgress === "true" ? "false":"true"}/>
                <label htmlFor="vehicle2"> In progress</label><br/>
                <input onChange={handleInput}  type="checkbox" className="mx-2 p-1"  name="done" value={task.done === "true" ? "false":"true"}/>
                <label htmlFor="vehicle3"> Done</label>
                <br/>
                <br/>
                <label>Tag </label>{" "}<br/>
                <input onChange={handleInput}type="checkbox" className="p-1 mx-2"  name="office" value={task.office === "true" ? "false":"true"}/>
                <label htmlFor="vehicle1"> office</label><br/>
                <input onChange={handleInput}  type="checkbox" className="mx-2 p-1"  name="personal" value={task.personal === "true" ? "false":"true"}/>
                <label htmlFor="vehicle2"> personal</label><br/>
                <input onChange={handleInput} type="checkbox" className="mx-2 p-1"  name="other" value={task.other === "true" ? "false":"true" }/>
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
                <button onClick={handleSubmit} >Add todo</button>
            </Col>
            </Row>
        </Col>
        </Row>
        </Container>
    </div>
}