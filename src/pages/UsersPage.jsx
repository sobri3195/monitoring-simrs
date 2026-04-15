import { useAppStore } from '../store/useAppStore';

const UsersPage = () => {
  const { users, currentUser, setCurrentUser } = useAppStore();

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="text-lg font-semibold text-brand-900">Manajemen User (Mock Auth)</h2>
      <p className="text-sm text-slate-600">Simulasi role-based access: Super Admin Puskesau, Admin Kotama, Operator Faskes, Viewer Pimpinan.</p>
      <div className="grid gap-3 md:grid-cols-2">
        {users.map((user) => (
          <button key={user.id} onClick={() => setCurrentUser(user.id)} className={`rounded-lg border p-3 text-left ${currentUser.id === user.id ? 'border-brand-600 bg-blue-50' : 'border-slate-200'}`}>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-slate-500">{user.role} · {user.unit}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
