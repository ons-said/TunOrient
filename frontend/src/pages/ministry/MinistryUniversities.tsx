import { useState, useEffect } from 'react';
import { School, Plus, MapPin, Globe } from 'lucide-react';
import { institutionsAPI, type University } from '../../api/institutions';

const MinistryUniversities = () => {
    const [universities, setUniversities] = useState<University[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', region: '' });

    const fetchUniversities = async () => {
        try {
            // Safe fetch
            const data = await institutionsAPI.getAllUniversities().catch((e) => {
                console.error("Fetch universities failed", e);
                return [];
            });
            setUniversities(Array.isArray(data) ? data : []);
        } catch (e) { console.error(e); }
        finally { setIsLoading(false); }
    };

    useEffect(() => {
        fetchUniversities();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await institutionsAPI.createUniversity(formData);
            setIsModalOpen(false);
            setFormData({ name: '', region: '' });
            fetchUniversities();
        } catch (error) {
            console.error("Failed to create university", error);
            alert("Failed to create university. Please check console.");
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center text-slate-500">Loading universities...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Universities Management</h1>
                    <p className="text-slate-500 text-sm">Manage higher education establishments</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add University
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {universities.map(uni => (
                    <div key={uni.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-violet-50 text-violet-600 rounded-lg">
                                <School className="h-6 w-6" />
                            </div>
                            <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{uni.region}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{uni.name}</h3>
                        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{uni.description || "No description provided."}</p>

                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex space-x-2">
                                <button className="text-slate-400 hover:text-blue-600 p-1"><Globe className="h-4 w-4" /></button>
                                <button className="text-slate-400 hover:text-red-600 p-1"><MapPin className="h-4 w-4" /></button>
                            </div>
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Manage Institutions &rarr;</button>
                        </div>
                    </div>
                ))}
                {/* Empty State / Add New Placeholder */}
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer group"
                >
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-blue-200">
                        <Plus className="h-6 w-6 text-slate-400 group-hover:text-blue-700" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">Add New University</h3>
                    <p className="text-sm text-slate-500 mt-1">Register a new university entity</p>
                </div>
            </div>

            {/* Add University Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-slate-900 opacity-75"></div>
                        </div>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleSave}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium leading-6 text-slate-900 mb-4">Add University</h3>
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
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700">Region</label>
                                            <input
                                                type="text"
                                                required
                                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                                                value={formData.region}
                                                onChange={e => setFormData({ ...formData, region: e.target.value })}
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

export default MinistryUniversities;
