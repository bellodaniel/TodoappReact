import React, { Component } from "react";
import ReactDOM from 'react-dom';


let todoItems = [];
todoItems.push({index: 1, value: "learn react", done: false});
todoItems.push({index: 2, value: "Go shopping", done: true});
todoItems.push({index: 3, value: "buy flowers", done: true});

class TodoList extends React.Component {
    render () {
        let items = this.props.items.map((item, index) => {
            return (
                <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
            );
        });
        return (
            <ul className="list-group"> {items} </ul>
        );
    }
}

class TodoListItem extends Component {
    constructor(props) {
        super(props);
        this.onClickClose = this.onClickClose.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
    }
    onClickClose() {
        let index = parseInt(this.props.index);
        this.props.removeItem(index);
    }
    onClickDone() {
        let index = parseInt(this.props.index);
        this.props.markTodoDone(index);
    }
    render () {
        let todoClass = this.props.item.done ?
            "done" : "undone";
        return(
            <li className="list-group-item ">
                <div className={todoClass}>
                    <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onClickDone}> </span>
                    {this.props.item.value}
                    <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
                </div>
            </li>
        );
    }
}

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        this.refs.itemName.focus();
    }
    onSubmit(event) {
        event.preventDefault();
        let newItemValue = this.refs.itemName.value;

        if(newItemValue) {
            this.props.addItem({newItemValue});
            this.refs.form.reset();
        }
    }
    render () {
        return (
            <form ref="form" onSubmit={this.onSubmit} className="form-inline">
                <input type="text" ref="itemName" className="form-control" placeholder="add a new todo..."/>
                <button type="submit" className="btn btn-default">Add</button>
            </form>
        );
    }
}

class TodoHeader extends React.Component {
    render () {
        return <h1>Todo list</h1>;
    }
}

class TodoApp extends React.Component {
    constructor (props) {
        super(props);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.markTodoDone = this.markTodoDone.bind(this);
        this.state = {todoItems: todoItems};
    }
    addItem(todoItem) {
        todoItems.unshift({
            index: todoItems.length+1,
            value: todoItem.newItemValue,
            done: false
        });
        this.setState({todoItems: todoItems});
    }
    removeItem (itemIndex) {
        todoItems.splice(itemIndex, 1);
        this.setState({todoItems: todoItems});
    }
    markTodoDone(itemIndex) {
        let todo = todoItems[itemIndex];
        todoItems.splice(itemIndex, 1);
        todo.done = !todo.done;
        todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
        this.setState({todoItems: todoItems});
    }
    render() {
        return (
            <div id="main">
                <TodoHeader />
                <TodoList items={this.props.initItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
                <TodoForm addItem={this.addItem} />
            </div>
        );
    }
}

ReactDOM.render(<TodoApp initItems={todoItems}/>, document.getElementById('app'));
export default Todolist;
// class Todolist extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {value: ''};
//
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//     handleChange(event) {
//         this.setState({value: event.target.value});
//     }
//
//     handleSubmit(event) {
//         let element = this.state.value;
//         ReactDOM.render(
//             <ul>
//                 <li>{element}</li>
//             </ul>,
//             document.getElementById('list')
//         );
//         event.preventDefault();
//     }
//
//     render() {
//         return (
//             <div>
//                 <form onSubmit={this.handleSubmit}>
//                     <label>
//                         Action:
//                         <input type="text" value={this.state.value} onChange={this.handleChange} />
//                     </label>
//                     <input type="submit" value="Submit" />
//                 </form>
//                 <ListElements />
//             </div>
//         );
//     }
// }
//
// export default Todolist;