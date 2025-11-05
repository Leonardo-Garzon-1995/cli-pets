import boxen from 'boxen'
import { dog, cat, bear, catRandomSpeech, dogRandomSpeech } from '../lib/pets.js'
import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from "fs/promises"

const FILE = new URL("../lib/myPets.json", import.meta.url)

function save(obj) {
    fs.writeFile(FILE, JSON.stringify(obj, null, 2), "utf-8")
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

    save(answers)

    console.log(chalk.green(`Congratulations! You have adopted a ${answers.species}`))
    setTimeout( () => {
        greetOwner()
    }, 2000)
}

async function getPetInfo() {
    try {
        const data = await fs.readFile(FILE, "utf-8")
        const jsonData = JSON.parse(data)
        if (!jsonData) {
            throw new Error("Wrong JSON")
        }
        return jsonData
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.error(`Error: Invalid JSON format in ${FILE}`)
        } else if (error.code === "ENOENT") {
            console.error(`Error: File ${FILE} not found`)
        } else {
            console.error(`Error: Unable to read file ${FILE}`)
        }
        throw error
    }
}

let petData = await getPetInfo()

export function greetOwner() {
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



let randomIndex = (speech) => { 
    return Math.floor(Math.random() * speech.length)}
export function renderPet() {
    let text = ""
    switch (petData.species) {
        case "dog": 
        text = dogRandomSpeech[randomIndex(dogRandomSpeech)]
        break;
        case  "cat": 
        text = catRandomSpeech[randomIndex(catRandomSpeech)]
        break;
        case "bear": console.log(bear)
        break;

        default:
            console.log("Not pet yet :)")

    }
    console.log(boxen(text, {padding: 1, align: "center", borderColor: "blue",backgroundColor: "cyan"}))
    console.log(petData.species)
}