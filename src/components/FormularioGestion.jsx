import React, { useState, useEffect } from 'react';

const FormularioGestion = ({ campos, alEnviar, titulo, datoAEditar, alCancelar }) => {
  const [datos, setDatos] = useState({});

  // detecta cuando se hace clic en Editar en la tabla
  useEffect(() => {
    if (datoAEditar) {
      setDatos(datoAEditar); // Llena el formulario con los datos viejos
    } else {
      setDatos({}); // Si no hay nada para editar, lo limpia
    }
  }, [datoAEditar]);

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const enviarForm = (e) => {
  e.preventDefault();
  alEnviar(datos);
  setDatos({}); 
};

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white">{titulo}</div>
      <form onSubmit={enviarForm} className="card-body">
        <div className="row">
          {campos.map((campo) => (
            <div className="col-md-6 mb-3" key={campo.name}>
              <label className="form-label">{campo.label}</label>
              <input
                type={campo.type || "text"}
                name={campo.name}
                className="form-control"
                value={datos[campo.name] || ''}
                onChange={manejarCambio}
                required
              />
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-success w-100">Guardar Registro</button>
      </form>
    </div>
  );
};

export default FormularioGestion;