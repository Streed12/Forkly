import React, { Component } from 'react'
import axios from 'axios'

import TabBarUser from '../tabBarUser/TabBarUser'

import style from './profilePageUser-css'
import NotificationsIcon from 'material-ui/svg-icons/social/Notifications'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import Badge from 'material-ui/Badge'

const { dashboard, leftDashboard, rightDashboard, statsBar, profilePic, statDetail, container } = style

/* * state, setStateThroughProps are passed in as Props * */
/* * state = {userID, userName, recipes, originalRecipes} * */
class ProfilePageUser extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount () {
    axios.get('/api/users/user')
    .then(result => {
      console.log('this', this)
      const { name, _id, recipes, originalRecipes,  } = result.data
      this.props.setStateThroughProps(null, {
        userID: _id,
        username: name,
        userName: name,
        recipes: recipes,
        originalRecipes: originalRecipes
      })
    })
    .catch(err => console.log('ProfilePageUser axios error: ', err))
  }

  render() {
    const { state, setRecipeState, setTabView, setStateThroughProps, renderSelectedRecipe } = this.props
    const orderedRecipes = []
    const forkedRecipes = []
    const usersRecipes = []

    state.recipes.forEach(recipe => {
      orderedRecipes.unshift(recipe)
      usersRecipes.push(recipe)
      forkedRecipes.push(recipe)
      // recipe.creator === state.userID ? usersRecipes.push(recipe) : forkedRecipes.push(recipe)
    })

    return (
      <div style={container}>
        <div style={dashboard}>
          <div style={leftDashboard}>
            <h2>{state.userID}</h2>
            <Paper style={profilePic} circle />
          </div>
          <div style={rightDashboard}>
            <div style={rightDashboard}>
              <Paper style={statsBar} >

                <Paper style={statDetail} >
                  <h4>User's Recipes</h4>
                  <p>{usersRecipes.length}</p>
                </Paper>

                <Paper style={statDetail}>
                  <h4>Forks</h4>
                  <p>{forkedRecipes.length}</p>
                </Paper>

                <Paper style={statDetail}>
                  <h4>Been Forked</h4>
                  <p>17</p>
                </Paper>
              </Paper>
            </div>
          </div>
        </div>
        <div>
          <TabBarUser setTabView={setTabView} state={state} setStateThroughProps={setStateThroughProps} setRecipeState={setRecipeState} recipeStats={{orderedRecipes, forkedRecipes, usersRecipes}} renderSelectedRecipe={renderSelectedRecipe} />
        </div>
      </div>
    )
  }
}

export default ProfilePageUser
