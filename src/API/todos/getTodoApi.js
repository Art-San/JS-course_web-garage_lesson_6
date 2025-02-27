import { host } from '../host.js'

export async function getTodos(uid, token) {
  try {
    const response = await fetch(`${host}/${uid}.json?auth=${token}`, {
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error(`Данные не получены. Статус: ${response.status}`)
    }

    const data = await response.json()
    console.log('Данные получены:', data)

    if (!data) {
      return []
    }

    const todosArray = Object.keys(data).map((key) => ({
      id: key,
      ...data[key]
    }))

    todosArray.sort((a, b) => a.order - b.order)

    return todosArray
  } catch (error) {
    console.error(`Ошибка получения данных:`, error.message)
    throw error
  }
}

// import { host } from '../host.js'

// export async function getTodos(uid, token) {
//   try {
//     const response = await fetch(`${host}/${uid}.json`, {
//       method: 'GET'
//     })

//     if (!response.ok) {
//       throw new Error(`Данные не получены. Статус: ${response.status}`)
//     }

//     const data = await response.json()

//     if (!data) {
//       throw new Error('Задач нет')
//     }
//     const todosArray = Object.keys(data).map((key) => {
//       return {
//         id: key,
//         ...data[key]
//       }
//     })

//     todosArray.sort((a, b) => a.order - b.order)
//     return todosArray
//   } catch (error) {
//     console.error(`Ошибка получения данных:`, error.message)
//     throw error
//   }
// }
