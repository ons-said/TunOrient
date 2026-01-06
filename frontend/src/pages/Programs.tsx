import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { programsAPI, type Program } from '../api/programs';
import {
    Search,
    MapPin,
    BookOpen,
    School,
    Filter,
    ChevronRight,
    GraduationCap,
    Calculator,
    Info
} from 'lucide-react';

// Mock Data based on "Guide de l'orientation universitaire 2025"
const MOCK_PROGRAMS: Program[] = [
    {
        id: 1,
        code: '10523',
        name: 'Licence en Sciences de l\'Informatique',
        institution: 'Institut Supérieur des Arts du Multimédia de la Manouba (ISAMM)',
        university: 'Université de la Manouba',
        city: 'Manouba',
        domain: 'Sciences Exactes et Technologies',
        type: 'Licence',
        parcours: 'Informatique et Multimédia, Big-Data',
        formula: 'FG + [(M+N.Sc.Inf)/2]',
        conditions: 'Maths et Info exigées',
        requiresTest: false,
        scores: [
            { section: 'Mathématiques', score2024: 153.45 },
            { section: 'Sciences Expérimentales', score2024: 148.20 },
            { section: 'Sciences Informatiques', score2024: 155.80 },
            { section: 'Technique', score2024: 142.10 }
        ]
    },
    {
        id: 2,
        code: '11523',
        name: 'Licence en Sciences de l\'Informatique',
        institution: 'Institut Supérieur d\'Informatique (ISI)',
        university: 'Université de Tunis El Manar',
        city: 'Ariana',
        domain: 'Sciences Exactes et Technologies',
        type: 'Licence',
        parcours: 'Génie Logiciel, Systèmes d’Information',
        formula: 'FG + [(M+N.Sc.Inf)/2]',
        conditions: 'Maths et Info exigées',
        requiresTest: false,
        scores: [
            { section: 'Mathématiques', score2024: 162.15 },
            { section: 'Sciences Informatiques', score2024: 168.90 },
            { section: 'Sciences Expérimentales', score2024: 158.40 },
            { section: 'Technique', score2024: 151.25 }
        ]
    },
    {
        id: 3,
        code: '10101',
        name: 'Licence en Arabe',
        institution: 'Faculté des Sciences Humaines et Sociales de Tunis (9 avril)',
        university: 'Université de Tunis',
        city: 'Tunis',
        domain: 'Lettres et Langues',
        type: 'Licence',
        parcours: 'Langue, Lettres et Civilisation',
        formula: 'FG + A',
        conditions: 'Arabe exigée',
        requiresTest: false,
        scores: [
            { section: 'Lettres', score2024: 118.50 },
            { section: 'Economie et Gestion', score2024: 105.20 },
            { section: 'Autres', score2024: 98.40 }
        ]
    },
    {
        id: 4,
        code: '11102',
        name: 'Licence en Anglais',
        institution: 'Faculté des Lettres, des Arts et des Humanités',
        university: 'Université de la Manouba',
        city: 'Manouba',
        domain: 'Lettres et Langues',
        type: 'Licence',
        parcours: 'Langue, Lettres et Civilisation',
        formula: 'FG + Ang',
        conditions: 'Anglais exigée',
        requiresTest: false,
        scores: [
            { section: 'Lettres', score2024: 125.75 },
            { section: 'Economie et Gestion', score2024: 132.80 },
            { section: 'Sciences Expérimentales', score2024: 140.10 }
        ]
    },
    {
        id: 5,
        code: '10312',
        name: 'Licence en Sciences Economiques',
        institution: 'Institut Supérieur de Gestion de Tunis (ISG)',
        university: 'Université de Tunis',
        city: 'Tunis',
        domain: 'Sciences Economiques et Gestion',
        type: 'Licence',
        parcours: 'Ingénierie Eco., Business Economics',
        formula: 'FG + [(M+Sc.Eco.S)/2]',
        conditions: 'Maths et Eco exigées (M >= 10)',
        requiresTest: false,
        scores: [
            { section: 'Economie et Gestion', score2024: 145.60 },
            { section: 'Mathématiques', score2024: 138.90 },
            { section: 'Sciences Expérimentales', score2024: 135.20 }
        ]
    },
    {
        id: 6,
        code: '10207',
        name: 'Licence en Design Espace',
        institution: 'Institut Supérieur des Beaux-Arts de Tunis',
        university: 'Université de Tunis',
        city: 'Tunis',
        domain: 'Arts et Métiers',
        type: 'Licence',
        parcours: 'Architecture d\'Intérieur, Scénographie',
        formula: 'FG + PH',
        conditions: '-',
        requiresTest: true,
        scores: [
            { section: 'Lettres', score2024: 115.42 },
            { section: 'Arts', score2024: 142.15 },
            { section: 'Autres', score2024: 128.90 }
        ]
    },
    {
        id: 7,
        code: '10568',
        name: 'Licence en Génie Civil',
        institution: 'Institut Supérieur des Technologies de l’Environnement (ISTEUB)',
        university: 'Université de Carthage',
        city: 'Tunis',
        domain: 'Sciences Exactes et Technologies',
        type: 'Licence',
        parcours: 'Bâtiment, Travaux Publics',
        formula: 'FG + PC ou FG + N.Sc.inf',
        conditions: '-',
        requiresTest: false,
        scores: [
            { section: 'Technique', score2024: 148.60 },
            { section: 'Mathématiques', score2024: 139.80 },
            { section: 'Sciences Expérimentales', score2024: 135.50 }
        ]
    },
    {
        id: 8,
        code: '10301',
        name: 'Licence en Droit',
        institution: 'Faculté de Droit et des Sciences Politiques de Tunis',
        university: 'Université de Tunis El Manar',
        city: 'Tunis',
        domain: 'Sciences Juridiques',
        type: 'Licence',
        parcours: 'Droit Privé, Droit Public',
        formula: 'FG + [(F+ A)/2]',
        conditions: 'Arabe non exigée',
        requiresTest: false,
        scores: [
            { section: 'Lettres', score2024: 135.40 },
            { section: 'Economie et Gestion', score2024: 142.20 },
            { section: 'Autres', score2024: 154.30 }
        ]
    },
    {
        id: 9,
        code: '40502',
        name: 'Licence en Physique-Chimie',
        institution: 'Faculté des Sciences de Sfax',
        university: 'Université de Sfax',
        city: 'Sfax',
        domain: 'Sciences Exactes et Technologies',
        type: 'Licence',
        parcours: 'Physique Chimie',
        formula: 'FG + PC',
        conditions: 'PC Exigée',
        requiresTest: false,
        scores: [
            { section: 'Sciences Expérimentales', score2024: 128.40 },
            { section: 'Mathématiques', score2024: 115.20 }
        ]
    },
    {
        id: 10,
        code: '10700',
        name: 'Doctorat en Médecine',
        institution: 'Faculté de Médecine de Tunis',
        university: 'Université de Tunis El Manar',
        city: 'Tunis',
        domain: 'Sciences de la Santé',
        type: 'Doctorat',
        parcours: 'Médecine Générale',
        formula: 'FG',
        conditions: 'Rang au concours',
        requiresTest: false,
        scores: [
            { section: 'Mathématiques', score2024: 178.05 },
            { section: 'Sciences Expérimentales', score2024: 177.20 },
            { section: 'Technique', score2024: 188.40 }
        ]
    },
    {
        id: 11,
        code: '10203',
        name: 'Architecture',
        institution: 'Ecole Nationale d\'Architecture et d\'Urbanisme (ENAU)',
        university: 'Université de Carthage',
        city: 'Tunis',
        domain: 'Architecture',
        type: 'Diplôme National',
        parcours: 'Architecture',
        formula: 'FG + M',
        conditions: '-',
        requiresTest: true,
        scores: [
            { section: 'Mathématiques', score2024: 155.16 },
            { section: 'Sciences Expérimentales', score2024: 148.64 },
            { section: 'Technique', score2024: 172.85 }
        ]
    },
    {
        id: 12,
        code: '10450',
        name: 'Licence en Sciences et Techniques des Activités Physiques et Sportives',
        institution: 'Institut Supérieur de Sport et de l\'Education Physique de Ksar-Saïd',
        university: 'Université de la Manouba',
        city: 'Manouba',
        domain: 'Sport',
        type: 'Licence',
        parcours: 'Entrainement Sportif',
        formula: 'FG + [(SVT+ EPS)/2]',
        conditions: 'Test Médical + Sport',
        requiresTest: true,
        scores: [
            { section: 'Mathématiques', score2024: 121.50 },
            { section: 'Sciences Expérimentales', score2024: 125.40 },
            { section: 'Sport', score2024: 145.80 }
        ]
    }
];

