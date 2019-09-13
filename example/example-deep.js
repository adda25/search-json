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
		description: 'work',
		other: {
			ty: '--deep--'
		}
	},
	{
		name: 'Rita',
		telephone: '56473839',
		description: 'work',
		other: {
			name: 'pippo',
			otherdata: {
				cc: 'secret'
			}
		}
	},
	{
		name: 'Riccarda',
		telephone: '12343253535',
		description: 'mother',
		other: ['francy', 'mauri', {tty: 'serial'}]
	}
]

/** Case 1
* no deep 
*/
console.log(Search.search('carl', data))
/*
[ { name: 'Carla',
    telephone: '90860284639',
    description: 'friend' },
  { name: 'Carla',
    telephone: '90860284639',
    description: 'work',
    other: { ty: '--deep--' } } ]
*/


/** Case 2
* empty results because no deep
*/
console.log(Search.search('secret', data))
/*
[]
*/

/** Case 3
* empty results because deep but with wrong keys selector
*/
console.log(Search.search('mother', data, {deep: true, keys: ['other']}))
/*
[]
*/

/** Case 3
* deep, search everywhere
*/
console.log(Search.search('serial', data, {deep: true}))
/*
[ { name: 'Riccarda',
    telephone: '12343253535',
    description: 'mother',
    other: [ 'francy', 'mauri', [Object] ] } ]
*/