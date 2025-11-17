import boxen from 'boxen'
import { dog, cat, bear, catRandomSpeech, dogRandomSpeech } from '../lib/pets.js'
import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from "fs/promises"

const FILE = new URL("../lib/myPets.json", import.meta.url)

async function save(obj) {
    try {
        await fs.writeFile(FILE, JSON.stringify(obj, null, 2), "utf-8")
    } catch (error) {
        if(error.code === "ENOENT") {
            await fs.writeFile(FILE, JSON.stringify(obj, null, 2), "utf-8")
        }
    }
}

export async function adopt() {

    const answers = await inquirer.prompt([
        {
            name: "species",
            message: "What species do you want to adopt?",
            type: "list",
            choices: ["dog", "cat", "bear"]
        },
        {
            name: "name",
            message: "Name your pet",
            type: "input",
            default: "Buddy"
        },
        {
            name: "owner",
            message: "What is your name",
            type: "input",
            default: "Owner"
        }
    ])

    await save(answers)

    console.log(chalk.green(`Congratulations! You have adopted a ${answers.species}`))
    setTimeout( () => {
        greetOwner()
    }, 2000)
}

async function getPetInfo() {
    try {
        const data = await fs.readFile(FILE, "utf-8")
        const jsonData = data ? JSON.parse(data) : {}
        if (!jsonData) {
            throw new Error("No data found in file")
        }
        return jsonData
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.error(`Error: Invalid JSON format in ${FILE}`)
        } else if (error.code === "ENOENT") {
            return {}
        } else {
            console.error(`Error: Unable to read file ${FILE}`)
        }
        throw error
    }
}



export async function greetOwner() {
    const petData = await getPetInfo()
    console.log(boxen(`Hello ${petData.owner}! Good to see you`, {padding: 1, borderStyle: "round", borderColor: "yellow"}))
    
    switch (petData.species) {
        case "dog": console.log(dog)
        break;
        case  "cat": console.log(cat)
        break;
        case "bear": console.log(bear)
        break;

        default:
            console.log("Not pet yet :)")

    }
    
}



let randomIndex = (arr) => { 
    return Math.floor(Math.random() * arr.length)}
export async function renderPet() {
    const petData = await getPetInfo()

    let text = ""
    let pet
    switch (petData.species) {
        case "dog": 
        text = dogRandomSpeech[randomIndex(dogRandomSpeech)]
        pet = dog
        break;
        case  "cat": 
        text = catRandomSpeech[randomIndex(catRandomSpeech)]
        pet = cat
        break;
        case "bear": console.log(bear)
        pet = bear
        break;

        default:
            console.log("Not pet yet :)")

    }
    console.log(boxen(text, {padding: 1, align: "center", borderColor: "blue",backgroundColor: "cyan"}))
    console.log(pet)
}