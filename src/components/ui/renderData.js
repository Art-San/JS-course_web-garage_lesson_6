import { downloadButton } from '../index.js'
import { hideLoader } from '../../utils/helpers.js'
import { createTodoElement } from './createElements/createTodoElement.js'

export const container = document.getElementById('posts-container')
export const deleteCompletedButton = document.getElementById(
  'delete-completed-button'
)
export function renderData(todos) {
  container.innerHTML = ''

  const hasCompletedTodos = todos.some((todo) => todo.completed)

  deleteCompletedButton.style.display = hasCompletedTodos ? 'block' : 'none'

  todos.forEach((todo) => {
    const todoElement = createTodoElement(todo, container)
    container.append(todoElement)
  })

  downloadButton.hidden = true
  hideLoader()
}

// import { createCheckbox } from './createElements/createCheckbox.js'
// import { createText } from './createElements/createText.js'
// import { createTime } from './createElements/createTime.js'
// import { createDeleteButton } from './createElements/createDeleteButton.js'
// import { createUpdateButton } from './createElements/createUpdateButton.js'

// import { hideLoader } from '../../utils/helpers.js'
// import { initDragAndDrop, downloadButton } from '../index.js'

// export const container = document.getElementById('posts-container')
// export const deleteCompletedButton = document.getElementById(
//   'delete-completed-button'
// )

// export function renderData(todos) {
//   container.innerHTML = ''
//   const hasComplitedTodos = todos.some((todo) => todo.completed)

//   deleteCompletedButton.style.display = hasComplitedTodos ? 'block' : 'none'

//   todos.forEach((todo) => {
//     const todoElement = document.createElement('div')
//     todoElement.classList.add('todo')
//     todoElement.setAttribute('data-id', todo.id)

//     const checkbox = createCheckbox(todo)
//     const textElement = createText(todo)
//     const timeElement = createTime(todo)
//     const deleteButton = createDeleteButton(todo)
//     const updateButton = createUpdateButton(todo)

//     todoElement.append(
//       checkbox,
//       textElement,
//       timeElement,
//       deleteButton,
//       updateButton
//     )

//     initDragAndDrop(todoElement, todo, container)
//     container.append(todoElement)
//     downloadButton.hidden = true
//     hideLoader()
//   })
// }
