import {Hook} from '@oclif/core'
import { argv } from 'process'

const CFonts = require('cfonts')
const cfontConfig = {
	font: 'block',              // define the font face
	align: 'left',              // define text alignment
	colors: ['system'],         // define all colors
	background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
	letterSpacing: 1,           // define letter spacing
	lineHeight: 1,              // define the line height
	space: true,                // define if the output text should have empty lines on top and on the bottom
	maxLength: '0',             // define how many character can be on one line
	gradient: ['green', 'blue'],            // define your two gradient colors
	independentGradient: false, // define if you want to recalculate the gradient for each new line
	transitionGradient: true,  // define if this is a transition between colors directly
	env: 'node'                 // define the environment CFonts is being executed in
}

const hook: Hook<'init'> = async function (opts) {
  if (argv.includes('helpdata')) return
  CFonts.say('openlab', cfontConfig)
}

export default hook
