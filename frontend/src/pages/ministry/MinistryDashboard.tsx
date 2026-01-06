import { useState, useEffect } from 'react';
import { Users, FileText, School, BookOpen, TrendingUp, AlertCircle } from 'lucide-react';
import { circularsAPI } from '../../api/circulars';
import { programsAPI } from '../../api/programs';
import { institutionsAPI } from '../../api/institutions';
import { usersAPI } from '../../api/users';

const MinistryDashboard = () => {
    const [stats, setStats] = useState({
        students: 0,
        circulars: 0,
        institutions: 0,
        programs: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Parallel fetch with safe fallbacks
                const students = await usersAPI.getAllStudents().catch(err => {
                    console.error("Failed to fetch students:", err);
                    return [];
                });
                const circulars = await circularsAPI.getAll().catch(err => {
                    console.error("Failed to fetch circulars:", err);
                    return [];
                });
                const institutions = await institutionsAPI.getAllInstitutions().catch(err => {
                    console.error("Failed to fetch institutions:", err);
                    return [];
                });
                const programs = await programsAPI.getAll().catch(err => {
                    console.error("Failed to fetch programs:", err);
                    return [];
                });

                setStats({
                    students: Array.isArray(students) ? students.length : 0,
                    circulars: Array.isArray(circulars) ? circulars.length : 0,
                    institutions: Array.isArray(institutions) ? institutions.length : 0,
                    programs: Array.isArray(programs) ? programs.length : 0
                });
            } catch (error) {
                console.error("Critical dashboard stats failure:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const kpiCards = [
        { label: 'Total Students', value: stats.students, icon: Users, color: 'bg-blue-600' },
        { label: 'Published Circulars', value: stats.circulars, icon: FileText, color: 'bg-emerald-600' },
        { label: 'Active Institutions', value: stats.institutions, icon: School, color: 'bg-violet-600' },
        { label: 'Programs offered', value: stats.programs, icon: BookOpen, color: 'bg-amber-600' },
    ];

    if (isLoading) {
        return <div className="p-8 text-center text-slate-500">Loading dashboard...</div>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Ministry Overview</h1>
                <p className="text-slate-500">Welcome to the central administration dashboard.</p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiCards.map((card, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1">{card.label}</p>
                                <h3 className="text-2xl font-bold text-slate-900">{card.value}</h3>
                            </div>
                            <div className={`p-3 rounded-lg ${card.color} text-white shadow-lg shadow-${card.color.replace('bg-', '')}/30`}>
                                <card.icon className="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions / Activity Feed Placeholder */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-slate-400" />
                        System Status
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-3 animate-pulse"></div>
                                <span className="text-sm font-medium text-green-800">All Systems Operational</span>
                            </div>
                            <span className="text-xs text-green-600">Updated now</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <div className="flex items-center">
                                <AlertCircle className="h-4 w-4 mr-3 text-blue-500" />
                                <span className="text-sm font-medium text-blue-800">Orientation Round 1</span>
                            </div>
                            <span className="text-xs font-bold bg-blue-200 text-blue-800 px-2 py-1 rounded">Active</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
                    <div className="text-sm text-slate-500 text-center py-8">
                        No recent system logs available.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MinistryDashboard;
