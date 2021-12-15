const { GraphQLScalarType, Kind } = require('graphql')

module.exports = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'DateTime Scalar Type',
        
        parseValue(value) {
            return new Date(value)
        },
        
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10)
            } 
            
            return null
        },
        
        serialize(value) {
            const date = new Date(value)
            return date.toISOString()
        }
    })

}