import { useState, type FormEvent } from 'react';
import { ArrowRight, Loader2, ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { recommendationsAPI } from '../../../api/recommendations';
import { authAPI } from '../../../api/auth';

interface BacGrades {
  MG: number;
  A: number;
  Ang: number;
  F: number;
  M: number;
  SP: number;
  SVT: number;
  PH: number;
  HG: number;
  Ec: number;
  Ge: number;
  Algo: number;
  STI: number;
  Sport: number;
}

interface RecommendationRequest {
  bac_type: string;
  bac_grades: BacGrades;
  governorate: string;
  preferences: string[];
  min_choices: number;
}

const RecommendationQuestionnaire = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);

  const [formData, setFormData] = useState({
    student_id: '',
    bac_type: '',
    governorate: '',
    preferences: '',
    grades: {
      MG: '',
      A: '',
      Ang: '',
      F: '',
      M: '',
      SP: '',
      SVT: '',
      PH: '',
      HG: '',
      Ec: '',
      Ge: '',
      Algo: '',
      STI: '',
      Sport: '',
    } as Record<string, string>,
  });

  const bacTypes = [
    { value: '', label: 'Choisir le type' },
    { value: 'Lettres', label: 'Lettres' },
    { value: 'Mathématiques', label: 'Mathématiques' },
    { value: 'Sciences Expérimentales', label: 'Sciences Expérimentales' },
    { value: 'Économiques et Gestion', label: 'Économiques et Gestion' },
    { value: 'Techniques', label: 'Techniques' },
    { value: 'Informatique', label: 'Informatique' },
    { value: 'Sport', label: 'Sport' },
  ];

  const governorates = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Sousse', 'Sfax', 'Monastir', 'Nabeul',
    'Bizerte', 'Gabès', 'Kairouan', 'Gafsa', 'Medenine', 'Kasserine', 'Sidi Bouzid',
    'Mahdia', 'Jendouba', 'Kebili', 'Siliana', 'Tataouine', 'Tozeur', 'Zaghouan', 'Béja'
  ];

  const getSubjectsForBacType = (type: string) => {
    const base = [
      { id: 'MG', label: 'Moyenne Générale', required: true },
      { id: 'Ang', label: 'Anglais', required: true },
      { id: 'F', label: 'Français', required: true },
    ];

    switch (type) {
      case 'Lettres':
        return [...base,
        { id: 'A', label: 'Arabe', required: true },
        { id: 'PH', label: 'Philosophie', required: true },
        { id: 'HG', label: 'Histoire-Géo', required: true }
        ];
      case 'Mathématiques':
        return [...base,
        { id: 'M', label: 'Mathématiques', required: true },
        { id: 'SP', label: 'Sciences Physiques', required: true },
        { id: 'SVT', label: 'SVT', required: true }
        ];
      case 'Sciences Expérimentales':
        return [...base,
        { id: 'M', label: 'Mathématiques', required: true },
        { id: 'SP', label: 'Sciences Physiques', required: true },
        { id: 'SVT', label: 'SVT', required: true }
        ];
      case 'Économiques et Gestion':
        return [...base,
        { id: 'Ec', label: 'Économie', required: true },
        { id: 'Ge', label: 'Gestion', required: true },
        { id: 'M', label: 'Mathématiques', required: true },
        { id: 'HG', label: 'Histoire-Géo', required: true }
        ];
      case 'Techniques':
        return [...base,
        { id: 'STI', label: 'Technique', required: true },
        { id: 'SP', label: 'Sciences Physiques', required: true },
        { id: 'M', label: 'Mathématiques', required: true }
        ];
      case 'Informatique':
        return [...base,
        { id: 'Algo', label: 'Algorithmique', required: true },
        { id: 'M', label: 'Mathématiques', required: true },
        { id: 'SP', label: 'Sciences Physiques', required: true }
        ];
      case 'Sport':
        return [...base,
        { id: 'SVT', label: 'Biologie (SVT)', required: true },
        { id: 'SP', label: 'Sciences Physiques', required: true },
        { id: 'M', label: 'Mathématiques', required: true },
        { id: 'Sport', label: 'Education Physique', required: true }
        ];
      default:
        // Show generic science subjects if nothing selected
        return [...base,
        { id: 'M', label: 'Mathématiques', required: false },
        { id: 'SP', label: 'Sciences Physiques', required: false }
        ];
    }
  };

  const handleGradeChange = (subject: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      grades: {
        ...prev.grades,
        [subject]: value
      }
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Convert grades to numbers
      const grades: BacGrades = {
        MG: parseFloat(formData.grades.MG) || 0,
        A: parseFloat(formData.grades.A) || 0,
        Ang: parseFloat(formData.grades.Ang) || 0,
        F: parseFloat(formData.grades.F) || 0,
        M: parseFloat(formData.grades.M) || 0,
        SP: parseFloat(formData.grades.SP) || 0,
        SVT: parseFloat(formData.grades.SVT) || 0,
        PH: parseFloat(formData.grades.PH) || 0,
        HG: parseFloat(formData.grades.HG) || 0,
        Ec: parseFloat(formData.grades.Ec) || 0,
        Ge: parseFloat(formData.grades.Ge) || 0,
        Algo: parseFloat(formData.grades.Algo) || 0,
        STI: parseFloat(formData.grades.STI) || 0,
        Sport: parseFloat(formData.grades.Sport) || 0,
      };

      // Parse preferences
      const preferencesArray = formData.preferences
        .split(',')
        .map(p => p.trim())
        .filter(p => p);

      // Get current user (or use student_id from form)
      const user = await authAPI.getCurrentUser();
      const studentId = formData.student_id || user.id;

      // Prepare request data
      const requestData: RecommendationRequest = {
        bac_type: formData.bac_type,
        bac_grades: grades,
        governorate: formData.governorate,
        preferences: preferencesArray,
        min_choices: 6
      };

      // Make API call
      const response = await fetch(`/api/v1/recommendations/${studentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      const result = await response.json();

      if (result.success) {
        setRecommendations(result.data);
        setShowResults(true);
        // Scroll to results
        setTimeout(() => {
          document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        alert('Erreur: ' + result.message);
      }
    } catch (error) {
      console.error('Failed to generate recommendations', error);
      alert('Une erreur est survenue lors de la génération des recommandations.');
    } finally {
      setIsLoading(false);
    }
  };

  const isStep1Valid = formData.student_id && formData.bac_type && formData.governorate && formData.grades.MG;
  const isStep2Valid = true; // Preferences are optional

  return (
    <div className="max-w-4xl mx-auto pt-8 pb-16 px-4">
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Étape {step} sur 2
          </span>
          <span className="text-sm font-medium text-slate-400">
            {step === 1 ? 'Informations Académiques' : 'Préférences'}
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
      </div>

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
              {/* Student ID */}
              <div>
                <label className="block text-lg font-medium text-slate-800 mb-3">
                  ID de l'étudiant
                </label>
                <input
                  type="text"
                  required
                  placeholder="Entrez votre ID étudiant"
                  className="w-full max-w-md rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg p-3 border"
                  value={formData.student_id}
                  onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                />
              </div>

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
                        value={formData.grades[subject.id]}
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

      {/* Results Section */}
      {showResults && recommendations && (
        <div id="results" className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-3">
            Résultats d'Orientation
          </h2>

          <div className="space-y-6">
            {/* Overall FG Score */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Votre FG (الصيغة الإجمالية)
              </h3>
              <div className="flex items-center">
                <span className="text-4xl font-bold text-blue-700">{recommendations.student_fg}</span>
                <span className="ml-2 text-slate-600">points</span>
              </div>
              <p className="text-slate-600 mt-2">
                Cette note est utilisée pour calculer vos chances d'admission dans les différentes filières.
              </p>
            </div>

            {/* Top Recommendations */}
            <div>
              <h4 className="text-xl font-bold text-slate-800 mb-4">
                Top 6 Choix Recommandés:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.top_choices.map((rec: any, index: number) => (
                  <div
                    key={index}
                    className={`border rounded-xl p-5 transition-all hover:shadow-md ${rec.requires_selection
                        ? 'border-amber-200 bg-amber-50'
                        : 'border-slate-200 bg-white'
                      }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold mr-3">
                          {index + 1}
                        </span>
                        <h5 className="inline text-lg font-bold text-slate-900">
                          {rec.program_name}
                        </h5>
                      </div>
                      {rec.requires_selection && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          Test de sélection
                        </span>
                      )}
                    </div>

                    <div className="space-y-3 pl-11">
                      <div className="flex items-center text-slate-700">
                        <span className="font-medium mr-2">Institution:</span>
                        <span>{rec.institution}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-slate-700 mr-2">Points totaux:</span>
                          <span className="text-blue-700 font-bold">{rec.total_points_with_bonus}</span>
                        </div>
                        <div className="text-sm text-slate-600">
                          Bonus: <span className="font-medium text-green-600">+{rec.geographic_bonus}%</span>
                        </div>
                      </div>

                      {rec.last_admitted_score && (
                        <div className="flex items-center text-slate-600">
                          <span className="font-medium mr-2">Dernier admis 2024:</span>
                          <span className="font-bold">{rec.last_admitted_score}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <button
              onClick={() => {
                setShowResults(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center px-6 py-3 border border-slate-300 text-base font-medium rounded-xl shadow-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              Retour au formulaire
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationQuestionnaire;