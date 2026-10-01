import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProjectsPage from './pages/ProjectsPage'
import TasksPage from './pages/TasksPage'

function ProtectedRoute({ children }) { return useAuth().user ? children : <Navigate to="/login" replace /> }
function PublicRoute({ children }) { return useAuth().user ? <Navigate to="/projects" replace /> : children }

export default function App() {
  return <Routes>
    <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
    <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
    <Route path="/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
    <Route path="/projects/:projectId/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/projects" replace />} />
  </Routes>
}
