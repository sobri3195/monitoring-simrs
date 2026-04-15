import { useAppStore } from '../store/useAppStore';
import IssueTable from '../components/IssueTable';

const IssuesPage = () => {
  const { issues } = useAppStore();
  return <IssueTable data={issues} />;
};

export default IssuesPage;
