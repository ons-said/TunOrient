import { Users, Shield, GraduationCap } from 'lucide-react';

const AdminDashboard = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">System Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-full text-blue-600 mr-4">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Users</p>
                            <h3 className="text-2xl font-bold text-slate-900">Active</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-full text-purple-600 mr-4">
                            <Shield className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Ministry Accounts</p>
                            <h3 className="text-2xl font-bold text-slate-900">Managed</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center">
                        <div className="p-3 bg-emerald-100 rounded-full text-emerald-600 mr-4">
                            <GraduationCap className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Students</p>
                            <h3 className="text-2xl font-bold text-slate-900">Registered</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
                <div className="flex space-x-4">
                    <p className="text-slate-500">Go to "User Management" to add new Ministry or Student accounts.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
