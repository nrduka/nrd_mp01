import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchTasks, fetchUsers, retryRequests } from './TaskList'

function Stats({ taskChange }) {
  const {
    data: tasks = [],
    isLoading: tasksLoading,
    isError: tasksError,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTasks,
    staleTime: 60000,
    retry: false,
  })

  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 60000,
    retry: false,
  })


  if (tasksLoading || usersLoading) {
    return <p role="status">Loading statistics...</p>
  }

  if (tasksError || usersError) {
    return (
      <div role="alert" className="task_detail_error">
        <p>Could not load statistics.</p>
        <button onClick={() => retryRequests(refetchTasks, refetchUsers)}>Retry</button>
      </div>
    )
  }

  if (tasks.length === 0) {
    return <p>No tasks available.</p>
  }

  const completedTasks = tasks.filter((task) => {
    const completed = taskChange[task.id] ?? task.completed
    return completed
  })

  const total = tasks.length
  const done = completedTasks.length
  const open = total - done

  const userCounts = users.map((user) => ({
  ...user,
  count: completedTasks.filter(
    (task) => task.userId === user.id
  ).length,
}))

  const maxCount = Math.max(1,...userCounts.map((user) => user.count))

  return (
    <section className="stats_section">
      <h2 className="stats_h2">Task Summary</h2>

      <div className="stats_summary">
        <article className="stats_by_status">
          <h3 className="status_h3">Total</h3>
          <p className="status_p">{total}</p>
        </article>

        <article className="stats_by_status">
          <h3 className="status_h3">Done</h3>
          <p className="status_p">{done}</p>
        </article>

        <article className="stats_by_status">
          <h3 className="status_h3">Open</h3>
          <p className="status_p">{open}</p>
        </article>
      </div>

      <h2 className="stats_h2">Completed tasks per user</h2>

      <ul className="status_taskuser_ul space-y-5">
        {userCounts.map((user) => (
          <li key={user.id} className="status_taskuser_li">
            <span className="status_taskuser_span">
              {user.name}
            </span>

            <div className="min-w-0">
              <div aria-hidden="true" className="status_taskuser_count" style={{ width: `${(user.count / maxCount) * 100}%` }}/>
            </div>

            <span className="text-sm font-semibold">
              <span className="sr-only">Completed tasks: </span>{user.count}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Stats