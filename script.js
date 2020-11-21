const notCompletedTable = [];
const CompletedTable = [];
const input = document.querySelector('form input')
const form = document.querySelector('form')
const ul = document.querySelector(".ul-not-completed")
const counter = document.querySelector('.counter')


const addTodo = (e) => {
  e.preventDefault();
  if(input.value === "") return
  const newTodo = document.createElement("li")
  newTodo.innerHTML = `<div class="left"><span class="index"></span><input class="checkbox" type="checkbox"> ${input.value}</div><div class="right"><i class="far fa-check-square"></i><i class="fas fa-edit"></i><i class="fas fa-trash remove"></i></div>` 
  ul.appendChild(newTodo)
  notCompletedTable.push(newTodo)



  const remove = newTodo.querySelector('.remove');
  remove.addEventListener('click', removeTodo)
  updateOrder()
  updateTable()

  input.value = ""
  console.log(notCompletedTable);
}

const removeTodo = (e) => {

  const del = e.target.parentNode.parentNode;
  del.remove()
  notCompletedTable.splice(del.dataset.key,1)
  updateTable()
  updateOrder()
  
  console.log(notCompletedTable);
}

const updateTable = () => {

  ul.textContent = ""
  notCompletedTable.forEach((element, index) =>{
    element.dataset.key = index;
    ul.appendChild(element)
  })
  counter.textContent = notCompletedTable.length
}

const updateOrder = () => {

  let allLi = [...document.querySelectorAll('.index')]
  allLi.forEach((element, index) => {
    element.textContent = index + 1
  })
}








form.addEventListener('submit', addTodo)