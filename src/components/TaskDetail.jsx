import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { TODOS_URL, USERS_URL } from './TaskList.jsx'

async function fetchTask(id) {
  const response = await fetch(`${TODOS_URL}/${id}`)
  if (response.status === 404) return null
  if (!response.ok) throw new Error(`API responded ${response.status}`)

  const task = await response.json()
  const userResponse = await fetch(`${USERS_URL}/${task.userId}`)
  if (!userResponse.ok) throw new Error(`API responded ${userResponse.status}`)

  const user = await userResponse.json()
  return { ...task, userName: user.name }
}

function TaskDetail({ taskChange, onTaskChange }) {
  const { id } = useParams()
  const { data: task, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => fetchTask(id),
    staleTime: 3000,
    retry: false,
  })

  const completed = task ? taskChange[task.id] ?? task.completed : false

  return (
    <section className="task_detail">
      <Link to="/" className="task_detail_back">Back to tasks</Link>

      {isLoading && (<p role="status" className="task_detail_loading"> Loading task...</p>)}
      {isError && (
        <div role="alert" className="task_detail_error">
          <p>Could not load the task details. Please try again.</p>
          <button onClick={() => refetch()} className="task_detail_retry">Retry</button>
        </div>
      )}

      {isSuccess && !task && (<p className="task_detail_empty">Task not found.</p>)}

      {task && (
        <article className="task_detail_card">
          <h2 className="task_detail_title">{task.title}</h2>

          <p className="task_detail_info">Task number: {task.id}</p>
          <p className="task_detail_info">Assigned user: {task.userName}</p>
          <p className="task_detail_info">Status:{' '}
            <span className={`task_status ${completed ? 'task_completed' : 'task_open'}`}>{completed ? 'Done' : 'Open'}</span>
          </p>
          <button onClick={() => onTaskChange(task.id, task.completed)}className="task_detail_toggle">Mark {completed ? 'open' : 'done'}</button>
        </article>
      )}
    </section>
  )
}

export default TaskDetail