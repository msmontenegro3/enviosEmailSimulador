document.addEventListener('DOMContentLoaded', function () {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }


    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const inputCC = document.querySelector('#cc')
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    // Asignar eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    inputCC.addEventListener('input', function (e) {
        validarEmail(e.target.value);
        if (e.target.value !== '' && !validarEmail(e.target.value)) {
            mostrarAlerta(`El email no es valido`, e.target.parentElement);
            //email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);
    });
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', function (e) {
        e.preventDefault();

        // reiniciar el objeto
        resetFormulario();
    });

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();

            //Crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000);
    }

    function validar(e) {
        // console.log(e.target.parentElement);
        if (e.target.value.trim() === '') { // .trim elimina los espacios en blanco
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta(`El email no es valido`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignar los valores al objeto email
        email[e.target.name] = e.target.value.trim().toLowerCase();

        // Comprobar el objeto de email
        comprobarEmail();

    }

    function mostrarAlerta(mensaje, referencia) {

        limpiarAlerta(referencia);


        // Generar alerta en HTML
        const error = document.createElement('DIV');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');


        // Inyectar el error al formulario
        referencia.appendChild(error);

    }


    function limpiarAlerta(referencia) {

        const alerta = referencia.querySelector('.bg-red-600');// tomo una de las clases agregadas a la alerta para seleccionarla

        if (alerta) {// elimina la alerta previa
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; // expresion regular

        const resultado = regex.test(email);
        console.log(resultado);
        return resultado;
    }

    function comprobarEmail() {
        // console.log(Object.values(email).includes('')); // toma el objeto de email y lo convierte en un arreglo, despues usa un array method (includes) para saber si todos los valores estan llenos
        if (Object.values(email).includes('')) {

            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }

        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;

    }

    function resetFormulario() {
        // reiniciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();
    }
});