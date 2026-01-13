import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { recommendationsAPI } from '../../../api/recommendations';
import { authAPI } from '../../../api/auth';
import { ArrowRight, ArrowLeft, Loader2, ChevronRight } from 'lucide-react';

// Bac types (sections)
const bacTypes = [
  { value: 'Mathématiques', label: 'Mathématiques' },
  { value: 'Sciences Expérimentales', label: 'Sciences Expérimentales' },
  { value: 'Économie et Gestion', label: 'Économie et Gestion' },
  { value: 'Sciences Techniques', label: 'Sciences Techniques' },
  { value: 'Lettres', label: 'Lettres' },
  { value: 'Sport', label: 'Sport' },
  { value: "Sciences de l'Informatique", label: "Sciences de l'Informatique" }
];

// Governorates
const governorates = [
  "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba", "Kairouan", "Kasserine",
  "Kébili", "Le Kef", "Mahdia", "Manouba", "Médenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid",
  "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"
];

// Subjects by Bac type
const getSubjectsForBacType = (bacType: string) => {
  switch (bacType) {
    case 'Mathématiques':
      return [
        { id: 'Ar', label: 'Arabe', required: true },
        { id: 'F', label: 'Français', required: true },
        { id: 'Ang', label: 'Anglais', required: true },
        { id: 'Ph', label: 'Philosophie', required: true },
        { id: 'M', label: 'Mathématiques', required: true },
        { id: 'SP', label: 'Sciences Physiques', required: true },
        { id: 'Info', label: 'Informatique', required: true },
        { id: 'EP', label: 'Éducation Physique', required: true }
      ];
    case 'Sciences Expérimentales':
      return [
        { id: 'Ar', label: 'Arabe', required: true },
        { id: 'F', label: 'Français', required: true },
        { id: 'Ang', label: 'Anglais', required: true },
        { id: 'Ph', label: 'Philosophie', required: true },
        { id: 'M', label: 'Mathématiques', required: true },
        { id: 'SVT', label: 'Sciences de la Vie et de la Terre (SVT)', required: true },
        { id: 'SP', label: 'Sciences Physiques (Physique + Chimie)', required: true },
        { id: 'Info', label: 'Informatique', required: true },
        { id: 'EP', label: 'Éducation Physique', required: true }
      ];
    case 'Économie et Gestion':
      return [
        { id: 'Ar', label: 'Arabe', required: true },
        { id: 'F', label: 'Français', required: true },
        { id: 'Ang', label: 'Anglais', required: true },
        { id: 'Ph', label: 'Philosophie', required: true },
        { id: 'M', label: 'Mathématiques', required: true },
        { id: 'Eco', label: 'Économie', required: true },
        { id: 'Gest', label: 'Gestion', required: true },
        { id: 'Info', label: 'Informatique', required: true },
        { id: 'EP', label: 'Éducation Physique', required: true }
      ];
    case 'Sciences Techniques':
      return [
        { id: 'Ar', label: 'Arabe', required: true },
        { id: 'F', label: 'Français', required: true },
        { id: 'Ang', label: 'Anglais', required: true },
        { id: 'Ph', label: 'Philosophie', required: true },
        { id: 'M', label: 'Mathématiques', required: true },
        { id: 'SP', label: 'Sciences Physiques', required: true },
        { id: 'ST', label: 'Sciences Techniques', required: true },
        { id: 'Info', label: 'Informatique', required: true },
        { id: 'EP', label: 'Éducation Physique', required: true }
      ];
    case 'Lettres':
      return [
        { id: 'Ar', label: 'Arabe', required: true },
        { id: 'F', label: 'Français', required: true },
        { id: 'Ang', label: 'Anglais', required: true },
        { id: 'Ph', label: 'Philosophie', required: true },
        { id: 'Hist', label: 'Histoire', required: true },
        { id: 'Geo', label: 'Géographie', required: true },
        { id: 'Info', label: 'Informatique', required: true },
        { id: 'EP', label: 'Éducation Physique', required: true }
      ];
    case "Sciences de l'Informatique":
      return [
        { id: 'Ar', label: 'Arabe', required: true },
        { id: 'F', label: 'Français', required: true },
        { id: 'Ang', label: 'Anglais', required: true },
        { id: 'Ph', label: 'Philosophie', required: true },
        { id: 'M', label: 'Mathématiques', required: true },
        { id: 'Info', label: 'Informatique', required: true },
        { id: 'SP', label: 'Sciences Physiques', required: true },
        { id: 'EP', label: 'Éducation Physique', required: true }
      ];
    case 'Sport':
      return [
        { id: 'Ar', label: 'Arabe', required: true },
        { id: 'F', label: 'Français', required: true },
        { id: 'Ang', label: 'Anglais', required: true },
        { id: 'Ph', label: 'Philosophie', required: true },
        { id: 'EP', label: 'Éducation Physique', required: true }
        // Add more if needed
      ];
    default:
      return [];
  }
};

