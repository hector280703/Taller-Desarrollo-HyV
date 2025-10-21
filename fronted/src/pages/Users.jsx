import { useState } from 'react';
import { useGetUser } from '../hooks/useGetUser';
import { useDelUser } from '../hooks/useDelUser';
import { useUpUser } from '../hooks/useUpUser';
import '../styles/Users.css';

export default function Users() {
  const { users, loading, error, refetch } = useGetUser();
  const { deleteUser } = useDelUser();
  const { updateUser } = useUpUser();
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      const result = await deleteUser(userId);
      if (result.success) {
        alert('Usuario eliminado correctamente');
        refetch();
      } else {
        alert(`Error: ${result.error}`);
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleUpdate = async (userId) => {
    const result = await updateUser(userId, editData);
    if (result.success) {
      alert('Usuario actualizado correctamente');
      setEditingId(null);
      setEditData({});
      refetch();
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  if (loading) return <div className="users-container"><p>Cargando usuarios...</p></div>;

  return (
    <div className="users-container">
      <h1>Gestión de Usuarios</h1>
      
      {error && <div className="error-message">{error}</div>}

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No hay usuarios registrados</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {editingId === user.id ? (
                    <input
                      type="text"
                      name="nombreCompleto"
                      value={editData.nombreCompleto || ''}
                      onChange={handleEditChange}
                      placeholder={user.nombreCompleto}
                    />
                  ) : (
                    user.nombreCompleto
                  )}
                </td>
                <td>
                  {editingId === user.id ? (
                    <input
                      type="email"
                      name="email"
                      value={editData.email || ''}
                      onChange={handleEditChange}
                      placeholder={user.email}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>{user.rol}</td>
                <td className="actions">
                  {editingId === user.id ? (
                    <>
                      <button
                        className="btn-save"
                        onClick={() => handleUpdate(user.id)}
                      >
                        Guardar
                      </button>
                      <button
                        className="btn-cancel"
                        onClick={() => setEditingId(null)}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn-edit"
                        onClick={() => {
                          setEditingId(user.id);
                          setEditData({
                            nombreCompleto: user.nombreCompleto,
                            email: user.email,
                            rol: user.rol,
                          });
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(user.id)}
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
