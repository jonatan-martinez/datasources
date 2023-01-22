const axios = require('axios')
const { promises: fs } = require('fs')

const getAllEntities = async entity => {
	const entities = []
	const { data } = await axios.get(`https://rickandmortyapi.com/api/${entity}`)
	entities.push(...data.results)
	let next = data.info.next
	while (next) {
		const { data: pageData } = await axios.get(next)
		next = pageData.info.next
		entities.push(...pageData.results)
	}
	return entities
}
const getAll = async () => {
	const characters = await getAllEntities('character')
	const locations = await getAllEntities('location')
	const episodes = await getAllEntities('episode')
	await fs.writeFile('characters.json', JSON.stringify(characters))
	await fs.writeFile('locations.json', JSON.stringify(locations))
	await fs.writeFile('episodes.json', JSON.stringify(episodes))
}

getAll()