const RecommendationQuestionnaire = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    bac_type: '',
    governorate: '',
    preferences: '',
    grades: {} as Record<string, string>,
  });

  // Validation helpers
  const isStep1Valid =
    formData.bac_type &&
    formData.governorate &&
    getSubjectsForBacType(formData.bac_type).every(
      (subject) => !subject.required || !!formData.grades[subject.id]
    );

  const isStep2Valid = !!formData.preferences;

  // Grade change handler
  const handleGradeChange = (subjectId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      grades: { ...prev.grades, [subjectId]: value },
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get current user for studentId
      const user = await authAPI.getCurrentUser();
      const studentId = user.id;

      // Convert grades to numbers
      const bac_grades: Record<string, number> = {};
      Object.entries(formData.grades).forEach(([k, v]) => {
        bac_grades[k] = parseFloat(v) || 0;
      });

      // Prepare preferences
      const preferencesArray = formData.preferences
        .split(',')
        .map((p) => p.trim())
        .filter((p) => p);

      // Prepare request data
      const requestData = {
        bac_type: formData.bac_type,
        bac_grades,
        governorate: formData.governorate,
        preferences: preferencesArray,
        min_choices: 6,
      };

      // Use the recommendations API
      const recommendations = await recommendationsAPI.generate(studentId, requestData);

      // Navigate to results page with recommendations
      navigate('/dashboard/recommendation/results', { state: { results: recommendations } });
    } catch (error) {
      console.error('Failed to generate recommendations', error);
      alert('Une erreur est survenue lors de la génération des recommandations.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-8 pb-16 px-4">
      <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">
        Formulaire d'Orientation Universitaire Tunisienne
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Personal and Academic Information */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-3">
              Informations Personnelles et Académiques
            </h2>

            <div className="space-y-8">
              {/* Baccalaureate Type */}
              <div>
                <label className="block text-lg font-medium text-slate-800 mb-3">
                  Type de Baccalauréat
                </label>
                <select
                  required
                  className="w-full max-w-md rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg p-3 border"
                  value={formData.bac_type}
                  onChange={(e) => setFormData({ ...formData, bac_type: e.target.value })}
                >
                  <option value="">Sélectionnez le type</option>
                  {bacTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Governorate */}
              <div>
                <label className="block text-lg font-medium text-slate-800 mb-3">
                  Gouvernorat
                </label>
                <select
                  required
                  className="w-full max-w-md rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg p-3 border"
                  value={formData.governorate}
                  onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                >
                  <option value="">Sélectionnez votre gouvernorat</option>
                  {governorates.map((gov) => (
                    <option key={gov} value={gov}>
                      {gov}
                    </option>
                  ))}
                </select>
              </div>

              {/* Grades */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Notes du Baccalauréat (sur 20)
                </h3>
                <p className="text-slate-600 mb-6">Entrez vos notes:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {getSubjectsForBacType(formData.bac_type).map((subject) => (
                    <div key={subject.id} className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        {subject.label} {subject.required && '*'}
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="20"
                        required={subject.required}
                        placeholder="0.00"
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                        value={formData.grades[subject.id] || ''}
                        onChange={(e) => handleGradeChange(subject.id, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!isStep1Valid}
                className="inline-flex items-center px-8 py-3.5 border border-transparent text-base font-bold rounded-xl shadow-sm text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Suivant: Préférences
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Preferences */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-fade-in">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Retour à l'étape 1
            </button>

            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-3">
              Préférences d'Orientation
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-slate-800 mb-3">
                  Domaines d'étude préférés (optionnel)
                </label>
                <p className="text-slate-600 mb-4">
                  Indiquez vos domaines d'intérêt séparés par des virgules
                </p>
                <input
                  type="text"
                  placeholder="Ex: Informatique, Commerce, Médecine, Droit"
                  className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg p-3 border"
                  value={formData.preferences}
                  onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                />
                <small className="text-slate-500 mt-2 block">
                  Séparez par des virgules
                </small>
              </div>
            </div>

            <div className="mt-10 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center px-6 py-3 border border-slate-300 text-base font-medium rounded-xl shadow-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Retour
              </button>

              <button
                type="submit"
                disabled={isLoading || !isStep2Valid}
                className="inline-flex items-center px-8 py-3.5 border border-transparent text-base font-bold rounded-xl shadow-lg shadow-blue-900/20 text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Génération des recommandations...
                  </>
                ) : (
                  <>
                    Générer les Recommandations
                    <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default RecommendationQuestionnaire;