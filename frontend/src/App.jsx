import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import PublicLayout from "./components/PublicLayout";
import AdminAnalytics from "./pages/AdminAnalytics";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import CitizenDashboard from "./pages/CitizenDashboard";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Issues from "./pages/Issues";
import Login from "./pages/Login";
import About from "./pages/About";
import ReportIssue from "./pages/ReportIssue";
import TrackIssue from "./pages/TrackIssue";
import Departments from "./pages/Departments";
import IssueDetails from "./pages/IssueDetails";
import Analytics from "./pages/Analytics";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/track" element={<TrackIssue />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/issues/:id" element={<IssueDetails />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/auth" element={<Login />} />
      </Route>
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/citizen" element={<CitizenDashboard />} />
        <Route path="/authority" element={<AuthorityDashboard />} />
        <Route path="/admin" element={<AdminAnalytics />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
