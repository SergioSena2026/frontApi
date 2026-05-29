import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react'

// Importamos las funciónes que creamos en los servicios
import { obtenerEquipos, guardarEquipo, eliminarEquipo, actualizarEquipo } from './services/equipoService';
import { obtenerClientes, guardarCliente, eliminarCliente, actualizarCliente } from './services/clienteService';

// Importar funciones de Repuestos PHP
import { obtenerRepuestos, guardarRepuesto, eliminarRepuesto, actualizarRepuesto } from './services/repuestoService';

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

  // Estados para control de repuestos (PHP)
  const [repuestos, setRepuestos] = useState([])
  const [repuestoAEditar, setRepuestoAEditar] = useState(null);

  // se activa apenas carga la página
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setEquipos(await obtenerEquipos());
    setClientes(await obtenerClientes());
    // Cargamos los datos desde Apache PHP
    setRepuestos(await obtenerRepuestos());
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

  // REPUESTOS Guardar y Eliminar
  const manejarGuardarRepuesto = async (datos) => {
    if (repuestoAEditar) {
      // Si estamos editando un repuesto, ejecutamos el PUT de PHP
      await actualizarRepuesto(repuestoAEditar.id, datos);
      setRepuestoAEditar(null); // Apagamos el modo edición
    } else {
      // Si es un repuesto nuevo, ejecutamos el POST de PHP
      await guardarRepuesto(datos);
    }
    cargarDatos(); // Actualizamos la tabla
  };

  const manejarEliminarRepuesto = async (id) => {
    const exito = await eliminarRepuesto(id);
    if (exito) cargarDatos(); // Si PHP confirma el borrado, refrescamos la vista
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

  const colRepuestos = [
    { label: 'ID', key: 'id' },
    { label: 'Nombre del Componente', key: 'nombre_repuesto' },
    { label: 'Cantidad Disponible', key: 'cantidad' },
    { label: 'Precio Unitario ($)', key: 'precio' }
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

  const camposRepuestos = [
    { label: 'Nombre del Repuesto', name: 'nombre_repuesto' },
    { label: 'Cantidad', name: 'cantidad', type: 'number' },
    { label: 'Precio', name: 'precio', type: 'number' }
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
                <p className="lead">Panel de Control para Dr Board</p>
                <div className="d-flex justify-content-center gap-3 mt-3">
                  <span className="badge bg-primary p-2">{equipos.length} Equipos</span>
                  <span className="badge bg-info p-2">{clientes.length} Clientes</span>
                  {/* Totalizador del nuevo servicio PHP */}
                  <span className="badge bg-success p-2">{repuestos.length} Repuestos en Stock</span>
                </div>
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
            {/* VISTA REPUESTOS */}
            <Route path="/repuestos" element={
              <>
                <FormularioGestion  titulo="Gestión de Inventario (PHP)" 
                                    campos={camposRepuestos} 
                                    alEnviar={manejarGuardarRepuesto} 
                                    datoAEditar={repuestoAEditar}
                                    alCancelar={() => setRepuestoAEditar(null)}
                                    />
                <TablaGestion datos={repuestos} 
                              columnas={colRepuestos} 
                              alEliminar={manejarEliminarRepuesto}
                              alEditar={(item) => setRepuestoAEditar(item)} 
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