import logoMark from '../assets/logo-simrs.svg';

const AppLogo = ({ compact = false }) => (
  <div className="flex items-center gap-2">
    <img src={logoMark} alt="Logo SIMRS" className="h-8 w-8 rounded-md object-cover" />
    {!compact ? (
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-white">Puskesau TNI AU</p>
        <p className="truncate text-[11px] text-slate-300">Monitoring SIMRS & SIM Klinik</p>
      </div>
    ) : null}
  </div>
);

export default AppLogo;
