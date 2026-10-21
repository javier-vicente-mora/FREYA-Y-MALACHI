// Base de datos del rosco con respuestas oficiales
const questionsData = [
    { letter: "A", type: "empieza", answer: "ACTOR", question: "Profesión artística en la que destaca Malachi Barton interpretando personajes en televisión y cine." },
    { letter: "B", type: "empieza", answer: "BARTON", question: "Apellido del joven actor Malachi, conocido por sus papeles en producciones de Disney Channel." },
    { letter: "C", type: "empieza", answer: "CHANNEL", question: "Famoso canal de televisión de Disney en el que trabajan y han protagonizado proyectos tanto Freya Skye como Malachi Barton." },
    { letter: "D", type: "contiene", answer: "DISNEY", question: "Compañía de entretenimiento a la que pertenecen la serie Villanos de Valle Vídeo y la película Zombies 4." },
    { letter: "E", type: "empieza", answer: "INGLATERRA", question: "País de origen de la cantante y actriz Freya Skye (Reino Unido)." },
    { letter: "F", type: "empieza", answer: "FREYA", question: "Nombre de pila de la joven cantante británica que interpretó Lose My Head y se unió al reparto de Zombies 4." },
    { letter: "G", type: "empieza", answer: "GIRL", question: "En inglés, joven artista femenina, categoría en la que destaca Freya Skye como cantante e intérprete." },
    { letter: "H", type: "empieza", answer: "HEAD", question: "Palabra final del éxito musical de Freya Skye en Eurovisión Junior 2022 (Lose My...)." },
    { letter: "I", type: "contiene", answer: "EXITO", question: "Gran logro alcanzado por ambos jóvenes al triunfar internacionalmente en la música y la televisión." },
    { letter: "J", type: "empieza", answer: "JUNIOR", question: "Edición del Festival de Eurovisión (Eurovisión...) en la que compitió Freya Skye representando al Reino Unido." },
    { letter: "K", type: "empieza", answer: "SKYE", question: "Apellido artístico de la cantante y actriz británica Freya." },
    { letter: "L", type: "empieza", answer: "LOSE MY HEAD", question: "Nombre de la canción con la que Freya Skye debutó internacionalmente en el escenario de Eurovisión Junior." },
    { letter: "M", type: "empieza", answer: "MARIA VAQUERA", question: "Fan número 1 de Freya Skye." },
    { letter: "N", type: "contiene", answer: "UNIDO", question: "País europeo (Reino...) al que representó Freya Skye en el certamen musical Eurovisión Junior." },
    { letter: "Ñ", type: "contiene", answer: "NIÑO", question: "Etapa de la vida en la que Malachi Barton comenzó su carrera actoral realizando anuncios y pequeños papeles." },
    { letter: "O", type: "contiene", answer: "ACTUACION", question: "Profesión y disciplina artística a la que se dedican principalmente en pantalla." },
    { letter: "P", type: "empieza", answer: "POP", question: "Género musical principal que canta Freya Skye en sus lanzamientos discográficos." },
    { letter: "Q", type: "contiene", answer: "PEQUEÑOS", question: "Adjetivo para referirse al inicio de la trayectoria de estos actores cuando empezaron muy jóvenes en la industria." },
    { letter: "R", type: "empieza", answer: "REINO UNIDO", question: "Nación a la que representó Freya Skye con la canción Lose My Head." },
    { letter: "S", type: "empieza", answer: "STUCK IN THE MIDDLE", question: "Título en inglés de la serie de Disney Channel (Entre hermanos) donde participó Malachi Barton." },
    { letter: "T", type: "empieza", answer: "TELEVISION", question: "Medio principal donde podemos ver las series de Malachi Barton y los programas de Disney." },
    { letter: "U", type: "contiene", answer: "MUSICA", question: "Arte y disciplina donde destaca Freya Skye con sus canciones y composiciones." },
    { letter: "V", type: "empieza", answer: "VALLE VIDEO", question: "Lugar del título de la serie de Disney Channel Villanos de... donde actúa Malachi Barton." },
    { letter: "W", type: "contiene", answer: "WORLDWIDE", question: "Término en inglés para referirse a la fama global e internacional que están alcanzando estas jóvenes estrellas." },
    { letter: "X", type: "contiene", answer: "EXITOSA", question: "Así se define la carrera en ascenso de estas dos jóvenes promesas de Disney." },
    { letter: "Y", type: "contiene", answer: "SKYE", question: "Apellido de Freya que contiene la letra Y." },
    { letter: "Z", type: "empieza", answer: "ZOMBIES", question: "Famosa saga de películas de Disney Channel a cuyo reparto de la cuarta entrega se ha unido Freya Skye." }
];

// Variables de estado
let currentIndex = 0;
let hits = 0;
let errors = 0;
let questions = [];

