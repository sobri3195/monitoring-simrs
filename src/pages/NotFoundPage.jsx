import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const NotFoundPage = () => (
  <div className="space-y-4">
    <PageHeader title="Halaman Tidak Ditemukan" description="Route yang Anda akses tidak tersedia atau sudah dipindahkan." breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: '404' }]} />
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <p className="text-sm text-slate-600">Silakan kembali ke dashboard utama atau halaman input laporan.</p>
      <Link to="/" className="mt-4 inline-flex rounded-md bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800">Kembali</Link>
    </div>
  </div>
);

export default NotFoundPage;
