document.addEventListener("DOMContentLoaded", function () {
    // Datos iniciales
    let dataArray = [
        { id: 1, tarea: "Lavar Platos", status: true },
        { id: 2, tarea: "Hacer Aseo", status: false },
        { id: 3, tarea: "Comprar Comida", status: true },
    ];

    let myElement = document.getElementById("btn-add");
    
    myElement.addEventListener("click", add_tarea);
    myElement.addEventListener("submit", add_tarea);

    function carga() {
        let body = document.getElementById("tbody");
        body.innerHTML = "";

        let html = "";
        for (const item of dataArray) {
            let status_check = "";
            if (item.status === true) {
                status_check = "checked";
            }
            let status = (html += "<tr>");
            html += "<td>" + item.id + "</td>";
            html += "<td>" + item.tarea + "</td>";
            html += '<td><input class="miCheckbox" type="checkbox" name="" id="" value= "' + item.id + '" ' + status_check + " ></td>";
            html += '<td><button class="btn-delete" type="button" value-id = "' + item.id + '">X</button></td>';
            html += "</tr>";
        }
        body.innerHTML = html;
        // Obtener el elemento por su clase
        let total = document.querySelector(".total");
        // Asignar el contenido HTML al elemento
        total.innerHTML = dataArray.length;

        admin_check();
        delete_tarea();
        contar_registros_ok();
    }

    function generarID() {
        // Longitud máxima del ID generado
        const maxID = 100;

        let id;
        do {
            // Genera un número aleatorio entre 1 y maxID
            id = Math.floor(Math.random() * maxID) + 1;
        } while (dataArray.some((item) => item.id === id)); // Verifica si el ID ya existe en el array de datos

        return id;
    }
    function add_tarea() {
        let input = document.getElementById("value-nt");
        let input_value = input.value.trim();

        if (input_value !== "" && input_value !== null) {
            let new_element = { id: generarID(), tarea: input.value, status: false };
            dataArray.push(new_element);
        }
        input.value = "";
        carga();
    }

    function contar_registros_ok() {
        let count_tarea_realizada = 0;
        for (const item of dataArray) {
            if (item.status) {
                count_tarea_realizada++;
            }
        }
        let total_registro_ok = document.querySelector(".r-total");
        // Asignar el contenido HTML al elemento
        total_registro_ok.innerHTML = count_tarea_realizada;
    }

    // elimina tarea

    function delete_tarea() {
        // Obtener todos los elementos con la clase 'btn-delete'
        var items_tarea = document.querySelectorAll(".btn-delete");

        // Iterar sobre todos los elementos y agregar el evento 'click' a cada uno
        items_tarea.forEach(function (item_tarea) {
            item_tarea.addEventListener("click", function () {
                // Obtener el ID de la tarea a eliminar
                let id_delete = item_tarea.getAttribute("value-id");
                console.log(id_delete);

                // Filtrar el array dataArray para excluir la tarea con el ID a eliminar
                dataArray = dataArray.filter(function (dataArrayItem) {
                    return dataArrayItem.id != id_delete;
                });

                // Volver a renderizar la lista de tareas en la interfaz de usuario
                carga();
            });
        });
    }
    function admin_check() {
        // Obtener todos los elementos con la clase 'miCheckbox'
        var checkboxes = document.querySelectorAll(".miCheckbox");
        // Iterar sobre todos los elementos y agregar el evento 'change' a cada uno
        checkboxes.forEach(function (checkbox) {
            checkbox.addEventListener("change", function () {
                // Este código se ejecutará cada vez que cambie el estado del checkbox
                let status_check = checkbox.checked;
                let value_check = checkbox.value;
                change_status_check(status_check, value_check);
                carga();
            });
        });
    }

    // cambia en esto del checkbox en la lista
    function change_status_check(status_check, id_tarea) {
        const index = dataArray.findIndex((item) => item.id == id_tarea);

        if (index !== -1) {
            // Verifica que status_check sea un booleano
            if (typeof status_check === "boolean") {
                // Actualiza el estado de la tarea en el array
                dataArray[index].status = status_check;
                console.log("Estado de la tarea editado exitosamente:", dataArray[index]);

                // Llama a una función para actualizar la interfaz de usuario si es necesario
                // carga();
            } else {
                console.log("El estado de la tarea debe ser un booleano.");
            }
        } else {
            console.log("No se encontró ninguna tarea con el ID:", id_tarea);
        }
    }

    carga();
});