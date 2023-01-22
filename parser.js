/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
const fs = require('fs')
const episodes = require('./episodes.json')
const characters = require('./characters.json')
const locations = require('./locations.json')

const parse = item => {
	if (item instanceof Array) {
		for (let i = 0; i < item.length; i += 1) {
			if (/https:/.test(item[i])) {
				item[i] = item[i].split('/').pop()
			} else {
				parse(item[i])
			}
		}
	} else if (typeof item === 'object') {
		const keys = Object.keys(item)
		for (const key of keys) {
			if (typeof item[key] === 'string' && /https:/.test(item[key])) {
				item[key] = item[key].split('/').pop()
			} else {
				parse(item[key])
			}
		}
	}
}

parse(episodes)
parse(locations)
parse(characters)
fs.writeFileSync('episodes_parsed.json', JSON.stringify(episodes, null, 4))
fs.writeFileSync('locations_parsed.json', JSON.stringify(locations, null, 4))
fs.writeFileSync('characters_parsed.json', JSON.stringify(characters, null, 4))
