import { BookOpen } from 'lucide-react';

const Guide = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="text-center">
                <BookOpen className="h-12 w-12 text-blue-900 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-slate-900">Orientation Guide</h1>
                <p className="text-slate-600 mt-2">Content coming soon...</p>
            </div>
        </div>
    );
};

export default Guide;
