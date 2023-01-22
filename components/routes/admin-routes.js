const bodyParser = require('body-parser')

module.exports = () => {
	const start = async ({ manifest = {}, app, tracker }) => {
		app.use(bodyParser.json())

		app.get('/__/manifest', (req, res) => res.json(manifest))
		app.get('/info', async (req, res) => {
			const info = tracker.getTrackInfo()
			return res.json(info)
		})
	}

	return { start }
}
