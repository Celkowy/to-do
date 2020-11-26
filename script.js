const notCompletedTodos = [];
const completedTodos = [];
const input = document.querySelector('form input')
const form = document.querySelector('form')
const searchForm = document.querySelector('.search')
const ulNotCompleted = document.querySelector(".ul-not-completed")
const ulCompleted = document.querySelector(".ul-completed")
const counter = document.querySelector('.counter')

const addTodo = (e) => {
  e.preventDefault();

  if(input.value === "") return
  const newTodo = document.createElement("li")
  newTodo.innerHTML = `<div class="left"><span class="index"></span><div class="value">${input.value}</div></div><div class="right"><i class="fas fa-edit"></i><i class="far fa-check-square"></i></div>`;

  ulNotCompleted.appendChild(newTodo)
  notCompletedTodos.push(newTodo)

  const edit = newTodo.querySelector('.fa-edit');

  edit.addEventListener('click', () => {

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
  remove.addEventListener('click', removeTodo)

  updateOrder()
  updateCounter()
  input.value = ""
}

const removeTodo = (e) => {
  e.target.parentNode.previousSibling.childNodes[0].classList.add('hide')
  e.target.previousSibling.classList.add('hide')
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

const searchTask = (e) => {
  let notCompletedLis = notCompletedTodos;
  const searchText = e.target.value.toLowerCase();
  notCompletedLis = notCompletedLis.filter(li => li.textContent.toLowerCase().includes(searchText))
  ulNotCompleted.textContent = ""
  notCompletedLis.forEach(li => ulNotCompleted.appendChild(li))
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
searchForm.addEventListener('input', searchTask)
