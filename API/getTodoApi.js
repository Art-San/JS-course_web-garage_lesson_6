import { host } from '../script.js'

export async function getTodos() {
  try {
    const response = await fetch(host, {
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error(`Данные не получены. Статус: ${response.status}`)
    }

    const data = await response.json()
    console.log(12, data)
    if (data.length === 0) {
      throw new Error('Задач нет')
    }
    data.sort((a, b) => a.order - b.order)
    return data
  } catch (error) {
    console.error(`Ошибка получения данных:`, error.message)
    throw error
  }
}
