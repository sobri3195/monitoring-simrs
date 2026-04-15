import { useAppStore } from '../store/useAppStore';
import IntegrationStatusCard from '../components/IntegrationStatusCard';

const IntegrasiPage = () => {
  const { facilities } = useAppStore();

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {facilities.slice(0, 18).map((facility) => (
        <IntegrationStatusCard key={facility.id} facility={facility} />
      ))}
    </div>
  );
};

export default IntegrasiPage;
