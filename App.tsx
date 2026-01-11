
import React, { useState, useEffect, useCallback } from 'react';
import { storageService } from './services/storageService';
import { currencyService } from './services/currencyService';
import { AppData, Tab, Vehicle, ExchangeRates } from './types';
import { VehicleCard } from './components/VehicleCard';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ADMIN_KEY, APP_BORDO, CORPORATE_WA } from './constants';
import { 
  MapPin, Shield, ClipboardList, Instagram, MessageCircle, ChevronRight, 
  Navigation, LayoutDashboard, Car, PhoneCall, Clock, Facebook, Mail, Globe,
  Briefcase, Fingerprint, Award, ArrowRightLeft, Wifi, WifiOff
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.RESERVATIONS);
  const [appData, setAppData] = useState<AppData>(storageService.loadData());
  const [rates, setRates] = useState<ExchangeRates>({ PYG: 1450, USD: 0.18 });
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [adminPass, setAdminPass] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    currencyService.getRatesFromBRL().then(res => setRates(res));
    
    // Escuchar cambios en otras pestañas o ventanas del mismo navegador
    const handleStorageChange = () => {
      setAppData(storageService.loadData());
    };

    // Escuchar el evento personalizado disparado por storageService
    window.addEventListener('jm_storage_update', handleStorageChange);
    // Escuchar evento nativo de storage (para otras pestañas)
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('jm_storage_update', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const refreshData = useCallback(() => {
    setAppData(storageService.loadData());
  }, []);

  const handleAdminAuth = () => {
    if (adminPass === ADMIN_KEY) {
      setIsAdminAuthenticated(true);
      setActiveTab(Tab.ADMIN);
    } else alert('Acceso denegado. Clave incorrecta.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCFB]">
      {/* HEADER NAVEGACIÓN PREMIUM */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-header px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setActiveTab(Tab.RESERVATIONS)}>
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border-2 border-[#D4AF37] overflow-hidden shadow-xl transition-all group-hover:rotate-6">
              <img src="https://i.ibb.co/PzsvxYrM/JM-Asociados-Logotipo-02.png" alt="Logo" className="w-10 h-10 object-contain" />
            </div>
            <div className="leading-tight">
              <h1 className="text-xl font-black tracking-tighter luxury-title text-white uppercase">JM <span className="text-[#D4AF37]">Alquiler</span></h1>
              <span className="text-[10px] font-bold text-[#D4AF37]/80 tracking-[0.3em] uppercase block">Triple Frontera VIP</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {[
              { id: Tab.RESERVATIONS, label: 'Unidades', icon: Car },
              { id: Tab.LOCATION, label: 'Sede Central', icon: MapPin },
              { id: Tab.ADMIN, label: 'Admin', icon: Fingerprint }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all py-2 rounded-lg ${
                  activeTab === tab.id 
                    ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <tab.icon size={14} />{tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-6 bg-black/30 px-6 py-2.5 rounded-2xl border border-white/10 backdrop-blur-xl">
               <div className="flex items-center gap-6 divide-x divide-white/10">
                  <div className="leading-none text-right">
                     <p className="text-white font-black text-[11px] uppercase tracking-wider">Gs. {rates.PYG.toLocaleString()}</p>
                     <span className="text-[7px] font-black text-[#D4AF37]/50 uppercase tracking-[0.2em] block mt-0.5">BRL MARKET</span>
                  </div>
               </div>
            </div>
            {/* Indicador de Estado de Datos */}
            <div className="hidden lg:flex items-center justify-center w-10 h-10 bg-white/5 rounded-full border border-white/10" title="Modo Local Activo">
               <WifiOff size={16} className="text-white/30" />
            </div>
          </div>
        </div>
      </nav>

      {/* CUERPO DE LA APLICACIÓN */}
      <main className="flex-1 pt-24">
        {activeTab === Tab.RESERVATIONS && (
          <div className="animate-fadeIn">
            {/* Banner de Bienvenida */}
            <div className="bg-bordo text-white py-24 px-6 relative overflow-hidden border-b-8 border-gold/10">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-20"></div>
              <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-gold/5 rounded-full blur-[120px]"></div>
              <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 space-y-8 text-center md:text-left">
                  <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full">
                    <Award size={16} className="text-gold" />
                    <span className="text-gold font-black text-[9px] uppercase tracking-[0.4em]">Calidad Certificada MERCOSUR</span>
                  </div>
                  <h2 className="text-5xl md:text-8xl font-black luxury-title leading-[0.9] text-white">Domina el <span className="text-gold italic">Camino.</span></h2>
                  <p className="text-white/60 text-lg max-w-xl font-light leading-relaxed">Gestione su movilidad corporativa con absoluta discreción y eficiencia técnica en Ciudad del Este.</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-6">
                    <button onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })} className="bg-gold text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-2xl flex items-center gap-3 group">Explorar Flota <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform"/></button>
                    <a href={`https://wa.me/${CORPORATE_WA}`} className="px-12 py-6 rounded-2xl border-2 border-white/10 font-black text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all">Atención Directa</a>
                  </div>
                </div>
                <div className="hidden lg:block flex-1">
                   <img src="https://i.ibb.co/rGJHxvbm/Tucson-sin-fondo.png" className="w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)] animate-float" />
                </div>
              </div>
            </div>

            {/* Catálogo de Unidades */}
            <div id="catalog" className="max-w-7xl mx-auto px-6 py-24">
              <div className="flex items-center justify-between mb-16 border-b border-gray-100 pb-8">
                <div>
                  <h3 className="text-4xl font-black luxury-title text-bordo mb-2">Unidades <span className="text-gold">Disponibles</span></h3>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">Reserva de compromiso: 1 Día de alquiler</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-300"><ChevronRight size={20} className="rotate-180"/></div>
                  <div className="w-10 h-10 rounded-full border border-bordo flex items-center justify-center text-bordo"><ChevronRight size={20}/></div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-16">
                {appData.fleet.map(v => (
                  <VehicleCard 
                    key={v.id} 
                    vehicle={v} 
                    rates={rates} 
                    onSelect={setSelectedVehicle} 
                    reservations={appData.reservations.filter(r => r.auto === v.nombre && r.status !== 'Cancelada')} 
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === Tab.LOCATION && (
          <div className="max-w-7xl mx-auto px-6 py-32 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <div className="space-y-12">
                  <div>
                    <h2 className="text-6xl font-black luxury-title text-bordo mb-6">Estamos <span className="text-gold">Aquí</span></h2>
                    <p className="text-gray-500 text-lg leading-relaxed">Nuestra base operativa se encuentra en el corazón logístico de la Triple Frontera, garantizando entregas rápidas y soporte 24/7.</p>
                  </div>
                  <div className="space-y-6">
                     {[
                       { icon: MapPin, title: 'Dirección Corporativa', val: 'Av. Aviadores del Chaco c/ Av. Monseñor Rodriguez, CDE' },
                       { icon: PhoneCall, title: 'Línea de Asistencia', val: `+${CORPORATE_WA}` },
                       { icon: Clock, title: 'Horario Operativo', val: 'Lun-Vie 08:00 a 17:00 | Sáb-Dom 08:00 a 12:00' }
                     ].map((item, i) => (
                       <div key={i} className="flex gap-6 p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                          <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold"><item.icon size={24}/></div>
                          <div><p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">{item.title}</p><p className="text-gray-700 font-bold">{item.val}</p></div>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="relative group">
                  <div className="absolute inset-0 bg-bordo rounded-[4rem] rotate-3 group-hover:rotate-0 transition-transform duration-700"></div>
                  <div className="relative bg-white p-4 rounded-[4rem] shadow-2xl border-2 border-gray-100 overflow-hidden aspect-square flex items-center justify-center">
                    <img src="https://i.ibb.co/PzsvxYrM/JM-Asociados-Logotipo-02.png" className="w-2/3 opacity-10 grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center bg-bordo/80 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="bg-gold text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-3"><Navigation size={18}/> Abrir en Google Maps</button>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === Tab.ADMIN && (
          <div className="max-w-7xl mx-auto px-6 py-32 animate-fadeIn">
            {!isAdminAuthenticated ? (
              <div className="max-w-lg mx-auto bg-white p-16 rounded-[4rem] shadow-2xl border-2 border-gray-50 text-center space-y-12">
                <div className="w-24 h-24 bg-bordo/5 rounded-full flex items-center justify-center mx-auto text-bordo"><Shield size={48} /></div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-black luxury-title text-bordo">Control Maestro</h3>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">Área de Auditoría Restringida</p>
                </div>
                <div className="space-y-6">
                  <input type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)} placeholder="••••" className="w-full bg-gray-50 border-2 border-gray-100 px-8 py-8 rounded-[2rem] text-center text-5xl font-black focus:border-gold outline-none tracking-[0.6em] transition-all" onKeyDown={e => e.key === 'Enter' && handleAdminAuth()} />
                  <button onClick={handleAdminAuth} className="w-full bg-bordo text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-gold transition-all">Autenticar Acceso</button>
                </div>
              </div>
            ) : (
              <AdminDashboard data={appData} rates={rates} onRefresh={refreshData} />
            )}
          </div>
        )}
      </main>

      {/* FOOTER CORPORATIVO FINAL */}
      <footer className="bg-bordo text-white pt-24 pb-12 border-t-8 border-gold">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-20 mb-20">
            {/* Columna 1: Marca */}
            <div className="col-span-1 lg:col-span-1 space-y-8">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center p-2 shadow-2xl"><img src="https://i.ibb.co/PzsvxYrM/JM-Asociados-Logotipo-02.png" className="object-contain" /></div>
                <div><h3 className="luxury-title text-2xl font-black text-white">JM <span className="text-gold">Asociados</span></h3><p className="text-[8px] font-black text-gold/60 uppercase tracking-[0.3em]">Logística de Excelencia</p></div>
              </div>
              <p className="text-white/50 text-sm leading-relaxed font-light">Especialistas en la gestión de flota ejecutiva para clientes VIP y corporaciones internacionales en la región del MERCOSUR.</p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-500"><Instagram size={20} /></a>
                <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-500"><Facebook size={20} /></a>
                <a href={`https://wa.me/${CORPORATE_WA}`} className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-500"><MessageCircle size={20} /></a>
              </div>
            </div>

            {/* Columna 2: Navegación */}
            <div className="space-y-8">
              <h4 className="text-gold font-black uppercase tracking-[0.3em] text-[10px]">Mapa del Sitio</h4>
              <ul className="space-y-5 text-[11px] font-black uppercase tracking-widest text-white/60">
                <li><button onClick={() => setActiveTab(Tab.RESERVATIONS)} className="hover:text-white flex items-center gap-3 transition-all"><ArrowRightLeft size={12} className="text-gold"/> Alquiler de Unidades</button></li>
                <li><button onClick={() => setActiveTab(Tab.LOCATION)} className="hover:text-white flex items-center gap-3 transition-all"><ArrowRightLeft size={12} className="text-gold"/> Ubicación y Sedes</button></li>
                <li><button onClick={() => setActiveTab(Tab.ADMIN)} className="hover:text-white flex items-center gap-3 transition-all"><ArrowRightLeft size={12} className="text-gold"/> Panel Administrativo</button></li>
                <li><a href={`https://wa.me/${CORPORATE_WA}`} className="hover:text-white flex items-center gap-3 transition-all"><ArrowRightLeft size={12} className="text-gold"/> Soporte 24/7</a></li>
              </ul>
            </div>

            {/* Columna 3: Horarios */}
            <div className="space-y-8">
              <h4 className="text-gold font-black uppercase tracking-[0.3em] text-[10px]">Atención Administrativa</h4>
              <div className="space-y-6">
                 <div className="flex items-start gap-4">
                    <Clock size={18} className="text-gold mt-1"/>
                    <div>
                      <p className="text-[10px] font-black uppercase text-white tracking-widest">Lunes a Viernes</p>
                      <p className="text-xs text-white/50 font-medium">08:00 AM — 05:00 PM</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <Clock size={18} className="text-gold mt-1"/>
                    <div>
                      <p className="text-[10px] font-black uppercase text-white tracking-widest">Sábados y Domingos</p>
                      <p className="text-xs text-white/50 font-medium">08:00 AM — 12:00 PM</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Columna 4: Ubicación Legal */}
            <div className="space-y-8">
              <h4 className="text-gold font-black uppercase tracking-[0.3em] text-[10px]">Ubicación Global</h4>
              <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><Globe size={48}/></div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase text-white tracking-widest">Sede Central</p>
                  <p className="text-xs text-white/50 leading-relaxed font-light">Ciudad del Este, Paraguay.<br/>Triple Frontera Region.</p>
                </div>
                <div className="flex items-center gap-3 text-gold text-[9px] font-black uppercase tracking-widest">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Operativo Hoy
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">© 2024 J&M Asociados. Excellence in Mobility Services.</p>
            <div className="flex gap-10 text-[9px] font-black uppercase text-white/20 tracking-[0.3em]">
              <a href="#" className="hover:text-gold transition-colors">Política Legal</a>
              <a href="#" className="hover:text-gold transition-colors">Privacidad</a>
              <a href="#" className="hover:text-gold transition-colors">Condiciones</a>
            </div>
          </div>
        </div>
      </footer>

      {selectedVehicle && (
        <BookingModal 
          vehicle={selectedVehicle} 
          rates={rates} 
          onClose={() => setSelectedVehicle(null)} 
          onSuccess={() => { setSelectedVehicle(null); refreshData(); }}
          existingReservations={appData.reservations.filter(r => r.auto === selectedVehicle.nombre && r.status !== 'Cancelada')}
        />
      )}
    </div>
  );
};

export default App;
