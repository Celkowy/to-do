const notCompletedTodos = [];
const completedTodos = [];
const input = document.querySelector('form input')
const form = document.querySelector('form')
const ulNotCompleted = document.querySelector(".ul-not-completed")
const ulCompleted = document.querySelector(".ul-completed")
const counter = document.querySelector('.counter')

const addTodo = (e) => {
  e.preventDefault();

  if(input.value === "") return

  const newTodo = document.createElement("li")
  newTodo.innerHTML = `<div class="left"><span class="index"></span>${input.value}</div><div class="right"><i class="fas fa-edit"></i><i class="far fa-check-square"></i></div>`;

  ulNotCompleted.appendChild(newTodo)
  notCompletedTodos.push(newTodo)

  const remove = newTodo.querySelector('.fa-check-square');
  remove.addEventListener('click', removeTodo)

  updateOrder()
  updateCounter()
  input.value = ""
}

const removeTodo = (e) => {
  e.target.parentNode.previousSibling.childNodes[0].classList.add('hide')
  e.target.parentNode.childNodes[0].classList.add('hide')
  e.target.parentNode.previousSibling.classList.add('line-through')
  e.target.className = "fas fa-trash delete"

  const del = e.target.parentNode.parentNode;
  del.remove()
  notCompletedTodos.splice(del.dataset.key,1)
  completedTodos.push(e.target.parentNode.parentNode)
  updateOrder()
  displayCompletedUl()
  updateCounter()

  e.target.removeEventListener('click', removeTodo)

  e.target.addEventListener('click', () => {
    e.target.parentNode.parentNode.remove()
    completedTodos.splice(e.target.dataset.key, 1)
  })
}

const updateCounter = () => {
  counter.textContent = notCompletedTodos.length
}

const updateOrder = () => {
  let allnotCompletedLi = [...document.querySelectorAll('.index')]
  allnotCompletedLi.forEach((element, index) => {
    element.textContent = index + 1
  })
}

const displayCompletedUl = () => {
  ulCompleted.textContent = ""
  completedTodos.forEach(element => {
    ulCompleted.appendChild(element)
  })
}

form.addEventListener('submit', addTodo)