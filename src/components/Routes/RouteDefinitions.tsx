import { Route, Routes } from "react-router-dom"

import LoginRegister from "../../pages/LoginRegister/LoginRegister";
import ProtectedRoute from "./ProtectedRoute";
import Assignment from "../../pages/Assignment/Assignment";
import Project from "../../pages/Project/Project";
import ProjectDetail from "../../pages/ProjectDetail/ProjectDetail";
type Props = {}

const RouteDefinitions = (props: Props) => {
    return (
        <Routes>
            <Route path="/" Component={LoginRegister} />
            <Route path="/gorevler" element={<ProtectedRoute><Assignment /></ProtectedRoute>} />
            <Route path="/projeler" element={<ProtectedRoute><Project /></ProtectedRoute>} />
            <Route path="/proje-detay/:projectId" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
             </Routes>
    )
}
export default RouteDefinitions;