import {
  getTodos,
  toggleTodoStatus,
  deleteTodo,
  updateTodo
} from './API/index.js'

export const container = document.getElementById('posts-container')

import { hideLoader, showLoader, showError } from './utils/helpers.js'
import {
  initDeleteCompleted,
  initAddTodo,
  initDownload,
  downloadButton,
  renderData
} from './components/index.js'

initDeleteCompleted()
initAddTodo()
initDownload()

export async function loadData() {
  try {
    showLoader()
    const todos = await getTodos()

    renderData(todos, container)
  } catch (error) {
    console.log(777, error)
    if (error.message === 'Задач нет') {
      showError('Задач нет')
    } else {
      showError('Не удалось получить данные')
    }
  } finally {
    hideLoader()
  }
}
loadData()
downloadButton.addEventListener('click', loadData)
