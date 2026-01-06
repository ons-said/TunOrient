import { useState, useEffect } from 'react';
import { BookOpen, Search, Loader2, Plus } from 'lucide-react';
import { programsAPI } from '../../api/programs';
import type { Program } from '../../api/programs';

const MinistryPrograms = () => {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        institution_id: 1, // Default, hardcoded for now
        code: '',
        type: 'Licence', // Default
        domain: ''
    });

    const fetchPrograms = async () => {
        try {
            const data = await programsAPI.getAll().catch(e => {
                console.error("Fetch programs failed", e);
                return [];
            });
            setPrograms(Array.isArray(data) ? data : []);
        } catch (err) { console.error(err); }
        finally { setIsLoading(false); }
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Note: This API call assumes a .create() method exists and matches backend
            await programsAPI.create(formData);
            setIsModalOpen(false);
            setFormData({ name: '', institution_id: 1, code: '', type: 'Licence', domain: '' });
            fetchPrograms();
        } catch (error) {
            console.error("Failed to create program", error);
            alert("Failed to create program.");
        }
    };

    const filteredPrograms = programs.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Programs Catalog Management</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search programs..."
                            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Add Program
                    </button>
                </div>
            </div>

            {/* Add Program Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-slate-900 opacity-75"></div>
                        </div>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleSave}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium leading-6 text-slate-900 mb-4">Add Program</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700">Code</label>
                                            <input type="text" required className="mt-1 block w-full p-2 border border-slate-300 rounded" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700">Name</label>
                                            <input type="text" required className="mt-1 block w-full p-2 border border-slate-300 rounded" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700">Type (Degree)</label>
                                            <select className="mt-1 block w-full p-2 border border-slate-300 rounded" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                                <option value="Licence">Licence</option>
                                                <option value="Master">Master</option>
                                                <option value="Engineering">Engineering</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700">Institution ID</label>
                                            <input type="number" required className="mt-1 block w-full p-2 border border-slate-300 rounded" value={formData.institution_id} onChange={e => setFormData({ ...formData, institution_id: Number(e.target.value) })} />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-800 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">Save</button>
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}


            <div className="bg-white shadow-sm rounded-lg border border-slate-200 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Program</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">University</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Score (2024)</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {isLoading ? (
                            <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-500"><Loader2 className="animate-spin h-5 w-5 mx-auto" /></td></tr>
                        ) : filteredPrograms.length === 0 ? (
                            <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">No programs found.</td></tr>
                        ) : (
                            filteredPrograms.map((program) => (
                                <tr key={program.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                                                <BookOpen className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-900">{program.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{program.university}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{program.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-700">
                                        {program.scores && program.scores.length > 0
                                            ? program.scores.map(s => s.score2024).join(', ')
                                            : '-'}
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

export default MinistryPrograms;
