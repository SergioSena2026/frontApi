import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react'

// Importamos las funciónes que creamos en los servicios
import { obtenerEquipos, guardarEquipo, eliminarEquipo, actualizarEquipo } from './services/equipoService';
import { obtenerClientes, guardarCliente, eliminarCliente, actualizarCliente } from './services/clienteService';

// Importamos los componentes
import TablaGestion from './components/TablaGestion'
import Sidebar from './components/Sidebar';
import FormularioGestion from './components/FormularioGestion';

function App() {
  // Creamos un estado para guardar los equipos y clientes que traigamos
  const [equipos, setEquipos] = useState([])
  const [clientes, setClientes] = useState([])
  const [equipoAEditar, setEquipoAEditar] = useState(null);
  const [clienteAEditar, setClienteAEditar] = useState(null);

  // se activa apenas carga la página
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setEquipos(await obtenerEquipos());
    setClientes(await obtenerClientes());
  };

  // EQUIPOS Guardar y Eliminar
  const manejarGuardarEquipo = async (datos) => {
    if (equipoAEditar) {
      // Si estamos editando, usamos PUT
      await actualizarEquipo(equipoAEditar.id, datos);
      setEquipoAEditar(null); // Salir del modo edición
    } else {
      await guardarEquipo(datos);
    }

    cargarDatos(); // Refrescamos la lista tras guardar
  };

  const manejarEliminarEquipo = async (id) => {
    const exito = await eliminarEquipo(id);
    if (exito) cargarDatos(); // Refrescamos si se borró con éxito
  };

  // CLIENTES Guardar y Eliminar
  const manejarGuardarCliente = async (datos) => {
    if (clienteAEditar) {
      // Si estamos editando, usamos PUT
      await actualizarCliente(clienteAEditar.id, datos);
      setClienteAEditar(null); // Salir del modo edición
    } else {
      await guardarCliente(datos);
    }

    cargarDatos(); // Refrescamos la lista tras guardar
  };

  const manejarEliminarCliente = async (id) => {
    const exito = await eliminarCliente(id);
    if (exito) cargarDatos();
  };

  // Definimos las columnas para cada tabla
  const colEquipos = [
    { label: 'ID', key: 'id' },
    { label: 'Tipo', key: 'tipo' },
    { label: 'Marca', key: 'marca' },
    { label: 'Modelo', key: 'modelo' },
    { label: 'Falla', key: 'descripcion_falla' },
    { label: 'Estado', key: 'estado' }
  ];

  const colClientes = [
    { label: 'ID', key: 'id' },
    { label: 'Nombre', key: 'nombre' },
    { label: 'Apellido', key: 'apellido' },
    { label: 'Teléfono', key: 'telefono' }
  ];

  // Definimos los campos para los formularios
  const camposEquipos = [
    { label: 'Tipo', name: 'tipo' },
    { label: 'Marca', name: 'marca' },
    { label: 'Modelo', name: 'modelo' },
    { label: 'Falla', name: 'descripcion_falla' },
    { label: 'Estado', name: 'estado' }
  ];

  const camposClientes = [
    { label: 'Nombre', name: 'nombre' },
    { label: 'Apellido', name: 'apellido' },
    { label: 'Teléfono', name: 'telefono' }
  ];

  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="p-4 w-100 bg-light" style={{ minHeight: '100vh' }}>
          <Routes>
            {/* VISTA INICIO */}
            <Route path="/" element={
              <div className="text-center mt-5">
                <h1>Sistema LUAN</h1>
                <p>Resumen: {equipos.length} Equipos | {clientes.length} Clientes</p>
              </div>
            } />

            {/* VISTA EQUIPOS */}
            <Route path="/equipos" element={
              <>
                <FormularioGestion  titulo="Gestión de Equipos"
                                    campos={camposEquipos} 
                                    alEnviar={manejarGuardarEquipo} 
                                    datoAEditar={equipoAEditar}
                                    alCancelar={() => setEquipoAEditar(null)}
                                    />
                <TablaGestion datos={equipos} 
                              columnas={colEquipos} 
                              alEliminar={manejarEliminarEquipo} 
                              alEditar={(item) => setEquipoAEditar(item)} 
                              />
              </>
            } />

            {/* VISTA CLIENTES */}
            <Route path="/clientes" element={
              <>
                <FormularioGestion  titulo="Nuevo Cliente" 
                                    campos={camposClientes} 
                                    alEnviar={manejarGuardarCliente} 
                                    datoAEditar={clienteAEditar}
                                    alCancelar={() => setClienteAEditar(null)}
                                    />
                <TablaGestion datos={clientes} 
                              columnas={colClientes} 
                              alEliminar={manejarEliminarCliente}
                              alEditar={(item) => setClienteAEditar(item)} 
                              />
              </>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;