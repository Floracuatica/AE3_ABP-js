const empleados = [
  { nombre: "Ana", edad: 32, puesto: "Diseñadora", salario: 4500 },
  { nombre: "Luis", edad: 45, puesto: "Desarrollador", salario: 6000 },
  { nombre: "Carla", edad: 28, puesto: "Marketing", salario: 4000 },
  { nombre: "Pedro", edad: 51, puesto: "Jefe de Ventas", salario: 5200 },
  { nombre: "Sofía", edad: 39, puesto: "RRHH", salario: 4300 },
];

document
  .getElementById("formEmpleado")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const edad = parseInt(document.getElementById("edad").value);
    const puesto = document.getElementById("puesto").value;
    const salario = parseFloat(document.getElementById("salario").value);
    empleados.push({ nombre, edad, puesto, salario });
    actualizarLista();
    e.target.reset();
  });

function actualizarLista() {
  const lista = document.getElementById("listaEmpleados");
  lista.innerHTML = "";
  empleados.forEach((emp) => {
    const senior = emp.edad > 50 ? "👴 Senior" : "";
    lista.innerHTML += `<li class="list-group-item">${emp.nombre} - ${emp.puesto} - ${emp.edad} años - $${emp.salario} ${senior}</li>`;
  });
}

function mostrarOperaciones() {
  let totalSalarios = empleados.reduce((sum, emp) => sum + emp.salario, 0);
  let top = empleados.reduce((max, emp) =>
    emp.salario > max.salario ? emp : max
  );
  let nombres = empleados.map((emp) => emp.nombre).join(", ");
  let sueldosAltos = empleados
    .filter((e) => e.salario > 5000)
    .map((e) => `${e.nombre} ($${e.salario})`)
    .join(", ");

  const ventas = [5000, 5200];
  const desarrollo = [6000, 4100];
  let diferencia = ventas.map((v, i) => Math.abs(v - desarrollo[i] || 0));

  document.getElementById("resultados").innerHTML = `
        <p><strong>👥 Total de empleados:</strong> ${empleados.length}</p>
        <p><strong>💰 Salario total:</strong> $${totalSalarios}</p>
        <p><strong>🏆 Mayor salario:</strong> ${top.nombre} ($${
    top.salario
  })</p>
        <p><strong>📛 Nombres:</strong> ${nombres}</p>
        <p><strong>🚨 Salarios > $5000:</strong> ${
          sueldosAltos || "Ninguno"
        }</p>
        <p><strong>🔁 Diferencias entre ventas y desarrollo:</strong> ${diferencia.join(
          ", "
        )}</p>
      `;
}

actualizarLista();
