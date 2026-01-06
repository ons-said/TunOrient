import { useState, useEffect } from 'react';
import { School, Plus, MapPin } from 'lucide-react';
import { institutionsAPI } from '../../api/institutions';
import type { Institution } from '../../api/institutions';

const MinistryInstitutions = () => {
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        university_id: 1, // Defaulting to 1 for now, ideally a select dropdown
    });

    const fetchInstitutions = async () => {
        try {
            const data = await institutionsAPI.getAllInstitutions().catch((e) => {
                console.error("Fetch institutions failed", e);
                return [];
            });
            setInstitutions(Array.isArray(data) ? data : []);
        } catch (e) { console.error(e); }
        finally { setIsLoading(false); }
    };

    useEffect(() => {
        fetchInstitutions();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await institutionsAPI.createInstitution(formData);
            setIsModalOpen(false);
            setFormData({ name: '', university_id: 1 });
            fetchInstitutions();
        } catch (error) {
            console.error("Failed to create institution", error);
            alert("Failed to create institution.");
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center text-slate-500">Loading institutions...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Institutions Management</h1>
                    <p className="text-slate-500 text-sm">Manage individual colleges and institutes</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Institution
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {institutions.map(inst => (
                    <div key={inst.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                                <School className="h-6 w-6" />
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{inst.name}</h3>
                        {inst.university?.name && (
                            <p className="text-xs text-blue-600 font-medium mb-3">{inst.university.name}</p>
                        )}
                        {inst.university?.region && (
                            <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {inst.university.region}
                            </p>
                        )}
                    </div>
                ))}
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer group"
                >
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-blue-200">
                        <Plus className="h-6 w-6 text-slate-400 group-hover:text-blue-700" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">Add New Institution</h3>
                </div>
            </div>

            {/* Add Institution Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-slate-900 opacity-75"></div>
                        </div>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleSave}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium leading-6 text-slate-900 mb-4">Add Institution</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700">Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        {/* Address removed as backend doesn't support it in create schema yet */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700">University ID (Manual for now)</label>
                                            <input
                                                type="number"
                                                required
                                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                                                value={formData.university_id}
                                                onChange={e => setFormData({ ...formData, university_id: Number(e.target.value) })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-800 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                                        Save
                                    </button>
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MinistryInstitutions;
