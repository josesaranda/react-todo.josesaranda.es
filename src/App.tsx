import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Input, List, Col, Row, message } from 'antd';
import {observer} from 'mobx-react';

import { Storage } from './providers/Storage';
import { Task, TaskProvider } from './providers/TaskProvider';

export type AppProps = {
  tasks? : Task[],
  summary? : string
}

export type AppState = {
  tasks? : Task[],
  summary? : string
}

@observer
export default class App extends React.Component<AppProps,AppState> {

  state : AppState;

  storage : Storage = new Storage(true);
  taskProvider : TaskProvider = new TaskProvider(this.storage);

  tasks : Task[] = this.taskProvider.tasks;
  task : Task = {};

  constructor(props : AppProps) {
      super(props);
      this.state = {
        tasks : this.tasks
      };
      
      this.onSubmit = this.onSubmit.bind(this);
  }

  onClickTask = (index : number) => {
    this.taskProvider.deleteTask(index);
    this.setState({tasks : this.taskProvider.getTasks()});
  }

  onChange = (e : any) => {
    let summary = e.target.value.trim();
    this.setState({summary : e.target.value});

    if(summary){
      this.task = {
        id : new Date().getMilliseconds(),
        summary : e.target.value,
        done : false
      };
    }else{
      this.task = {};
    }
 }

  onSubmit = (e : any) => {
    e.preventDefault();
    if(this.task.summary){
      this.taskProvider.setTask(this.task);
      this.setState({tasks : this.taskProvider.tasks});
    }
    this.setState({summary : ''});
    this.task = {};  
  }

  showTask(task : Task){
    message.info(task.summary);
  }

  render() {
      return (
        <div className="wrapper">
          <h1 className="text-align-c">Simple TODO List</h1>
            <List locale={{emptyText : 'No hay tareas'}} header={
              <div><form className="text-align-r" onSubmit={this.onSubmit}>
                <Input className="w-auto" value={this.state.summary} type="text" placeholder="Nombre" onChange={this.onChange}/>
                <Input className="w-auto" type="submit" value="Enviar" />
                </form>
              </div>
              }
            bordered
            dataSource={this.state.tasks}
            renderItem={(task : Task, index) => (
              <List.Item className="list-item">
                <Row className="w-100-p">
                  <Col className="overflow-hidden" span={16} onClick={() => this.showTask(task)}>{task.summary}</Col>
                  <Col span={8}>
                    <div className="text-align-r">
                      <span className="pointer hover" onClick={() => this.onClickTask(index)}>Eliminar</span>
                    </div>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </div>
      );
   }
};
