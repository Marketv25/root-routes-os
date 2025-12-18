import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, 
  Target, 
  Users, 
  Map, 
  Download, 
  AlertCircle, 
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Zap,
  Send,
  Sparkles,
  AlertTriangle,
  Cloud,
  ShieldAlert,
  Megaphone,
  TrendingUp,
  DollarSign
} from 'lucide-react';

/**
 * ROOT ROUTES - PROTOCOLO DE INVESTIGACIÓN ESTANDARIZADO (PIE)
 * Sistema de ingestión de estrategia
 */

const App = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  
  const [sessionId] = useState(() => `PIE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);

  // Estructura completa basada en el Protocolo Root Routes
  const [pieData, setPieData] = useState({
    contexto: { 
      vende: '', 
      ticket: '', 
      canales: '', 
      limites: '' 
    },
    territorio: { 
      temasSi: '', 
      lineasRojas: '', 
      tension: 'Media' 
    },
    audiencia: { 
      lenguaje: '', 
      sofisticacion: 'Consciente del Problema', 
      objeciones: '' 
    },
    objetivo: { 
      prioritario: 'Ventas', 
      razon: '' 
    }
  });

  const steps = [
    { id: 'contexto', title: 'Contexto', subtitle: 'La Realidad del Negocio', icon: <ClipboardList className="w-5 h-5" />, color: 'blue' },
    { id: 'territorio', title: 'Territorio', subtitle: 'Límites Editoriales', icon: <Map className="w-5 h-5" />, color: 'purple' },
    { id: 'audiencia', title: 'Audiencia', subtitle: 'Psicografía Real', icon: <Users className="w-5 h-5" />, color: 'green' },
    { id: 'objetivo', title: 'Objetivo', subtitle: 'La Meta Estratégica', icon: <Target className="w-5 h-5" />, color: 'red' },
    { id: 'revision', title: 'Finalizar', subtitle: 'Sincronización', icon: <Zap className="w-5 h-5" />, color: 'yellow' }
  ];

  const handleInputChange = (section, field, value) => {
    setPieData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  /**
   * SIMULACIÓN DE SUBIDA A CLOUD
   */
  const handleSubmitToGoogleCloud = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Aquí iría la llamada real a Firebase/Supabase
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Datos persistidos en Root Routes OS:", { sessionId, pieData });
      
      setIsSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      setError("Error al conectar con el sistema operativo.");
      setIsSubmitting(false);
    }
  };

  const downloadArtifacts = () => {
    const generateMarkdown = (title, data) => {
      return `# ROOT ROUTES OS - ${title}
ID PROTOCOLO: ${sessionId}
FECHA: ${new Date().toISOString()}

## 01. CONTEXTO DE NEGOCIO
- **Oferta Principal**: ${data.contexto.vende || 'No definido'}
- **Ticket Promedio**: ${data.contexto.ticket || 'No definido'}
- **Canales Actuales**: ${data.contexto.canales || 'No definido'}
- **Límites Duros (Anti-Venta)**: ${data.contexto.limites || 'No definido'}

## 02. TERRITORIO EDITORIAL
- **Autoridad (Temas SÍ)**: ${data.territorio.temasSi || 'No definido'}
- **Líneas Rojas (Temas NO)**: ${data.territorio.lineasRojas || 'No definido'}
- **Nivel de Tensión**: ${data.territorio.tension || 'No definido'}

## 03. AUDIENCIA & LENGUAJE
- **Lenguaje del Cliente**: ${data.audiencia.lenguaje || 'No definido'}
- **Nivel de Sofisticación**: ${data.audiencia.sofisticacion || 'No definido'}
- **Objeciones Principales**: ${data.audiencia.objeciones || 'No definido'}

## 04. OBJETIVO ESTRATÉGICO
- **Prioridad**: ${data.objetivo.prioritario || 'No definido'}
- **Razón Estratégica**: ${data.objetivo.razon || 'No definido'}

---
*Generado automáticamente por Root Routes Ingestion Node*
`;
    };

    const files = [
      { name: `PIE_${sessionId}_RootRoutes.md`, content: generateMarkdown('REPORTE DE INGESTIÓN', pieData) }
    ];

    files.forEach(file => {
      const element = document.createElement("a");
      const fileData = new Blob([file.content], {type: 'text/markdown'});
      element.href = URL.createObjectURL(fileData);
      element.download = file.name;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    });
  };

  const runDiagnosis = async () => {
    setIsGenerating(true);
    // Simula un análisis de coherencia entre audiencia y oferta
    setTimeout(() => {
      let problema = "La oferta parece genérica. ";
      let palanca = "Profundizar en beneficios.";

      if (pieData.objetivo.prioritario === 'Ventas' && pieData.audiencia.sofisticacion === 'Inconsciente') {
        problema = "ALERTA: Intentas vender directo (Ventas) a una audiencia que no sabe que tiene el problema (Inconsciente).";
        palanca = "Debes pivotar a contenido educativo primero.";
      } else if (pieData.territorio.tension === 'Alta' && pieData.objetivo.prioritario === 'Alcance') {
        problema = "Riesgo calculado: Buscas alcance masivo con alta polarización.";
        palanca = "Asegura que tu 'Lenguaje del Cliente' sea impecable para no alienar a los incorrectos.";
      } else {
        problema = `Tu oferta de "${pieData.contexto.vende?.substring(0, 30)}..." requiere validación de autoridad.`;
        palanca = `Usa las objeciones "${pieData.audiencia.objeciones?.substring(0, 30)}..." como temas centrales de contenido.`;
      }

      setDiagnosis({ problema, palanca });
      setIsGenerating(false);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl text-center space-y-6 border border-slate-100 animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={40} />
          </div>
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Protocolo Ingestado</h2>
            <p className="text-xs font-mono bg-slate-100 py-1 px-3 rounded-full inline-block text-slate-500">ID: {sessionId}</p>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            La información ha entrado al <strong>Root Routes OS</strong>. El nodo Estratega comenzará el procesamiento.
          </p>
          <div className="pt-6 border-t border-slate-50 flex flex-col gap-3">
             <button 
              onClick={downloadArtifacts}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-black transition-colors"
            >
              Descargar Copia Local (.md)
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="text-xs text-slate-400 hover:text-black font-bold uppercase tracking-widest transition-colors mt-2"
            >
              Iniciar Nuevo Protocolo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 text-white p-2 rounded-lg shadow-lg">
            <Cloud size={20} fill="white" className="text-blue-400" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight uppercase italic leading-none">Root Routes <span className="text-blue-600">OS</span></h1>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Ingestion Interface v1.0</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">System Online</span>
           </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR NAVIGATION */}
        <nav className="lg:col-span-3 space-y-2">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 text-left group ${
                activeStep === index 
                ? 'bg-white shadow-xl shadow-slate-200/50 text-black border border-slate-100 scale-105' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-white/40'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all ${
                activeStep === index 
                  ? `bg-${step.color}-100 text-${step.color}-600` 
                  : 'bg-slate-100 text-slate-400 group-hover:bg-white group-hover:shadow-sm'
              }`}>
                {step.icon}
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase tracking-widest opacity-50 mb-0.5">Paso 0{index + 1}</span>
                <span className="block text-sm font-bold tracking-tight">{step.title}</span>
              </div>
              {activeStep === index && <ChevronRight className="ml-auto w-4 h-4 text-slate-300" />}
            </button>
          ))}

          {/* PROGRESS WIDGET */}
          <div className="mt-8 p-6 rounded-3xl bg-slate-900 text-white relative overflow-hidden hidden lg:block">
             <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Progreso del PIE</p>
                <div className="text-3xl font-black italic tracking-tighter mb-1">
                  {Math.round((Object.values(pieData).reduce((acc, curr) => acc + Object.values(curr).filter(Boolean).length, 0) / 12) * 100)}%
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                   <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${(Object.values(pieData).reduce((acc, curr) => acc + Object.values(curr).filter(Boolean).length, 0) / 12) * 100}%` }}
                   ></div>
                </div>
             </div>
             
             {/* Background Decoration */}
             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full pointer-events-none"></div>
          </div>
        </nav>

        {/* MAIN FORM AREA */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 min-h-[600px] flex flex-col relative overflow-hidden">
            
            {/* Top Bar Decoration */}
            <div className={`h-2 w-full bg-gradient-to-r transition-all duration-500 ${
              activeStep === 0 ? 'from-blue-500 to-blue-300' :
              activeStep === 1 ? 'from-purple-500 to-purple-300' :
              activeStep === 2 ? 'from-green-500 to-green-300' :
              activeStep === 3 ? 'from-red-500 to-red-300' :
              'from-yellow-500 to-orange-500'
            }`}></div>

            <div className="p-8 md:p-12 flex-grow overflow-y-auto custom-scrollbar">
              
              {/* --- PASO 0: CONTEXTO --- */}
              {activeStep === 0 && (
                <section className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <header>
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-slate-900 mb-2">Contexto de Negocio</h2>
                    <p className="text-slate-500 text-lg">Define las coordenadas base de tu oferta y realidad operativa.</p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="col-span-2 space-y-3">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">¿Qué experiencia vendes?</label>
                      <textarea 
                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none transition-all h-32 focus:border-blue-500 focus:bg-white font-medium resize-none"
                        placeholder="Describe tu producto o servicio principal..."
                        value={pieData.contexto.vende}
                        onChange={(e) => handleInputChange('contexto', 'vende', e.target.value)}
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <DollarSign size={14} /> Ticket Promedio
                      </label>
                      <input 
                        type="text"
                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none transition-all focus:border-blue-500 focus:bg-white font-bold"
                        placeholder="Ej. $500 - $2000 USD"
                        value={pieData.contexto.ticket}
                        onChange={(e) => handleInputChange('contexto', 'ticket', e.target.value)}
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Megaphone size={14} /> Canales Actuales
                      </label>
                      <input 
                        type="text"
                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none transition-all focus:border-blue-500 focus:bg-white font-medium"
                        placeholder="Ej. LinkedIn, Boca a boca..."
                        value={pieData.contexto.canales}
                        onChange={(e) => handleInputChange('contexto', 'canales', e.target.value)}
                      />
                    </div>

                    <div className="col-span-2 space-y-3">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 text-red-500">
                        <ShieldAlert size={14} /> Límites Duros (Anti-Venta)
                      </label>
                      <textarea 
                        className="w-full p-4 bg-red-50/50 border-2 border-red-100 rounded-2xl outline-none transition-all h-24 focus:border-red-500 focus:bg-white font-medium resize-none placeholder:text-red-300"
                        placeholder="¿Qué NO haces? ¿Con quién NO trabajas?"
                        value={pieData.contexto.limites}
                        onChange={(e) => handleInputChange('contexto', 'limites', e.target.value)}
                      />
                    </div>
                  </div>
                </section>
              )}

              {/* --- PASO 1: TERRITORIO --- */}
              {activeStep === 1 && (
                <section className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <header>
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-slate-900 mb-2">Territorio Editorial</h2>
                    <p className="text-slate-500 text-lg">Define dónde tienes autoridad y qué líneas no cruzarás.</p>
                  </header>

                   <div className="grid grid-cols-1 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-purple-400 uppercase tracking-widest">Temas de Autoridad (Sí)</label>
                      <textarea 
                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none transition-all h-28 focus:border-purple-500 focus:bg-white font-medium resize-none"
                        placeholder="¿De qué puedes hablar horas sin preparación?"
                        value={pieData.territorio.temasSi}
                        onChange={(e) => handleInputChange('territorio', 'temasSi', e.target.value)}
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-red-400 uppercase tracking-widest">Líneas Rojas (Temas Tabú)</label>
                      <input 
                        type="text" 
                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none transition-all focus:border-red-500 focus:bg-white font-medium"
                        placeholder="Política, Religión, Vida privada..."
                        value={pieData.territorio.lineasRojas}
                        onChange={(e) => handleInputChange('territorio', 'lineasRojas', e.target.value)}
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nivel de Tensión (Polarización)</label>
                      <div className="flex gap-4">
                        {['Baja', 'Media', 'Alta'].map((nivel) => (
                           <button
                            key={nivel}
                            onClick={() => handleInputChange('territorio', 'tension', nivel)}
                            className={`flex-1 py-4 rounded-xl font-bold uppercase tracking-wider text-sm border-2 transition-all ${
                              pieData.territorio.tension === nivel 
                              ? 'border-purple-500 bg-purple-50 text-purple-700' 
                              : 'border-slate-100 bg-white text-slate-400 hover:border-slate-300'
                            }`}
                           >
                            {nivel}
                           </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* --- PASO 2: AUDIENCIA --- */}
              {activeStep === 2 && (
                <section className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <header>
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-slate-900 mb-2">Audiencia Real</h2>
                    <p className="text-slate-500 text-lg">¿Quién está realmente al otro lado y qué les duele?</p>
                  </header>

                  <div className="grid grid-cols-1 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-green-500 uppercase tracking-widest">Lenguaje del Cliente (Verbatim)</label>
                      <textarea 
                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none transition-all h-32 focus:border-green-500 focus:bg-white font-medium resize-none italic"
                        placeholder='"Siento que estoy perdiendo dinero...", "Nadie me entiende cuando explico..."'
                        value={pieData.audiencia.lenguaje}
                        onChange={(e) => handleInputChange('audiencia', 'lenguaje', e.target.value)}
                      />
                      <p className="text-[10px] text-slate-400 text-right">Usa comillas para frases exactas que has escuchado.</p>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nivel de Sofisticación</label>
                      <select 
                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none transition-all focus:border-green-500 focus:bg-white font-bold text-slate-700 appearance-none"
                        value={pieData.audiencia.sofisticacion}
                        onChange={(e) => handleInputChange('audiencia', 'sofisticacion', e.target.value)}
                      >
                         <option>Inconsciente (No sabe que tiene un problema)</option>
                         <option>Consciente del Problema (Busca, pero no halla)</option>
                         <option>Consciente de la Solución (Compara opciones)</option>
                         <option>Consciente del Producto (Te conoce, duda)</option>
                         <option>Totalmente Consciente (Fan, listo para comprar)</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-orange-400 uppercase tracking-widest">Objeciones Principales</label>
                      <textarea 
                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none transition-all h-24 focus:border-green-500 focus:bg-white font-medium resize-none"
                        placeholder="Es muy caro, no tengo tiempo, no sé si funcionará para mí..."
                        value={pieData.audiencia.objeciones}
                        onChange={(e) => handleInputChange('audiencia', 'objeciones', e.target.value)}
                      />
                    </div>
                  </div>
                </section>
              )}

              {/* --- PASO 3: OBJETIVO --- */}
              {activeStep === 3 && (
                <section className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <header>
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-slate-900 mb-2">Objetivo Estratégico</h2>
                    <p className="text-slate-500 text-lg">Define la "Estrella del Norte" para esta campaña.</p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                     {[
                        { id: 'Ventas', icon: <DollarSign className="w-6 h-6" />, desc: 'Conversión directa (Bottom Funnel)' },
                        { id: 'Autoridad', icon: <ShieldAlert className="w-6 h-6" />, desc: 'Posicionamiento (Mid Funnel)' },
                        { id: 'Alcance', icon: <TrendingUp className="w-6 h-6" />, desc: 'Visibilidad masiva (Top Funnel)' }
                     ].map((obj) => (
                        <button
                           key={obj.id}
                           onClick={() => handleInputChange('objetivo', 'prioritario', obj.id)}
                           className={`p-6 rounded-2xl border-2 text-left transition-all ${
                              pieData.objetivo.prioritario === obj.id
                              ? 'border-red-500 bg-red-50 ring-2 ring-red-200 ring-offset-2'
                              : 'border-slate-100 hover:border-slate-300'
                           }`}
                        >
                           <div className={`mb-3 ${pieData.objetivo.prioritario === obj.id ? 'text-red-600' : 'text-slate-400'}`}>
                              {obj.icon}
                           </div>
                           <div className="font-bold text-lg mb-1">{obj.id}</div>
                           <div className="text-xs text-slate-500 leading-tight">{obj.desc}</div>
                        </button>
                     ))}
                  </div>

                  <div className="space-y-3">
                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest">¿Por qué este objetivo ahora?</label>
                     <textarea 
                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none transition-all h-32 focus:border-red-500 focus:bg-white font-medium resize-none"
                        placeholder="Justificación estratégica..."
                        value={pieData.objetivo.razon}
                        onChange={(e) => handleInputChange('objetivo', 'razon', e.target.value)}
                     />
                  </div>
                </section>
              )}

              {/* --- PASO 4: FINALIZAR --- */}
              {activeStep === 4 && (
                <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
                  <header>
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-slate-900 mb-2">Sincronización</h2>
                    <p className="text-slate-500 text-lg">Validación por IA y carga al sistema operativo.</p>
                  </header>
                  
                  <div className="bg-slate-900 text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                    {/* Abstract Shapes Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity"></div>

                    <div className="relative z-10 space-y-8">
                      <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                        <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-white">
                          <Sparkles size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold italic tracking-tight uppercase">Root Routes Intelligence</h3>
                          <p className="text-slate-400 text-xs uppercase tracking-widest">Pre-Flight Check</p>
                        </div>
                      </div>
                      
                      {!diagnosis ? (
                        <div className="text-center py-8">
                          <p className="text-slate-300 mb-8 max-w-lg mx-auto">El sistema analizará la coherencia entre tu <span className="text-white font-bold">Objetivo ({pieData.objetivo.prioritario})</span> y el <span className="text-white font-bold">Nivel de Sofisticación</span> de tu audiencia.</p>
                          <button 
                            onClick={runDiagnosis}
                            className="w-full md:w-auto px-12 bg-white text-slate-900 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-blue-50 hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-lg mx-auto"
                          >
                            {isGenerating ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div> : "Ejecutar Diagnóstico"}
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-6 animate-in zoom-in-95">
                          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
                             <div className="absolute left-0 top-0 h-full w-1 bg-yellow-400"></div>
                            <p className="text-yellow-400 font-black uppercase text-[10px] mb-2 tracking-widest flex items-center gap-2">
                              <AlertTriangle size={12} /> Diagnóstico de Coherencia
                            </p>
                            <div className="space-y-4">
                               <div>
                                  <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Problema Detectado</p>
                                  <p className="text-white font-medium text-lg leading-snug">{diagnosis.problema}</p>
                               </div>
                               <div>
                                  <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Palance de Solución</p>
                                  <p className="text-blue-300 italic">{diagnosis.palanca}</p>
                               </div>
                            </div>
                          </div>
                          
                          <button 
                            onClick={handleSubmitToGoogleCloud}
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white py-5 rounded-xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                          >
                            {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : "Cargar a Root Routes OS"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Footer Navigation */}
            <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center z-10">
              <button 
                onClick={() => setActiveStep(s => Math.max(0, s - 1))}
                disabled={activeStep === 0}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition-all ${activeStep === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-slate-900 hover:bg-white'}`}
              >
                <ChevronLeft size={18} /> <span className="text-xs uppercase tracking-wider">Anterior</span>
              </button>
              
              <div className="flex gap-1">
                 {steps.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === activeStep ? 'bg-slate-900' : 'bg-slate-300'}`}></div>
                 ))}
              </div>

              <button 
                onClick={() => setActiveStep(s => Math.min(steps.length - 1, s + 1))}
                disabled={activeStep === steps.length - 1}
                className={`flex items-center gap-3 px-8 py-3 rounded-xl font-bold bg-slate-900 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all ${activeStep === steps.length - 1 ? 'opacity-0 pointer-events-none' : ''}`}
              >
                <span className="text-xs uppercase tracking-widest">Siguiente</span> <ChevronRight size={18} />
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;