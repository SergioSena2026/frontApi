import React from 'react';

const TablaGestion = ({ datos, columnas, alEliminar, alEditar }) => {
    return (
        <div className="table-responsive">
            <table className="table table-hover table-bordered shadow-sm">
                <thead className="table-dark">
                    <tr>
                        {columnas.map((col, index) => (
                            <th key={index}>{col.label}</th>
                        ))}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((item) => (
                        <tr key={item.id}>
                            {columnas.map((col, index) => (
                                <td key={index}>
                                    {/* Lógica para poner color al estado si la columna es 'estado' */}
                                    {col.key === 'estado' ? (
                                        <span className={`badge ${item[col.key] === 'Reparado' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                            {item[col.key]}
                                        </span>
                                    ) : (
                                        item[col.key]
                                    )}
                                </td>
                            ))}
                            <td>
                                <button
                                    className="btn btn-sm btn-outline-primary me-2"
                                    onClick={() => alEditar(item)}
                                >
                                    <i className="bi bi-pencil"></i> Editar
                                </button>

                                {/* Al hacer clic, pedimos confirmación y llamamos a la función alEliminar */}
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => {
                                        if (window.confirm('¿Estás seguro de eliminar este registro en LUAN?')) {
                                            alEliminar(item.id);
                                        }
                                    }}
                                >
                                    <i className="bi bi-trash"></i> Borrar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaGestion;