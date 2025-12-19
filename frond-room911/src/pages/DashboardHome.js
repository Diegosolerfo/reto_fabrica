import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig'; // Tu instancia de axios con interceptores

function DashboardHome() {
  const [stats, setStats] = useState({ totalUsers: 0, recentAccess: [] });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const usersRes = await api.get('/users');
       
        setStats({
          totalUsers: usersRes.data.length,
          recentAccess: [] 
        });
      } catch (error) {
        console.error("Error cargando estadísticas", error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="card bg-primary text-white shadow-sm p-4 border-0" style={{ borderRadius: '15px' }}>
          <h2>¡Qué bueno verte de nuevo, Administrador!</h2>
          <p>Desde aquí puedes monitorear quién intenta ingresar a las instalaciones.</p>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow-sm border-0 p-3 text-center">
          <h5 className="text-muted">Usuarios Registrados</h5>
          <h2 className="fw-bold">{stats.totalUsers}</h2>
        </div>
      </div>

      <div className="col-md-8">
        <div className="card shadow-sm border-0 p-4">
          <h5 className="mb-3">Actividad de Acceso Reciente</h5>
          <div className="alert alert-info">
             Aquí aparecerán los ingresos que acabas de configurar en el <b>AuthService</b>. 
             Incluso si el número de cédula no existe, lo verás registrado abajo.
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Cédula</th>
                <th>Fecha</th>
                <th>Hora</th>
              </tr>
            </thead>
            <tbody>
               <tr>
                 <td colSpan="3" className="text-center text-muted">Cargando últimos accesos...</td>
               </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;