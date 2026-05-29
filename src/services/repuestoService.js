// La URL de la API PHP en XAMPP
const API_URL = "http://localhost/api_php/controller/RepuestoController.php";

// Traer todos los registros (GET)
export const obtenerRepuestos = async () => {
    try {
        const respuesta = await fetch(API_URL);
        
        if (!respuesta.ok) {
            throw new Error("Error al conectar con la API de PHP");
        }

        return await respuesta.json();
    } catch (error) {
        console.error("Hubo un fallo en el servicio de repuestos:", error);
        return []; // Retornamos un arreglo vacío en caso de falla para no romper la tabla
    }
};

// Guardar registro (POST)
export const guardarRepuesto = async (repuesto) => {
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(repuesto)
        });
        return await respuesta.json();
    } catch (error) {
        console.error("Error al guardar el repuesto:", error);
    }
};

// Actualizar registro (PUT)
export const actualizarRepuesto = async (id, datosActualizados) => {
    try {
        // Combinamos el ID con los datos modificados porque PHP lo espera todo dentro del JSON
        const cuerpoPeticion = { id, ...datosActualizados };

        const respuesta = await fetch(API_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cuerpoPeticion)
        });
        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar el repuesto:", error);
    }
};

// Eliminar registro (DELETE)
export const eliminarRepuesto = async (id) => {
    try {
        const respuesta = await fetch(API_URL, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id }) // PHP necesita el objeto con el ID en el body
        });
        return respuesta.ok;
    } catch (error) {
        console.error("Error al eliminar el repuesto:", error);
        return false;
    }
};