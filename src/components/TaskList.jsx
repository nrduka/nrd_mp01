import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'


export const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos'
export const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const FORCE = 'null'

export async function fetchTasks() {
  if (FORCE === 'slow') await new Promise((resolve) => setTimeout(resolve, 3000))
  if (FORCE === 'error') throw new Error('Forced error')

  const response = await fetch(TODOS_URL)
  if (!response.ok) throw new Error(`API responded ${response.status}`)

  const data = await response.json()
  return FORCE === 'empty' ? [] : data
}

export async function fetchUsers() {
  const response = await fetch(USERS_URL)
  if (!response.ok) throw new Error(`API responded ${response.status}`)

  const data = await response.json()
  return data
}
export function retryRequests(refetchTasks, refetchUsers) {
  refetchTasks()
  refetchUsers()
}

function TaskList({ taskChange, onTaskChange }) {
  const [searchTerm, setSearchTerm] = useState('')
  const {data: tasks = [],isLoading: tasksLoading,isError: tasksError,refetch: refetchTasks,} = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTasks,
    staleTime: 60000,
    retry: false,
  })

  const {data: users = [],isLoading: usersLoading,isError: usersError,refetch: refetchUsers,} = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 60000,
    retry: false,
  })



  if (tasksLoading || usersLoading) return <p role="status">Loading tasks...</p>
  if (tasksError || usersError) {
    return (
      <div role="alert">
        <p>Could not load tasks or users.</p>
        <button onClick={() => retryRequests(refetchTasks, refetchUsers)} className="task_list_retry">Retry</button>
      </div>
    )
  }

  if (tasks.length === 0) return <p>No tasks available.</p>

  const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <section>
      <div className="search_div">
        <label htmlFor="task_search" className="search_label">Search tasks</label>
        <input
          id="task_search"
          type="search"
          placeholder="Search by task title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search_input"
        />
      </div>
      <div className="task_list_div">
        
        <table className="task_table">
              <thead className="task_table_head">
              <tr>
                  <th scope="col" className="task_table_th">Action</th>
                  <th scope="col" className="task_table_th">Task</th>
                  <th scope="col" className="task_table_th">Assigned user</th>
                  <th scope="col" className="task_table_th">Status</th>
              </tr>
              </thead>

              <tbody className="task_table_body">
                {filteredTasks.length === 0 && (
                  <tr>
                    <td colSpan={4} className="task_table_data">
                      No tasks match your search.
                    </td>
                  </tr>
                )}
                
                {filteredTasks.map((task) => {
                  const completed = taskChange[task.id] ?? task.completed
                  const user = users.find((user) => user.id === task.userId)

                  return (
                  <tr key={task.id} className="task_table_row">
                      <td className="task_table_data">
                      <input className="task_checkbox" type="checkbox" checked={completed} onChange={() => onTaskChange(task.id, task.completed)}/>
                      </td>

                      <td className="task_table_data">
                      <Link to={`/tasks/${task.id}`} className="task_link">{task.title}</Link>
                      </td>

                      <td className="task_table_data">{user?.name ?? 'Unknown user'}</td>

                      <td className="task_table_data">
                      <span className={`task_status ${completed ? 'task_completed' : 'task_open'}`}>{completed ? 'Done' : 'Open'}</span>
                      </td>
                  </tr>
                  )
              })}
              </tbody>
          </table>
      </div>
      <p role="status" className="search_footnote">Showing {filteredTasks.length} of {tasks.length} tasks</p>
    </section>
  )
}

export default TaskList