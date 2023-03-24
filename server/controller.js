const goals = []
let globalID = 1
module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        const fortunes = ["You have the power to write your own fortune.", "Your ability is appreciated.", "Your ideals are well within your reach.", "Your life will be happy and peaceful.", "Your mind is your greatest asset."]
        
        let fortuneIndex = Math.floor(Math.random() * fortunes.length)
        let randomFortune = fortunes[fortuneIndex]

        res.status(200).send(randomFortune)
    },
    getGoals: (req, res) => {
        res.status(200).send(goals)
    },

    createGoal: (req, res) => {
        const {goal, type, reward, quantity} = req.body

        let newGoal = {
            goal,
            type,
            reward,
            quantity,
            id: globalID
        }
        goals.push(newGoal)
        globalID++
        res.status(200).send(goals)
    },

    deleteGoal: (req, res) => {
        const {id} = req.params
        let index = goals.findIndex((element) => element.id === +id)
        goals.splice(index, 1)
        res.status(200).send(goals)
    },
    updateGoal: (req, res) => {
        const {type} = req.body;
        let index = goals.findIndex((elem) => elem.id === +req.params.id)
        if(type === 'minus' && goals[index].quantity > 1){
            goals[index].quantity--
            res.status(200).send(goals)
        } else if(type === 'plus'){
            goals[index].quantity++
            res.status(200).send(goals)
        } else{
            res.status(400).send('Not an amount')
        }
    }


}
