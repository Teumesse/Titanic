const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")

const passengersSchema = require("../models/Passengers");
const Passengers = mongoose.model("Passengers", passengersSchema)

let typeResearch = 0

///////////////////////////GET page / //////////////////////////
router.get('/', function (req, res) {

    res.render("titanic")

});
///////////////////////////POST research SEX//////////////////////////
router.post('/research/sex', function (req, res) {
    typeResearch = 1

    res.redirect('http://localhost:3005/titanic/graphic')
})
///////////////////////////POST research AGE//////////////////////////
router.post('/research/age', function (req, res) {
    typeResearch = 2

    res.redirect('http://localhost:3005/titanic/graphic')
})
///////////////////////////POST research CLASSE//////////////////////////
router.post('/research/classe', function (req, res) {
    typeResearch = 3

    res.redirect('http://localhost:3005/titanic/graphic')
});
///////////////////////////POST research SEX et CLASSE //////////////////////////
router.post('/research/SexEtClasse', function (req, res) {
    typeResearch = 4

    res.redirect('http://localhost:3005/titanic/graphic')
});

router.get('/graphic', function (req, res) {
    let labels = []
    let data = []
    let label

    if (typeResearch == 0) {
        res.redirect('http://localhost:3005/titanic')
    } else if (typeResearch == 1) { //////// RECHERCHE PAR SEX //////////
        async function research() {

            let ageTotal = 0
            let counter = 0
            const listPassengersMale = await Passengers.find({ Sex: 'male', Survived: '1' }
            )

            listPassengersMale.map(unPassagerMale => {
                let age = parseInt(unPassagerMale.Age)

                if (!isNaN(age)) {

                    ageTotal += age
                } else {
                    counter++
                }

            })

            vraiMoyenne = ageTotal / (listPassengersMale.length - counter)

            let moy = "Moyenne d'age des hommes survivants : " + Math.round(ageTotal / (listPassengersMale.length - counter)) + " ans."

            let ecart = 0

            listPassengersMale.map(unPassagerMale => {
                let age = parseInt(unPassagerMale.Age)
                if (!isNaN(age)) {

                    ecart += Math.pow((age - vraiMoyenne), 2)

                }

            })

            let variance = ecart / (listPassengersMale.length - counter)

            let ecartType = Math.sqrt(variance)

            let ecType = "L'écart-type pour les hommes est de : " + Math.round(ecartType * 100) / 100 + "."


            ageTotal = 0
            counter = 0
            const listPassengersFemale = await Passengers.find({ Sex: 'female', Survived: '1' }
            )
            listPassengersFemale.map(unPassagerFemelle => {
                let age = parseInt(unPassagerFemelle.Age)

                if (!isNaN(age)) {

                    ageTotal += age
                } else {
                    counter++
                }

            })

            vraiMoyenne = ageTotal / (listPassengersFemale.length - counter)

            moy += " Moyenne d'age des femmes survivants : " + Math.round(ageTotal / (listPassengersFemale.length - counter)) + " ans."

            ecart = 0

            listPassengersFemale.map(unPassagerFemelle => {
                let age = parseInt(unPassagerFemelle.Age)
                if (!isNaN(age)) {

                    ecart += Math.pow((age - vraiMoyenne), 2)

                }

            })

            variance = ecart / (listPassengersFemale.length - counter)

            ecartType = Math.sqrt(variance)

            ecType += "   L'écart-type pour les femmes est de : " + Math.round(ecartType * 100) / 100 + "."


            data.push(listPassengersMale.length, listPassengersFemale.length)

            labels = ['Homme', 'Femme']

            let configgg = {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '# of Votes',
                        data: data,
                        borderWidth: 1
                    }]
                }
            }

            label = "Nombre de survivantes en fonction de leurs sexes"
            res.render('graphic', { label: label, config: configgg, moyenne: moy, ecartType: ecType })

        }

        research()
    } else if (typeResearch == 2) { //////// RECHERCHE PAR AGE //////////
        let age10 = []
        let age20 = []
        let age30 = []
        let age40 = []
        let age50 = []
        let age60 = []
        let age70 = []
        let age80 = []
        let ageUnknow = []
        let ageTotal = 0
        async function research() {
            const listPassengers = await Passengers.find({ Survived: '1' })

            listPassengers.map(unPassager => {
                let age = parseInt(unPassager.Age)

                if (!isNaN(age)) {

                    ageTotal += age
                }
                if ((age > 0 && age <= 10)) {
                    age10.push(age)
                } else if ((age > 10 && age <= 20)) {
                    age20.push(age)
                } else if ((age > 20 && age <= 30)) {
                    age30.push(age)
                } else if ((age > 30 && age <= 40)) {
                    age40.push(age)
                } else if ((age > 40 && age <= 50)) {
                    age50.push(age)
                } else if ((age > 50 && age <= 60)) {
                    age60.push(age)
                } else if ((age > 60 && age <= 70)) {
                    age70.push(age)
                } else if ((age > 70 && age <= 80)) {
                    age80.push(age)
                } else {
                    ageUnknow.push(ageUnknow)
                }

            })
            let vraiMoyenne = ageTotal / (listPassengers.length - ageUnknow.length)

            let moy = "Moyenne d'age des survivants : " + Math.round(ageTotal / (listPassengers.length - ageUnknow.length)) + " ans"
            let ecart = 0

            listPassengers.map(unPassager => {
                let age = parseInt(unPassager.Age)
                if (!isNaN(age)) {

                    ecart += Math.pow((age - vraiMoyenne), 2)

                }

            })



            let variance = ecart / (listPassengers.length - ageUnknow.length)

            let ecartType = Math.sqrt(variance)

            let ecType = "L'écart-type est de : " + Math.round(ecartType * 100) / 100
            data.push(
                age10.length,
                age20.length,
                age30.length,
                age40.length,
                age50.length,
                age60.length,
                age70.length,
                age80.length,
                ageUnknow.length
            )
            labels = ['1-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', 'Age inconnu']


            let configgg = {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: '# of Votes',
                            data: data,
                            borderWidth: 1,
                            order: 1
                        }
                    ]
                }
            }

            label = "Nombre de survivantes en fonction de leurs âges"
            res.render('graphic', { label: label, config: configgg, moyenne: moy, ecartType: ecType })

        }
        research()

    } else if (typeResearch == 3) { //////// RECHERCHE PAR CLASSE //////////
        async function research() {
            const listPassengersClasseUn = await Passengers.find({ Pclass: '1', Survived: '1' }
            )
            const listPassengersClasseDeux = await Passengers.find({ Pclass: '2', Survived: '1' }
            )
            const listPassengersClasseTrois = await Passengers.find({ Pclass: '3', Survived: '1' }
            )
            const listPassager = await Passengers.find({ Survived: '1' })

            let nbClasse = listPassengersClasseUn.length + listPassengersClasseDeux.length * 2 + listPassengersClasseTrois.length * 3


            let nbPassager = listPassengersClasseUn.length + listPassengersClasseDeux.length + listPassengersClasseTrois.length

            let vraiMoyenne = nbClasse / nbPassager

            let moy = "Moyenne de la classe des survivants : " + Math.round((nbClasse / nbPassager) * 100) / 100

            let ecart = 0

            listPassager.map(unPassager => {
                let classe = parseInt(unPassager.Pclass)


                ecart += Math.pow((classe - vraiMoyenne), 2)



            })

            let variance = ecart / listPassager.length

            let ecartType = Math.sqrt(variance)

            let ecType = "L'écart-type est de : " + Math.round(ecartType * 100) / 100 + "."



            data.push(listPassengersClasseUn.length, listPassengersClasseDeux.length, listPassengersClasseTrois.length)

            labels = ['Première Classe', 'Deuxième Classe', 'Troisième Classe']

            let configgg = {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '# of Votes',
                        data: data,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            }

            label = "Nombre de survivantes en fonction de leurs classes"
            res.render('graphic', { label: label, config: configgg, moyenne: moy, ecartType: ecType })

        }
        research()
    } else if (typeResearch == 4) { //////// RECHERCHE PAR SEX ET CLASSE //////////

        async function research() {
            const listPassengersClasseUnHomme = await Passengers.find({ Sex: 'male', Pclass: '1', Survived: '1' }
            )
            const listPassengersClasseDeuxHomme = await Passengers.find({ Sex: 'male', Pclass: '2', Survived: '1' }
            )
            const listPassengersClasseTroisHomme = await Passengers.find({ Sex: 'male', Pclass: '3', Survived: '1' }
            )
            const listPassengersClasseUnFemme = await Passengers.find({ Sex: 'female', Pclass: '1', Survived: '1' }
            )
            const listPassengersClasseDeuxFemme = await Passengers.find({ Sex: 'female', Pclass: '2', Survived: '1' }
            )
            const listPassengersClasseTroisFemme = await Passengers.find({ Sex: 'female', Pclass: '3', Survived: '1' }
            )

            const listPassagerHomme = await Passengers.find({ Sex: 'male', Survived: '1' })
            const listPassagerFemme = await Passengers.find({ Sex: 'female', Survived: '1' })

            let nbClasse = listPassengersClasseUnHomme.length + listPassengersClasseDeuxHomme.length * 2 + listPassengersClasseTroisHomme.length * 3

            let nbPassager = listPassengersClasseUnHomme.length + listPassengersClasseDeuxHomme.length + listPassengersClasseTroisHomme.length

            let vraiMoyenne = nbClasse / nbPassager

            let moy = "Moyenne de la classe des hommes survivants : " + Math.round((nbClasse / nbPassager) * 100) / 100+"."

            let ecart = 0

            listPassagerHomme.map(unPassagerHomme => {
                let classe = parseInt(unPassagerHomme.Pclass)


                ecart += Math.pow((classe - vraiMoyenne), 2)



            })

            let variance = ecart / listPassagerHomme.length

            let ecartType = Math.sqrt(variance)

            let ecType = "L'écart-type pour les hommes est de : " + Math.round(ecartType * 100) / 100 + "."


            let nbClasseFemme = listPassengersClasseUnFemme.length + listPassengersClasseDeuxFemme.length * 2 + listPassengersClasseTroisFemme.length * 3

            let nbPassagerFemme = listPassengersClasseUnFemme.length + listPassengersClasseDeuxFemme.length + listPassengersClasseTroisFemme.length

            vraiMoyenne = nbClasseFemme / nbPassagerFemme

            moy += "    Moyenne de la classe des femmes survivants : " + Math.round((nbClasseFemme / nbPassagerFemme) * 100) / 100 +"."

            ecart = 0

            listPassagerFemme.map(unPassagerFemme => {
                let classe = parseInt(unPassagerFemme.Pclass)

                ecart += Math.pow((classe - vraiMoyenne), 2)

            })

            variance = ecart / listPassagerFemme.length

            ecartType = Math.sqrt(variance)

            ecType += "  L'écart-type pour les femmes est de : " + Math.round(ecartType * 100) / 100 + "."



            data.push(listPassengersClasseUnHomme.length, listPassengersClasseDeuxHomme.length, listPassengersClasseTroisHomme.length,
                listPassengersClasseUnFemme.length, listPassengersClasseDeuxFemme.length, listPassengersClasseTroisFemme.length)

            labels = ['Homme Première Classe', 'Homme Deuxième Classe', 'Homme Troisième Classe',
                'Femme Première Classe', 'Femme Deuxième Classe', 'Femme Troisième Classe']

            let configgg = {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '# of Votes',
                        data: data,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            }

            label = "Nombre de survivantes en fonction de leurs classes et de leurs sexs"
            res.render('graphic', { label: label, config: configgg, moyenne: moy, ecartType: ecType })

        }
        research()

    }




});

module.exports = router;