const Programs = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('All');
    const [selectedCity, setSelectedCity] = useState('All');
    const [programs, setPrograms] = useState<Program[]>(MOCK_PROGRAMS);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const data = await programsAPI.getAll();
                // If we get data, use it. Otherwise fall back to mock (or merge if logic dictates)
                if (data && data.length > 0) {
                    setPrograms(data);
                }
            } catch (error) {
                console.error('Failed to fetch programs, using mock data', error);
                // Keep MOCK_PROGRAMS if fetch fails
            }
        };

        fetchPrograms();
    }, []);

    // Extract unique domains and cities for filters from the ACTIVE programs list
    const domains = ['All', ...new Set(programs.map(p => p.domain))];
    const cities = ['All', ...new Set(programs.map(p => p.city))];

    const filteredPrograms = useMemo(() => {
        return programs.filter(program => {
            const matchesSearch =
                program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                program.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
                program.code.includes(searchQuery);

            const matchesDomain = selectedDomain === 'All' || program.domain === selectedDomain;
            const matchesCity = selectedCity === 'All' || program.city === selectedCity;

            // Only filter if not "All"
            return matchesSearch && matchesDomain && matchesCity;
        });
    }, [searchQuery, selectedDomain, selectedCity, programs]);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <Link to="/" className="flex items-center space-x-3 cursor-pointer group">
                            <div className="p-2 bg-blue-900 rounded-lg shadow-sm">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-slate-900 tracking-tight font-serif">
                                TunOrient
                            </span>
                        </Link>
                        <div className="flex items-center space-x-6">
                            <Link to="/" className="text-slate-600 hover:text-blue-900 font-medium">Home</Link>
                            <Link to="/guide" className="text-slate-600 hover:text-blue-900 font-medium">Guide</Link>
                            <div className="h-6 w-px bg-slate-200"></div>
                            <Link to="/login" className="text-slate-600 hover:text-blue-900 font-medium">Login</Link>
                            <Link to="/register" className="bg-blue-900 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-800 transition-colors">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="pt-28 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-slate-900 font-serif mb-4">
                            Guide de l'Orientation 2025
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Consultez les scores, formules et conditions pour les établissements tunisiens.
                        </p>
                    </div>

                    {/* Search & Filters */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-10 sticky top-24 z-40">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                            <div className="md:col-span-6 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Rechercher par nom, établissement ou code (ex: 11523)"
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="md:col-span-3 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <BookOpen className="h-5 w-5 text-slate-400" />
                                </div>
                                <select
                                    className="block w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                    value={selectedDomain}
                                    onChange={(e) => setSelectedDomain(e.target.value)}
                                >
                                    {domains.map(domain => (
                                        <option key={domain} value={domain}>{domain}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <Filter className="h-4 w-4 text-slate-400" />
                                </div>
                            </div>

                            <div className="md:col-span-3 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-slate-400" />
                                </div>
                                <select
                                    className="block w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                >
                                    {cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <Filter className="h-4 w-4 text-slate-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPrograms.length > 0 ? (
                            filteredPrograms.map(program => (
                                <div key={program.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
                                    {/* Requires Test Badge */}
                                    {program.requiresTest && (
                                        <div className="absolute top-0 right-0 bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm z-10">
                                            Filière à Test
                                        </div>
                                    )}

                                    <div className="p-6 flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                {program.type}
                                            </span>
                                            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded font-bold border border-slate-200">
                                                Code: {program.code}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif group-hover:text-blue-900 transition-colors leading-tight">
                                            {program.name}
                                        </h3>

                                        <div className="flex items-start text-sm text-slate-600 mb-4">
                                            <School className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
                                            <span className="line-clamp-2">{program.institution}</span>
                                        </div>

                                        <div className="flex items-center text-sm text-slate-500 mb-4">
                                            <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                                            <span>{program.city} • {program.university}</span>
                                        </div>

                                        {/* Formula & Conditions */}
                                        <div className="mb-4 bg-amber-50 rounded-lg p-3 border border-amber-100 text-xs">
                                            <div className="flex items-start mb-1">
                                                <Calculator className="h-3.5 w-3.5 mr-1.5 text-amber-600 mt-0.5" />
                                                <span className="text-amber-900 font-medium">Score: {program.formula}</span>
                                            </div>
                                            {program.conditions !== '-' && (
                                                <div className="flex items-start">
                                                    <Info className="h-3.5 w-3.5 mr-1.5 text-amber-600 mt-0.5" />
                                                    <span className="text-amber-800">{program.conditions}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Compact Scores Preview */}
                                        <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 mb-2">
                                            <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Scores Définifs (2024)</p>
                                            <div className="space-y-1">
                                                {program.scores.slice(0, 3).map((s, idx) => (
                                                    <div key={idx} className="flex justify-between text-sm">
                                                        <span className="text-slate-600 truncate max-w-[75%]">{s.section}</span>
                                                        <span className="font-bold text-blue-900">{s.score2024.toFixed(2)}</span>
                                                    </div>
                                                ))}
                                                {program.scores.length > 3 && (
                                                    <div className="text-xs text-center text-slate-400 pt-1">
                                                        + {program.scores.length - 3} autres
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-xl flex justify-between items-center group-hover:bg-blue-50/50 transition-colors">
                                        <span className="text-xs font-medium text-slate-500 truncate max-w-[60%]" title={program.domain}>{program.domain}</span>
                                        <button className="text-blue-900 font-semibold text-sm flex items-center hover:underline">
                                            Détails
                                            <ChevronRight className="h-4 w-4 ml-1" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <div className="inline-flex items-center justify-center p-4 bg-slate-100 rounded-full mb-4">
                                    <Search className="h-8 w-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-medium text-slate-900">Aucun programme trouvé</h3>
                                <p className="text-slate-500 mt-1">Essayez d'ajuster votre recherche ou vos filtres.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Programs;
