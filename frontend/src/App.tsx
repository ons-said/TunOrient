import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Institutions from './pages/Institutions';
import Guide from './pages/Guide';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Programs from './pages/Programs';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import Circulars from './pages/dashboard/Circulars';
import RecommendationIntro from './pages/dashboard/recommendation/RecommendationIntro';
import RecommendationQuestionnaire from './pages/dashboard/recommendation/RecommendationQuestionnaire';
import RecommendationResults from './pages/dashboard/recommendation/RecommendationResults';
import ReorientationPrograms from './pages/dashboard/ReorientationPrograms';

import MinistryLayout from './layouts/MinistryLayout';
import MinistryDashboard from './pages/ministry/MinistryDashboard';
import MinistryCirculars from './pages/ministry/MinistryCirculars';
import MinistryUniversities from './pages/ministry/MinistryUniversities';
import MinistryInstitutions from './pages/ministry/MinistryInstitutions';
import MinistryPrograms from './pages/ministry/MinistryPrograms';
import MinistryStudents from './pages/ministry/MinistryStudents';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/institutions" element={<Institutions />} />
        <Route path="/guide" element={<Guide />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="circulars" element={<Circulars />} />
          <Route path="recommendation" element={<RecommendationIntro />} />
          <Route path="recommendation/quiz" element={<RecommendationQuestionnaire />} />
          <Route path="recommendation/results" element={<RecommendationResults />} />
          <Route path="reorientation-programs" element={<ReorientationPrograms />} />
        </Route>

        {/* Ministry/Admin Routes */}
        <Route path="/ministry" element={<MinistryLayout />}>
          <Route index element={<MinistryDashboard />} />
          <Route path="circulars" element={<MinistryCirculars />} />
          <Route path="institutions" element={<MinistryInstitutions />} />
          <Route path="universities" element={<MinistryUniversities />} />
          <Route path="programs" element={<MinistryPrograms />} />
          <Route path="students" element={<MinistryStudents />} />
        </Route>

        {/* Global Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
