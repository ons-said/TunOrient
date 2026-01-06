import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { usersAPI } from '../../api/users';

// Proper interface matching backend response
interface StudentProfile {
    id: number;
    user_id: number;
    created_at: string;
    user?: {
        email: string;
        role: string;
    }
}

const MinistryStudents = () => {
    const [students, setStudents] = useState<StudentProfile[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const load = async () => {
            try {
                const data = await usersAPI.getAllStudents();
                setStudents(data);
            } catch (e: any) {
                console.error(e);
                // Alert the user if it's an auth error
                if (e.response?.status === 401) {
                    alert("Authentication failed: session invalid or expired. Please duplicate tab and login again.");
                } else {
                    alert(`Failed to load students: ${e.response?.data?.detail || e.message}`);
                }
            }
        };
        load();
    }, []);

    const filteredStudents = students.filter(s =>
        (s.user?.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.id && s.id.toString().includes(searchTerm))
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Student Registry</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search students..."
                        className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg border border-slate-200 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Joined</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {filteredStudents.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">No students found.</td></tr>
                        ) : (
                            filteredStudents.map(student => (
                                <tr key={student.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">#{student.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{student.user?.email || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 capitalize">{student.user?.role || 'Student'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        {student.created_at ? new Date(student.created_at).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MinistryStudents;
