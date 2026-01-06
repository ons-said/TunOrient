import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, FileText, X, Loader2 } from 'lucide-react';
import { circularsAPI, type Circular } from '../../api/circulars';

const MinistryCirculars = () => {
    const [circulars, setCirculars] = useState<Circular[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        academic_year: '',
        deadline_date: '',
        description: ''
    });

    const fetchCirculars = async () => {
        try {
            const data = await circularsAPI.getAll();
            setCirculars(data);
        } catch (error) {
            console.error("Failed to fetch circulars", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCirculars();
    }, []);

    const handleOpenModal = (circular?: Circular) => {
        if (circular) {
            setEditingId(circular.id);
            setFormData({
                title: circular.title,
                academic_year: circular.academic_year || '',
                deadline_date: circular.deadline_date || '',
                description: circular.description || ''
            });
        } else {
            setEditingId(null);
            setFormData({ title: '', academic_year: '', deadline_date: '', description: '' });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            // Clean up empty strings or dates if necessary
            // e.g. if deadline_date is empty string, send null if backend requires it, 
            // or keep as is if backend handles empty strings. 
            // For now, assuming standard payload.

            if (editingId) {
                await circularsAPI.update(editingId, {
                    ...formData,
                    publication_date: new Date().toISOString() // Or keep existing if backend handles it, but for now ensure it's present
                });
            } else {
                await circularsAPI.create({
                    ...formData,
                    publication_date: new Date().toISOString()
                });
            }
            fetchCirculars();
            setIsModalOpen(false);
        } catch (error: any) {
            console.error("Failed to save circular", error);
            // Show feedback to user
            const detail = error.response?.data?.detail;
            const errorMessage = typeof detail === 'object'
                ? JSON.stringify(detail, null, 2)
                : (detail || error.message || "Unknown error");

            alert(`Failed to save circular: ${errorMessage}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this circular?")) {
            try {
                await circularsAPI.delete(id);
                setCirculars(circulars.filter(c => c.id !== id));
            } catch (error) {
                console.error("Failed to delete circular", error);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Circulars Management</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="inline-flex items-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Circular
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Academic Year</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Published</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Deadline</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                                        Loading...
                                    </td>
                                </tr>
                            ) : circulars.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">No circulars found.</td>
                                </tr>
                            ) : (
                                circulars.map((circular) => (
                                    <tr key={circular.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-slate-900">{circular.title}</div>
                                                    <div className="text-sm text-slate-500 truncate max-w-xs">{circular.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{circular.academic_year || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{circular.publication_date || 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{circular.deadline_date || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleOpenModal(circular)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(circular.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-slate-900 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleSave}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-lg leading-6 font-medium text-slate-900">
                                            {editingId ? 'Edit Circular' : 'New Circular'}
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="text-slate-400 hover:text-slate-500"
                                        >
                                            <X className="h-6 w-6" />
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700">Title</label>
                                            <input
                                                type="text"
                                                required
                                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                                                value={formData.title}
                                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700">Academic Year</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. 2023-2024"
                                                    className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                                                    value={formData.academic_year}
                                                    onChange={e => setFormData({ ...formData, academic_year: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700">Deadline</label>
                                                <input
                                                    type="date"
                                                    className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                                                    value={formData.deadline_date}
                                                    onChange={e => setFormData({ ...formData, deadline_date: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700">Description</label>
                                            <textarea
                                                rows={3}
                                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                                                value={formData.description}
                                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm items-center disabled:opacity-50"
                                    >
                                        {isSaving && <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />}
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
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

export default MinistryCirculars;
