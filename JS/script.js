let entrenador;

// Inicio de aventura
// document.getElementById("btnInicio").addEventListener("click", function() {
//     document.getElementById("intro").classList.remove("oculto");
// });

// Validación nombre de usuario
document.getElementById("btn-nombre").addEventListener("click", function() {
    const nombre = document.getElementById("nombre").value.trim();
    const resultado = validarNombre(nombre);

    switch (resultado) {
        case "null":
            alert("Por lo que veo, no has ingresado ningún nombre");
            break;
        case "numero":
            alert("Un nombre no tiene números");
            break;
        case "corto":
            alert("Tu nombre debe tener 3 letras como mínimo");
            break;
        default:
            entrenador = nombre.toUpperCase();
            // Guardar el nombre del entrenador en localStorage
            localStorage.setItem('entrenador', entrenador);
            alert("¡Saludos " + entrenador + "! Soy el profesor Oak.");
            document.getElementById("intro").classList.add("oculto");
            document.getElementById("seleccionPokebola").classList.remove("oculto");
            break;
    }
});

// Validación nombre pokemon
document.querySelectorAll("#seleccionPokebola .btnPokebola").forEach(button => {
    button.addEventListener("click", function() {
        const pokebola = button.getAttribute("data-pokemon");
        let pokemon;

        switch (pokebola) {
            case "1":
                pokemon = "CHARMANDER";
                break;
            case "2":
                pokemon = "SQUIRTLE";
                break;
            case "3":
                pokemon = "BULBASAUR";
                break;
        }

        // Guardar pokemon seleccionado - localStorage
        localStorage.setItem('pokemon', pokemon);
        alert("¡Felicitaciones! " + entrenador + " has conseguido a " + pokemon);
        document.getElementById("seleccionPokebola").classList.add("oculto");
        document.getElementById("pokedex").classList.remove("oculto");
    });
});

// Simulación encuentro de Pokémon salvaje
document.getElementById("btnAventura").addEventListener("click", function() {
    const pokemonAleatorio = nombreAzar();
    document.getElementById("resultado").innerHTML = `<p>${datos(pokemonAleatorio)}</p>`;
});

// Filtrar Pokémon por tipo
document.getElementById("btnFiltrar").addEventListener("click", function() {
    const tipo = document.getElementById("inputTipo").value.trim();
    const pokemonsFiltrados = filtrarPorTipo(tipo);
    
    const mensaje = pokemonsFiltrados.length > 0
        ? `Pokémon de tipo ${tipo}:\n${pokemonsFiltrados.map(pokemon => datos(pokemon)).join('\n\n')}`
        : `No se encontraron Pokémon de tipo ${tipo}`;

    alert(mensaje);
    document.getElementById("resultado").innerText = mensaje;
});

// Simulación de una pelea entre dos Pokémon
document.getElementById("btnSimularPelea").addEventListener("click", function() {
    const pokemon1 = nombreAzar();
    const pokemon2 = nombreAzar();
    
    if (pokemon1.nombre === pokemon2.nombre) {
        alert("El mismo Pokémon fue seleccionado dos veces. Simulando otra vez...");
        return;
    }
    
    const contenedorPelea = document.createElement("div");
    
    const mensajeInicial = document.createElement("p");
    mensajeInicial.textContent = `${pokemon1.nombre} VS ${pokemon2.nombre}`;
    contenedorPelea.appendChild(mensajeInicial);
    
    const fuerzaPokemon1 = (pokemon1.fuerza || 0) - (pokemon2.defensa || 0);
    const fuerzaPokemon2 = (pokemon2.fuerza || 0) - (pokemon1.defensa || 0);
    
    const resultado = fuerzaPokemon1 > fuerzaPokemon2
        ? `${pokemon1.nombre} ha ganado la pelea!`
        : fuerzaPokemon1 < fuerzaPokemon2
        ? `${pokemon2.nombre} ha ganado la pelea!`
        : "La pelea terminó en empate.";
    
    const mensajeResultado = document.createElement("p");
    mensajeResultado.textContent = resultado;
    contenedorPelea.appendChild(mensajeResultado);
    
    document.getElementById("resultado").innerHTML = '';
    document.getElementById("resultado").appendChild(contenedorPelea);
});

function validarNombre(nombre) {
    return !nombre || nombre.length < 3 ? (nombre === "" ? "null" : "corto") : !isNaN(nombre) ? "numero" : "valido";
}


// Array con nombres e información sobre Pokemons
const pokemons = [
    {nombre: "Eevee", tipo: "Normal", fuerza: 55, defensa: 50, evolucion: 1, fuerte: "", debil: "Lucha"},
    {nombre: "Gengar", tipo: "Veneno", fuerza: 65, defensa: 60, evolucion: 3, fuerte: "Psíquico", debil: "Tierra"},
    {nombre: "Toxapex", tipo: "Veneno", fuerza: 75, defensa: 50, evolucion: 2, fuerte: "Psíquico", debil: "Tierra"},
    {nombre: "Dragonite", tipo: "Dragón", fuerza: 134, defensa: 95, evolucion: 3, fuerte: "Hierba, Lucha", debil: "Hielo, Roca"},
    {nombre: "Lucario", tipo: "Lucha", fuerza: 110, defensa: 70, evolucion: 2, fuerte: "Hielo, Roca", debil: "Fuego, Lucha, Tierra"},
    {nombre: "Gardervoir", tipo: "Psíquico", fuerza: 85, defensa: 65, evolucion: 3, fuerte: "Lucha", debil: "Veneno, Acero"},
    {nombre: "Alakazam", tipo: "Psíquico", fuerza: 120, defensa: 45, evolucion: 3, fuerte: "Lucha, Veneno", debil: "Bicho, Fantasma"}
];

// Función para obtener un Pokémon al azar
function nombreAzar() {
    const nombre = Math.floor(Math.random() * pokemons.length);
    return pokemons[nombre];
}

// Función para mostrar los datos del Pokémon
function datos(pokemon) {
    return `Nombre: ${pokemon.nombre}\nTipo: ${pokemon.tipo}\nFuerza: ${pokemon.fuerza}\nDefensa: ${pokemon.defensa}\nEvolución: ${pokemon.evolucion}\nFuerte contra: ${pokemon.fuerte}\nDébil contra: ${pokemon.debil}`;
}

// Función para filtrar Pokémon por tipo
function filtrarPorTipo(tipo) {
    return pokemons.filter(pokemon => pokemon.tipo.toLowerCase() === tipo.toLowerCase());
}
