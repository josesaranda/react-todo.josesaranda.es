import { Storage } from "./Storage";
import {observable, action} from 'mobx';

export type Task = {
    id? : number,
    summary? : string,
    done? : boolean
};

export class TaskProvider {

    private variable : string = 'tasks'; 

    @observable
    public tasks : Task[] = <Task[]> JSON.parse(this.storage.getItem(this.variable) || '[]') || [];

    constructor(
        private storage : Storage
    ){}

    getTasks() : Task[]{
        return this.tasks;
    }

    @action
    setTask(task : Task) : void{
        this.tasks.unshift(task);
        this.storage.setItem(this.variable,JSON.stringify(this.tasks));
    }

    @action
    deleteTask(index : number){
        this.tasks.splice(index,1);
        this.storage.setItem(this.variable,JSON.stringify(this.tasks));
    }

}