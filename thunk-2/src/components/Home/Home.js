import { Row, Col, Container,Card ,Button,Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {useState,useEffect} from "react";
import {Link} from "react-router-dom"

export function Home() {

  const [tasks,setTasks] = useState([]);
  const todo = tasks.filter(e=>e.todo === "true");
  const inProgress = tasks.filter(e=>e.inProgress === "true");
  const done = tasks.filter(e=>e.done === "true");
  // console.log("todo",todo);
  // console.log("inporogerss",inProgress);
  // console.log("done",done);
  async function getData(){
    try{
      const {data} = await axios.get("http://localhost:3333/todos")
      setTasks(data);
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getData();
  },[])

  function toggleSubtask(id,id2){
    for(let i=0;i<tasks.length;i++){
      if(id==tasks[i]._id){
        for(let j = 0;j<tasks[i].subTasks.length;j++){
          if(tasks[i].subTasks[j]._id === id2){
            tasks[i].subTasks[j].status = tasks[i].subTasks[j].status === "false"? "true":"false";
          }
        }
        break;
      }
    }
    setTasks([...tasks])
  }

  return (
    <Container fluid>
      <div className="d-flex justfity-content-between">
        <Col className="col-3 p-2 border">
          
          <Row>
            <Col><Row>
                <Col>Username: Ar1fshaikh</Col></Row>
            <Row>
            <br/>
            <br/>
            <br/>
            <Col><Link to="/">Home</Link></Col>
            </Row></Col> 
          </Row>
          <Row>
          <Link to="/addtodos">add todo</Link>
          </Row>
        </Col>
        <Col className="col-3 p-2 border">
        
        {todo.map( e => <Card key={e._id} className="my-2">
          <Card.Header style={{backgroundColor:"#ff763b"}}>To-Do</Card.Header>
          <Card.Body className="text-start">
              <Card.Title>{e.title}</Card.Title>
              <Card.Text>{e.description}</Card.Text>
              {
                e.subTasks.map(s=><div key={s._id} onClick={()=>toggleSubtask(e._id,s._id)}>
                <input type="checkbox"
                    onClick={()=>toggleSubtask(e._id,s._id)}
                    label="1"
                    name="group1"
                    type={"checkbox"}
                    defaultValue={s.status==="true"}
                  />{"  "}
                  <label>{s.title}</label>
                  </div>)
              }
              <br/>
              <Link to={`/todos/${e.id}`}>
              <Button variant="primary">Edit</Button>
              </Link>
          </Card.Body>
          <Card.Footer className="text-muted">today</Card.Footer>
        </Card>)}
        </Col>
        <Col className="col-3 p-2 border">
        {inProgress.map( e => <Card key={e._id}className="my-2">
          <Card.Header style={{backgroundColor:"#ffee80"}}>In-Progress</Card.Header>
          <Card.Body className="text-start p-2">
              <Card.Title>{e.title}</Card.Title>
              <Card.Text>{e.description}</Card.Text>
              <div className="text-start">{
                e.subTasks.map(s=><div key={s._id} onClick={()=>toggleSubtask(e._id,s._id)}>
                <input type="checkbox"
                    onClick={()=>toggleSubtask(e._id,s._id)}
                    label="1"
                    name="group1"
                    type={"checkbox"}
                    defaultValue={s.status==="true"}
                  />{"  "}
                  <label>{s.title}</label>
                  </div>)
              }</div>
              <br/>
              <Link to={`/todos/${e.id}`}>
              <Button variant="primary">Edit</Button>
              </Link>
          </Card.Body>
          <Card.Footer className="text-muted">today</Card.Footer>
        </Card>)}
        </Col>
        <Col className="col-3 p-2 border">   
        {done.map( e => <Card key={e._id} className="my-2">
          <Card.Header style={{backgroundColor:"#8eff80"}}>Done</Card.Header>
          <Card.Body className="text-start">
          <Card.Title>{e.title}</Card.Title>
            <Card.Text>{e.description}</Card.Text>
              {
                e.subTasks.map(s=><div key={s._id} onClick={()=>toggleSubtask(e._id,s._id)}>
                <input type="checkbox"
                    onClick={()=>toggleSubtask(e._id,s._id)}
                    label="1"
                    name="group1"
                    type={"checkbox"}
                    defaultValue={s.status==="true"}
                />{"  "}
                  <label>{s.title}</label>
                  </div>)
              }
              <br/>
              <Link to={`/todos/${e.id}`}>
              <Button variant="primary">Edit</Button>
              </Link>
          </Card.Body>
          <Card.Footer className="text-muted">today</Card.Footer>
        </Card>)}
        </Col>
      </div>
    </Container>
  );
}
