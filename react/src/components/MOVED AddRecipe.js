import React, { Component } from 'react'
import AddRecipeIngredients from './AddRecipeIngredients'
import IngredientsTable from './IngredientsTable'
import $ from 'jquery'
import axios from 'axios'

const styleProps = {
  fixedHeader: true,
  fixedFooter: true,
  stripedRows: false,
  showRowHover: true,
  selectable: false,
  multiSelectable: false,
  enableSelectAll: false,
  deselectOnClickaway: true,
  showCheckboxes: false
}

const testData = {
  recipeName: '',
  recipeDirections: '',
  ingredients: [{quantity: '', units: '', ingredient: ''}],
  creator: '',
  image: '',
  originalRecipe: ''
}

class AddRecipe extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentRecipe: this.props.mainRecipe || testData,
      // recipeName: 'Sugar Recipe',
      // recipeDirections: '',
      // ingredients: [{quantity: 1, units: 'spoonful', ingredient: 'sugar'}, {quantity: 1, units: 'spoonful', ingredient: 'sugar'}],
      // creator: '',
      originalRecipe: this.props.mainRecipe || undefined,
      forking: this.props.mainRecipe !== undefined,
      edit: true
    }
    // this.addRow = this.addRow.bind(this)
    this.handleIngredientsChange = this.handleIngredientsChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRecipeSave = this.handleRecipeSave.bind(this)

    // this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  // componentDidMount () {
  //   var forked = this.context.router.history.location.pathname
  //   let forkedId = forked.slice(forked.lastIndexOf('/') + 1)
  //   let boundThis = this
  //   // if history has url at end
  //   if (forkedId.length > 0) {
  //     console.log('hi')
  //     $.ajax({
  //       url: '/getRecipeById',
  //       type: 'POST',
  //       data: JSON.stringify({id: forkedId}),
  //       contentType: 'application/json',
  //       success: function (data) {
  //         boundThis.setState({
  //           recipeName: data.recipeName,
  //           recipeDirections: data.recipeDirections,
  //           ingredients: data.ingredients
  //         })
  //       },
  //       error: function (err) {
  //         console.error('could not retrieve any recipes for user')
  //       }
  //     })
  //   }
  // }

  handleRecipeSave () {
    const { router } = this.context
    const { originalRecipe } = this.props

    const sendOriginalRecipe = originalRecipe || this.state.currentRecipe
    const { currentRecipe, forking } = this.state

    const reqRoute = forking ? '/api/addForkedRecipe' : '/api/addRecipe'
    const storeRecipe = {currentRecipe, sendOriginalRecipe}
     console.log(storeRecipe)
    axios.post(reqRoute, storeRecipe)
      .then(recipeId => {
        console.log('return value Recipe Saved', recipeId)
        router.history.push('/recipe/' + recipeId)
      })
      .catch(error => {
      console.log(error)
      }); 
  }
  
  handleIngredientsChange (ingredientInd, updatedIngredient) {
    // const target = event.target
    // const name = target.name
    // const value = target.value

    let newIngredients = {
      quantity: updatedIngredient.quantity,
      units: updatedIngredient.units,
      ingredient: updatedIngredient.ingredient
    }

    if (this.state.currentRecipe.ingredients[ingredientInd] === undefined) {
      this.setState((state) => {
        state.currentRecipe.ingredients = state.currentRecipe.ingredients.concat([newIngredients])
        return state
      })
    } else {
      let forkCopy = this.state.currentRecipe
      forkCopy.ingredients[ingredientInd] = newIngredients
      this.setState({currentRecipe: forkCopy}, function () {
        console.log(this.state.currentRecipe)
      })
    }
  }

  handleInputChange (field, value) {
    console.log(field, value)
    let updatedRecipeInfo = this.state.currentRecipe
    updatedRecipeInfo[field] = value
    this.setState({currentRecipe: updatedRecipeInfo}, function () {
      console.log(this.state.currentRecipe)
    })
  }

  handleImageChange(imgString) {
    let currentRecipe = this.state.currentRecipe
    currentRecipe.image = imgString
    this.setState({currentRecipe: currentRecipe})
  }

  render () {
    const { forking, name } = this.state
    const recipeHeader = forking ? 'Fork the Recipe' : 'Add Your Recipe'

    return (

      <div className='createRecipe'>

        <h1>{recipeHeader}</h1>
        <form>

          <IngredientsTable 
            handleRecipeSave={this.handleRecipeSave} 
            handleChange={this.handleIngredientsChange} 
            handleInputChange={this.handleInputChange} 
            handleImageChange={this.handleImageChange} 
            stats={this.state.currentRecipe} 
            isDisabled={!this.state.edit} 
            styleProps={styleProps} 
          />

        </form>
      </div>
    )
  }
}

AddRecipe.contextTypes = {
  router: React.PropTypes.object
}

export default AddRecipe

