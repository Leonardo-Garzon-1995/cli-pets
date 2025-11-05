import boxen from 'boxen'
import { dog, cat, bear } from '../lib/pets.js'
import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from "fs/promises"

const FILE = new URL("../lib/myPets.json", import.meta.url)

function save(obj) {
    fs.writeFile(FILE, JSON.stringify(obj, null, 2), "utf-8")
}

async function getPetInfo() {
    const data = await fs.readFile(FILE, "utf-8")
    return JSON.parse(data)
}

const petData = 

console.log(petData)

export function greetOwner() {
    console.log(boxen(`Hello ${petData.owner}! Good to see you`, {padding: 1, borderStyle: "round", borderColor: "yellow"}))
    console.log(petData.species)
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
    console.log(chalk.green(`Congratulations! You have adopted a ${answers.species}`))
    setTimeout( () => {
        greetOwner()
    }, 2000)
    
    save(answers)
}

export function renderPet(pet, text) {
    console.log(boxen(text, {padding: 1, align: "center", borderColor: "blue",backgroundColor: "cyan"}))
    console.log(pet)
}