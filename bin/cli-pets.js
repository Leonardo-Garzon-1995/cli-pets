#!/usr/bin/env node
import { program } from 'commander'
import { greetOwner, adopt, renderPet } from '../lib/commands.js'


program
  .name('cli-pets')
  .description('Terminal Pets you can have fun with')
  .version('1.0.0')

program.command("greet")
  .description("Greet the owner")
  .action(greetOwner)

program.command("adopt")
  .description("Adopt a pet")
  .action(adopt)

program.command("myPet")
  .description("renders pet")
  .action(renderPet)


program.parse()
