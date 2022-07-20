module.exports = function({ types: t }) {
  // console.log(t)
  return {
    visitor: {
      ExpressionStatement(path) { // 1
        // console.log('==============================> ExpressionStatement')
        // console.log(path.node.type)
        // console.log('<==================================================')
        
        if(t.isCallExpression(path.node.expression)) { // 2
          if(t.isMemberExpression(path.node.expression.callee)) { // 3
            const memberExp = path.node.expression.callee;
            if(
              memberExp.object.name === 'console' &&  // 4
              memberExp.property.name === 'log'
            ) {
              path.remove();  // 5
            }
          }
        }
      },
    }
  }
}