import { host } from '../host.js'

export async function updateTaskOrderOnServer(taskId, taskOrder) {
  try {
    const response = await fetch(`${host}/${taskId}.json`, {
      // method: 'PUT', // для mockapi.io
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ order: taskOrder })
    })

    if (!response.ok) {
      throw new Error(`Не удалось обновить порядок. Статус: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error(`Ошибка обновления порядка задач:`, error.message)
    throw error
  }
}
