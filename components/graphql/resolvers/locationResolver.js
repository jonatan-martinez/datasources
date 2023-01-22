const getLocationResolver = ({ controller }) => {
	const locationResolver = {
		name: (parent, args, context) => {
			return parent.name
		},
		type: (parent, args, context) => {
			return parent.type
		},
		dimension: (parent, args, context) => {
			return parent.dimension
		},
	}
	return locationResolver
}
module.exports = getLocationResolver
