// La URL de la API SpringBoot
const API_URL = "http://localhost:8080/api/clientes";

// Traer todos los registros GET
export const obtenerClientes = async () => {
    try {
        // Hacemos la petición al backend
        const respuesta = await fetch(API_URL);

        // Si la respuesta no es buena, lanzamos un error
        if (!respuesta.ok) {
            throw new Error("Error al conectar con la API");
        }

        // Convertimos la respuesta a JSON
        return await respuesta.json();

    } catch (error) {
        console.error("Hubo un fallo en el servicio:", error);
        return []; // Retornamos un arreglo vacío para que el front no se rompa
    }
};

// Guardar registro POST
export const guardarCliente = async (cliente) => {
    const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    });
    return await respuesta.json();
};

// Eliminar registro DELETE
export const eliminarCliente = async (id) => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        return respuesta.ok; // Devuelve true si se borró correctamente
    } catch (error) {
        console.error("Error al eliminar:", error);
        return false;
    }
};

// Actualizar registro PUT
export const actualizarCliente = async (id, datosActualizados) => {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'PUT', // Método para actualizar
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosActualizados)
    });
    return await respuesta.json();
};