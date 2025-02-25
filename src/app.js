import {
  getTodos,
  toggleTodoStatus,
  deleteTodo,
  updateTodo
} from './API/index.js'

export const container = document.getElementById('posts-container')
export const deleteCompletedButton = document.getElementById(
  'delete-completed-button'
)

import { hideLoader, showLoader, showError } from './utils/helpers.js'
import {
  initDragAndDrop,
  initDeleteCompleted,
  initAddTodo,
  updateTask,
  initDownload,
  downloadButton,
  initChangeStatus
} from './components/index.js'

initDeleteCompleted()
initAddTodo()
initDownload()
export async function loadData() {
  try {
    showLoader()
    const todos = await getTodos()
    console.log(12, todos)
    renderData(todos)
  } catch (error) {
    if (error.message === 'Задач нет') {
      showError('Задач нет')
    } else {
      showError('Не удалось получить данные')
    }
  } finally {
    hideLoader()
  }
}

export function renderData(todos) {
  container.innerHTML = ''

  const hasComplitedTodos = todos.some((todo) => todo.completed)

  deleteCompletedButton.style.display = hasComplitedTodos ? 'block' : 'none'

  todos.forEach((todo) => {
    const todoElement = document.createElement('div')
    todoElement.classList.add('todo')
    todoElement.setAttribute('data-id', todo.id)

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = todo.completed

    initChangeStatus(todo, checkbox)

    const textElement = document.createElement('p')
    textElement.textContent = todo.text
    textElement.style.textDecoration = todo.completed ? 'line-through' : 'none'

    const timeElement = document.createElement('p')
    timeElement.textContent = new Date(todo.createdAt).toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('button-function')

    const deleteIcon = document.createElement('img')
    deleteIcon.src = 'assets/icons/icon-delete.png'
    deleteIcon.alt = 'Удалить'
    deleteIcon.title = 'Удалить'

    deleteButton.append(deleteIcon)

    deleteButton.addEventListener('click', async () => {
      try {
        await deleteTodo(todo.id)
        await loadData()
      } catch (error) {
        console.error(error.message)
        showError('Не удалось удалить задачу')
      }
    })

    const updateButton = document.createElement('button')
    updateButton.classList.add('button-function')

    const updateIcon = document.createElement('img')
    updateIcon.src = 'assets/icons/icon-update.png'
    updateIcon.alt = 'Изменить'
    updateIcon.title = 'Изменить'

    updateButton.append(updateIcon)

    updateButton.addEventListener('click', () => updateTask(todo))

    todoElement.append(
      checkbox,
      textElement,
      timeElement,
      deleteButton,
      updateButton
    )

    initDragAndDrop(todoElement, todo, container)
    container.append(todoElement)
    downloadButton.hidden = true
    hideLoader()
  })
}

downloadButton.addEventListener('click', loadData)