// Elementos DOM
const roscoElement = document.getElementById('rosco');
const letterTitle = document.getElementById('letter-title');
const definitionText = document.getElementById('definition-text');
const userInput = document.getElementById('user-input');
const btnSubmit = document.getElementById('btn-submit');
const btnPasapalabra = document.getElementById('btn-pasapalabra');
const hitsDisplay = document.getElementById('hits-count');
const errorsDisplay = document.getElementById('errors-count');
const endModal = document.getElementById('end-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const btnRestart = document.getElementById('btn-restart');
const musicSelect = document.getElementById('music-select');
const bgMusic = document.getElementById('bg-music');
const centerPhoto = document.getElementById('center-photo');


// Normalizar texto
function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/\s+/g, '').trim();
}

// Inicializar el juego
function initGame() {
    hits = 0;
    errors = 0;
    currentIndex = 0;
    hitsDisplay.textContent = hits;
    errorsDisplay.textContent = errors;
    endModal.classList.add('hidden');
    userInput.value = '';
    
    // Restaurar foto original por si se cambió
    centerPhoto.src = "Foto.png";

    questions = questionsData.map(q => ({ ...q, state: 'pending' }));

    renderRosco();
    showCurrentQuestion();
}

// Cambiar Música de Fondo
function changeMusic() {
    const selectedTrack = musicSelect.value;

    if (selectedTrack === 'off') {
        bgMusic.pause();
    } else {
        bgMusic.src = selectedTrack;
        bgMusic.play().catch(e => {
            console.log("Error al reproducir audio:", e);
        });
    }
}

// Renderizar Rosco
function renderRosco() {
    roscoElement.innerHTML = '';
    const totalLetters = questions.length;
    const radius = 190;

    questions.forEach((q, index) => {
        const angle = (index / totalLetters) * 2 * Math.PI - (Math.PI / 2);
        const x = 230 + radius * Math.cos(angle) - 21;
        const y = 230 + radius * Math.sin(angle) - 21;

        const letterDiv = document.createElement('div');
        letterDiv.className = `letter-circle ${q.state}`;
        letterDiv.id = `letter-${index}`;
        letterDiv.textContent = q.letter;
        letterDiv.style.left = `${x}px`;
        letterDiv.style.top = `${y}px`;

        roscoElement.appendChild(letterDiv);
    });
}

// Mostrar pregunta actual
function showCurrentQuestion() {
    if (checkEndGame()) return;

    while (questions[currentIndex].state !== 'pending') {
        currentIndex = (currentIndex + 1) % questions.length;
    }

    document.querySelectorAll('.letter-circle').forEach(el => el.classList.remove('active'));
    const activeLetter = document.getElementById(`letter-${currentIndex}`);
    if (activeLetter) activeLetter.classList.add('active');

    const q = questions[currentIndex];
    const prefix = q.type === "empieza" ? "CON LA" : "CONTIENE LA";
    letterTitle.textContent = `${prefix} ${q.letter}`;
    definitionText.textContent = q.question;
    userInput.value = '';
    userInput.focus();
}

// Comprobar respuesta
function checkAnswer() {
    const userAns = normalizeText(userInput.value);
    if (!userAns) return;

    const currentQ = questions[currentIndex];
    const correctAns = normalizeText(currentQ.answer);

    if (userAns === correctAns) {
        currentQ.state = 'correct';
        hits++;
        hitsDisplay.textContent = hits;

        // SI ACIERTA LA LETRA M, MOSTRAR maria.png
        if (currentQ.letter === "M") {
            centerPhoto.src = "maria.png";
        }
    } else {
        currentQ.state = 'error';
        errors++;
        errorsDisplay.textContent = errors;
    }

    updateRoscoNode(currentIndex, currentQ.state);
    currentIndex = (currentIndex + 1) % questions.length;
    showCurrentQuestion();
}

// Pasapalabra
function passTurn() {
    const currentQ = questions[currentIndex];
    updateRoscoNode(currentIndex, 'pending');
    currentIndex = (currentIndex + 1) % questions.length;
    showCurrentQuestion();
}

// Actualizar nodo del rosco
function updateRoscoNode(index, state) {
    const node = document.getElementById(`letter-${index}`);
    if (node) {
        node.className = `letter-circle ${state}`;
    }
}

// Comprobar fin de juego
function checkEndGame() {
    const hasPending = questions.some(q => q.state === 'pending');
    if (!hasPending) {
        endGame(true, "¡Has completado todas las palabras!");
        return true;
    }
    return false;
}

// Fin de juego
function endGame(completed, reason) {
    modalTitle.textContent = completed && errors === 0 ? "¡ENHORABUENA! ¡HAS GANADO EL BOTE!" : "Juego Terminado";
    modalMessage.textContent = `${reason} Has conseguido ${hits} aciertos y ${errors} fallos.`;
    endModal.classList.remove('hidden');
}

// Event Listeners
btnSubmit.addEventListener('click', checkAnswer);
btnPasapalabra.addEventListener('click', passTurn);
musicSelect.addEventListener('change', changeMusic);

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    } else if (e.key === ' ') {
        if (userInput.value.trim() === '') {
            e.preventDefault();
            passTurn();
        }
    }
});

btnRestart.addEventListener('click', initGame);

window.onload = initGame;