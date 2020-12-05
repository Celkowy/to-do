let todos = [];
let len = 0;

const input = document.querySelector('form input')
const form = document.querySelector('form')
const searchForm = document.querySelector('.search')
const todoList$ = document.getElementById("todo-list")
const doneList$ = document.getElementById("done-list")
const counter = document.querySelector('.counter')

const addTodo = (e) => {
  e.preventDefault();

  if(input.value === "") return

  todos.push({id: len++ ,name: input.value, completed: false, show: true});

  render();

  input.value = ""
  
}

const removeTodo = (e) => {

  todos.filter(el => el.id == e.target.dataset.id)[0].completed = true;
  

  e.target.removeEventListener('click', removeTodo)

  render();

  e.target.addEventListener('click', () => {
    e.target.parentNode.parentNode.remove()
    completedTodos.splice(e.target.dataset.key, 1)
  })
}

const searchTask = (e) => {
  const searchText = e.target.value.toLowerCase();
  todos = todos.map( t=> { 
    if(t.name.includes(searchText)){
      t.show = true
    }else {
      t.show = false;
    }
    return t;
  })
 render();   
}

const updateCounter = () => {
  counter.textContent = todos.filter( el => !el.completed).length;
}

function render() {

  updateCounter();
  
  //todo list
  todoList$.innerHTML = '';
  todos.filter(task=> !task.completed && task.show ).forEach( (task, index) => {
    todoList$.appendChild( generateItem(task, index+1) );
  })
  //done list
  doneList$.innerHTML = '';
  todos.filter(task=> task.completed ).forEach( (task, index) => {
    doneList$.appendChild(generateItem(task, index+1));
  })
}

function generateItem(task , index) {
  let newTodo = document.createElement('li');
  newTodo.innerHTML =  `<div class="left ${task.completed ? 'line-through': ''}"><span class="index ${task.completed ? 'hide': ''}">\
  ${index}</span><div class="value">${task.name}</div>\
  </div><div class="right"><i class="fas fa-edit ${task.completed ? 'hide': ''}">\
  </i><i class="${ task.completed ? 'fas fa-trash delete' : 'far fa-check-square'}"></i></div>`
  
  if (!task.completed) {
    newTodo.querySelector('.fa-edit').addEventListener('click', () => {
      const addCheck = newTodo.querySelector('.right');
      addCheck.style.display ="none"
  
      const changeValue = newTodo.querySelector('.value')
      changeValue.innerHTML = `<input type="text" class="change" value="${changeValue.textContent}"><i class="fas fa-check change-me">`
  
      const inputChangeValue = newTodo.querySelector('.change')
  
      const changeMe = document.querySelector('.change-me');
  
      changeMe.addEventListener('click', () => {
        changeValue.innerHTML = `${inputChangeValue.value}`
        addCheck.style.display ="inline"
      })
    })

    const remove = newTodo.querySelector('.fa-check-square');
    remove.dataset.id = task.id ;
    remove.addEventListener('click', removeTodo);
  } else {
    newTodo.querySelector('.fa-trash').addEventListener('click', () => {
      todos = todos.filter( item => item.id != task.id);
      render();
    })
    
  }

    
  return newTodo;
}

form.addEventListener('submit', addTodo)
searchForm.addEventListener('input', searchTask)
