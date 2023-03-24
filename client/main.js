const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const form = document.querySelector("form")
const goalBox = document.querySelector("#goalBox")

const goalsURL = `http://localhost:4000/api/goals`

const goalsCallback = ({ data: goals }) => displayGoals(goals)
const errCallback = err => console.log(err)

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};
const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
      .then(res => {
        const data = res.data
        alert(data)
    })
  }
const getAllGoals = () => axios.get(goalsURL).then(goalsCallback).catch(errCallback)
const createGoal = body => {
    axios.post(goalsURL, body).then(goalsCallback).catch(errCallback)
}
const deleteGoal = id => {
    axios.delete(`${goalsURL}/${id}`).then(goalsCallback).catch(errCallback)
}
const updateGoal = (id, type) => {
    axios.put(`${goalsURL}/${id}`, {type}).then(goalsCallback).catch(errCallback)
}  
  
function submitHandler(e) {
    e.preventDefault()

    let goal = document.querySelector('#goal')
    let type = document.querySelector('#type')
    let reward = document.querySelector('#reward')
    let quantity = document.querySelector('#quantity')

    let bodyObj = {
        goal: goal.value,
        type: type.value, 
        reward: reward.value,
        quantity: quantity.value
    }

    createGoal(bodyObj)

    goal.value = ''
    type.value = ''
    reward.value = ''
    quantity.checked = false
}

function createGoalCard(goal) {
    const goalCard = document.createElement("div")
    goalCard.classList.add("goal-card")
  
    goalCard.innerHTML = `
    <div id="background">
        <p class="goalText">Goal:<br>${goal.goal}</p>
        <p class="goalText">Type:<br>${goal.type}</p>
     <div id="btnsContainer">
        <button class="mainButtons" onclick="updateGoal(${goal.id}, 'minus')">-</button>
        <p class="goalText">${goal.reward}:</p>
        <p class="goalText">${goal.quantity}</p>
        <button class="mainButtons" onclick="updateGoal(${goal.id}, 'plus')">+</button>
     </div>
      <button class="mainButtons" onclick="deleteGoal(${goal.id})">delete</button>
    </div>  
    `
  
    goalBox.appendChild(goalCard)
  }

  function displayGoals(arr) {
    goalBox.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createGoalCard(arr[i])
    }
}

fortuneBtn.addEventListener('click', getFortune)
complimentBtn.addEventListener('click', getCompliment)
form.addEventListener('submit', submitHandler)

getAllGoals()
