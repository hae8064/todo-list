 import React from 'react';
//useState를 {}묶어줘야함 아니면 에러뜸
//구체적인 모듈을 import하기위해서는 {} 묶어줘야함
import {useState} from 'react';
import { MdAddCircle } from 'react-icons/md';
import './App.css';
import Template from './components/Template';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

//계속 증가시키기위해서 함수를 여기다가 작성
let nextId = 4;

const App = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "할일 1",
      checked: true
    },
    {
      id: 2,
      text: "할일 2",
      checked: false
    },
    {
      id: 3,
      text: "할일 3",
      checked: true
    }
  ]);

  const onInsertToggle = () => {
    if(selectedTodo){
      setSelectedTodo(null);
    }

    setInsertToggle(prev => !prev)
  }

  const onInsertTodo = (text) => {
    //만약 텍스트가 빈문자열이라면
    if(text === ""){
      return alert("할 일을 입력해주세요")
    }
    else{
      const todo = {
        id: nextId,
        text,
        checked: false
      }
      setTodos(todos => todos.concat(todo));
      nextId++;
    }
  }

  const onCheckToggle = (id) => {
    setTodos(todos => todos.map(todo => (todo.id === id ? {...todo, checked: !todo.checked} : todo)
      )
    );
  };

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo)
  }

  const onRemove = id => {
    onInsertToggle();
    setTodos(todos => todos.filter(todo => todo.id !== id))
  };

  const onUpdate = (id, text) => {
    onInsertToggle();
    setTodos(todos => todos.map(todo => (todo.id === id ? {...todo, text} : todo))
    );
  };

  //concat함수란: 새 배열이 리턴이 되고, 기존 배열은 변경이 되지않는다.
  return (
    <Template todoLength = {todos.length}>
      <TodoList 
      todos = {todos} 
      onCheckToggle = {onCheckToggle} 
      onInsertToggle = {onInsertToggle}
      onChangeSelectedTodo = {onChangeSelectedTodo}
      />
      <div className = "add-todo-button" onClick = {onInsertToggle}>
        <MdAddCircle/>
      </div>
      {insertToggle && (<TodoInsert 
      selectedTodo = {selectedTodo}
      onInsertToggle={onInsertToggle} 
      onInsertTodo = {onInsertTodo}
      onRemove = {onRemove}
      onUpdate = {onUpdate}
      />
      )}
    </Template> 
  );
};

export default App;