'use strict'

let Search = require('../src/core')

let data = [
	{
		name: 'Carla',
		telephone: '90860284639',
		description: 'friend'
	},
	{
		name: 'Carla',
		telephone: '90860284639',
		description: 'work'
	},
	{
		name: 'Rita',
		telephone: '56473839',
		description: 'work'
	},
	{
		name: 'Riccarda',
		telephone: '12343253535',
		description: 'mother'
	},

]

console.log(Search.search('carla', data))
/* 	[ 
		{ 
		name: 'Carla',
    	telephone: '90860284639',
    	description: 'friend' 
    	},
  		{ name: 'Carla', 
  		telephone: '90860284639', 
  		description: 'work' 
  		} 
  	]
 */

console.log(Search.search('work', data))

console.log(Search.search('carla|rita', data))

console.log(Search.search('carla work', data))

console.log(Search.search('carla|rita|riccarda', data))