import { getTodos } from '../../API/index.js'
import { renderData } from '../index.js'
import { showError, showLoader, hideLoader } from '../../utils/helpers.js'
import { getUserInfo } from '../../utils/authHelper.js'

export async function loadData() {
  try {
    showLoader()
    const { uid, token } = await getUserInfo()
    console.log(33, token)
    console.log(34, token)
    const todos = await getTodos(uid, token)

    renderData(todos)
  } catch (error) {
    console.error(error)
    if (error.message === 'Задач нет') {
      showError('Задач нет')
    } else {
      showError('Не удалось получить данные')
    }
  } finally {
    hideLoader()
  }
}
