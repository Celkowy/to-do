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
  updateTable()
  updateCompletedLiIndexes()
  deleteFromCompletedUl()
  input.value = ""
}

const removeTodo = (e) => {
  e.target.parentNode.previousSibling.childNodes[0].classList.add('hide')
  e.target.parentNode.childNodes[0].classList.add('hide')
  e.target.parentNode.childNodes[1].classList.add('hide')
  e.target.parentNode.previousSibling.classList.add('line-through')
  e.target.className = "fas fa-trash delete"
  e.target.parentNode.parentNode.classList.add('skip')
  const del = e.target.parentNode.parentNode;
  del.remove()
  notCompletedTodos.splice(del.dataset.key,1)
  completedTodos.push(e.target.parentNode.parentNode)
  updateOrder()
  updateTable()
  updateCompletedTable()
  deleteFromCompletedUl()
  updateCompletedLiIndexes()

}

const updateTable = () => {
  ulNotCompleted.textContent = ""
  notCompletedTodos.forEach((element, index) =>{
    element.dataset.key = index;
    ulNotCompleted.appendChild(element)
  })
  counter.textContent = notCompletedTodos.length
}

const updateOrder = () => {
  let allnotCompletedLi = [...document.querySelectorAll('.index')]
  allnotCompletedLi.forEach((element, index) => {
    element.textContent = index + 1
  })
}


const updateCompletedTable = () => {
  completedTodos.forEach(element => {
    ulCompleted.appendChild(element)
  })
}

const deleteFromCompletedUl = () => {
  let listOfDeleteElements = [...document.querySelectorAll('.delete')]
  listOfDeleteElements.forEach((element, index) => {
   element.dataset.key = index;
  })

  //  ulCompleted.textContent = ""
  //   completedTodos.forEach((element, index) => {
  //   element.dataset.key = index;
  //   ulCompleted.appendChild(element)
  // })

  // listOfDeleteElements.forEach(element => {
  //   element.addEventListener('click', () => {
  //     completedTodos.forEach(todo => {
  //     updateCompletedLiIndexes()
        
  //       console.log(todo, element);
  //       if(todo.dataset.key == element.dataset.key){
  //         console.log(todo.dataset.key);
  //         completedTodos.splice(todo.dataset.key, 1)
  //         console.log(todo);
  //         todo.remove()
  //       }
  //     })
  //   })
  // })

}


const updateCompletedLiIndexes = () => {
  completedTodos.forEach((element, index) => {
  element.dataset.key = index;
  console.log(element);
})

}



form.addEventListener('submit', addTodo)