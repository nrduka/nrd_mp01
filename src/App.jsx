import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard.jsx'
import TaskList from './components/TaskList.jsx'
import TaskDetail from './components/TaskDetail.jsx'
import Stats from './components/Stats.jsx'
import About from './components/About.jsx'
function App() {
  const [taskChange, setTaskChange] = useState({})

  function toggleTask(taskId, taskStatus) {
    setTaskChange((previous) => {
      const currentStatus = previous[taskId] ?? taskStatus

      return {
        ...previous,
        [taskId]: !currentStatus,
      }
    })
  }

return (
  <div className="app_div">
    <Dashboard />

    <main className="app_main">
      <Routes>
        <Route path="/" element={<TaskList taskChange={taskChange} onTaskChange={toggleTask}/>}/>
        <Route path="/tasks/:id" element={<TaskDetail taskChange={taskChange} onTaskChange={toggleTask}/>}/>
        <Route path="/stats" element={<Stats taskChange={taskChange} />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </main>
  </div>
)
}

export default App