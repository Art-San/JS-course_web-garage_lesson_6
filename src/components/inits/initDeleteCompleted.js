import { deleteCompletedTodos } from '../../API/index.js'
import { deleteCompletedButton, container, loadData } from '../index.js'
import { showConfirmation, showError } from '../../utils/notification.js'

export function initDeleteCompleted() {
  deleteCompletedButton.addEventListener('click', async () => {
    console.log(34, 'click')
    const isConfirmed = await showConfirmation(
      'Все выполненные задачи будут удалены! Вы уверены?'
    )

    if (!isConfirmed) {
      return
    }

    try {
      await deleteCompletedTodos(container)
      await loadData()
    } catch (error) {
      console.error(error.message)
      showError('Не удалось удалить список задач')
    }
  })
}
