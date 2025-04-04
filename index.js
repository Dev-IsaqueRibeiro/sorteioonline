// document.addEventListener('DOMContentLoaded', () => {
//     const teamQuantityInput = document.getElementById('team-quantity');
//     const teamNameInput = document.getElementById('team-name');
//     const addTeamBtn = document.getElementById('add-team-btn');
//     const participantQuantityInput = document.getElementById(
//         'participant-quantity'
//     );
//     const participantNameInput = document.getElementById('participant-name');
//     const addParticipantBtn = document.getElementById('add-participant-btn');
//     const startDrawBtn = document.getElementById('start-draw-btn');
//     const teamList = document.getElementById('team-list');
//     const participantList = document.getElementById('participant-list');
//     const resultContainer = document.getElementById('result-container');

//     let teams = [];
//     let participants = [];
//     let selectedColor = null;

//     const colorsWithBlackText = [
//         '#f49cbb',
//         '#6c757d',
//         '#ffea00',
//         '#ffffff',
//         '#edc4b3',
//     ];

// Selecionar cor da equipe
// document.querySelectorAll('.color-btn').forEach((btn) => {
//     btn.addEventListener('click', () => {
//         document
//             .querySelectorAll('.color-btn')
//             .forEach((b) => b.classList.remove('selected'));
//         btn.classList.add('selected');
//         selectedColor = btn.getAttribute('data-color');
//         addTeamBtn.disabled = false;
//     });
// });

// Adicionar equipe
// addTeamBtn.addEventListener('click', () => {
//     if (
//         selectedColor &&
//         teamNameInput.value &&
//         teams.length < parseInt(teamQuantityInput.value)
//     ) {
//         const newTeam = {
//             name: teamNameInput.value,
//             color: selectedColor,
//             members: [],
//         };
//         teams.push(newTeam);

//         updateTeamList();
//         teamNameInput.value = '';
//         selectedColor = null;
//         document
//             .querySelectorAll('.color-btn')
//             .forEach((b) => b.classList.remove('selected'));

//         if (teams.length >= parseInt(teamQuantityInput.value)) {
//             addTeamBtn.disabled = true;
//         }
//     }
// });

// Atualizar lista de equipes
// function updateTeamList() {
//     teamList.innerHTML = '';
//     teams.forEach((team, index) => {
//         const teamDiv = document.createElement('div');
//         teamDiv.textContent = `Equipe ${index + 1}: ${team.name}`;
//         teamDiv.style.backgroundColor = team.color;
//         teamDiv.style.color = colorsWithBlackText.includes(team.color)
//             ? 'black'
//             : 'white';
//         teamDiv.style.padding = '10px';
//         teamDiv.style.margin = '5px';
//         teamDiv.style.borderRadius = '5px';
//         teamList.appendChild(teamDiv);
//     });
// }

// Atualizar a lista de participantes numerada
// function updateParticipantList() {
//     participantList.innerHTML = '';
//     participants.forEach((participant, index) => {
//         const listItem = document.createElement('li');
//         listItem.innerHTML = `${index + 1}. ${participant}
//             <button class="edit-btn">✏️</button>
//             <button class="delete-btn">❌</button>`;
//         listItem.style.display = 'flex';
//         listItem.style.alignItems = 'center';
//         listItem.style.justifyContent = 'space-between';
//         listItem.style.marginBottom = '5px';
//         participantList.appendChild(listItem);

//         listItem
//             .querySelector('.edit-btn')
//             .addEventListener('click', () => editParticipant(index));
//         listItem
//             .querySelector('.delete-btn')
//             .addEventListener('click', () => removeParticipant(index));
//     });

// Habilitar/desabilitar botões
//     addParticipantBtn.disabled =
//         participants.length >= parseInt(participantQuantityInput.value);
//     startDrawBtn.disabled =
//         participants.length !== parseInt(participantQuantityInput.value) ||
//         teams.length === 0;
// }

// Adicionar participante
// function addParticipant() {
//     if (
//         participantNameInput.value.trim() &&
//         participants.length < parseInt(participantQuantityInput.value)
//     ) {
//         participants.push(participantNameInput.value.trim());
//         participantNameInput.value = '';
//         updateParticipantList();
//     }
// }

// addParticipantBtn.addEventListener('click', addParticipant);

// Permitir adicionar participante com Enter
// participantNameInput.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter') {
//         event.preventDefault();
//         addParticipant();
//     }
// });

// Editar nome de um participante
// function editParticipant(index) {
//     const newName = prompt('Digite o novo nome:', participants[index]);
//     if (newName && newName.trim()) {
//         participants[index] = newName.trim();
//         updateParticipantList();
//     }
// }

// Remover participante
// function removeParticipant(index) {
//     participants.splice(index, 1);
//     updateParticipantList();
// }

// Iniciar sorteio
// startDrawBtn.addEventListener('click', () => {
//     if (
//         participants.length !== parseInt(participantQuantityInput.value) ||
//         teams.length === 0
//     ) {
//         alert(
//             'Certifique-se de ter a quantidade exata de participantes e equipes antes de sortear.'
//         );
//         return;
//     }

//     let shuffledParticipants = [...participants].sort(
//         () => Math.random() - 0.5
//     );
//     let teamIndex = 0;

//     teams.forEach((team) => {
//         team.members = [];
//     });

//     shuffledParticipants.forEach((participant) => {
//         teams[teamIndex % teams.length].members.push(participant);
//         teamIndex++;
//     });

//     resultContainer.innerHTML = '';
//     displayResultsGradually(teams);
// });

// Exibir resultados de forma gradual
//     function displayResultsGradually(teams) {
//         resultContainer.innerHTML = '';
//         resultContainer.style.display = 'grid';
//         resultContainer.style.gridTemplateColumns = `repeat(${teams.length}, 1fr)`;
//         resultContainer.style.gap = '10px';

//         let teamDivs = teams.map((team) => {
//             const teamDiv = document.createElement('div');
//             teamDiv.style.backgroundColor = team.color;
//             teamDiv.style.color = colorsWithBlackText.includes(team.color)
//                 ? 'black'
//                 : 'white';
//             teamDiv.style.padding = '10px';
//             teamDiv.style.margin = '5px';
//             teamDiv.style.borderRadius = '5px';
//             teamDiv.style.minHeight = '150px';
//             teamDiv.innerHTML = `<h3>${team.name}</h3><p class="members"></p>`;
//             resultContainer.appendChild(teamDiv);
//             return { team, element: teamDiv };
//         });

//         let allMembers = teams.flatMap((team) => team.members);
//         let delay = 0;

//         allMembers.forEach((member, index) => {
//             setTimeout(() => {
//                 let team = teamDivs[index % teams.length];
//                 team.element.querySelector(
//                     '.members'
//                 ).innerHTML += `<p>${member}</p>`;
//             }, delay);
//             delay += 3000;
//         });
//     }
// });
