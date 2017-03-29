//Ingredients Table
import React, { Component } from 'react'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'

import EditTable from './editTableDev'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import {orange500, blue500} from 'material-ui/styles/colors'


const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
  propContainer: {
    width: 200,
    overflow: 'wrap',
    margin: '5px auto 0',
  },
  propToggleHeader: {
    margin: '5px auto 5px',
  },
  ingredientsContainer: {
    width: '100%',
    maxWidth: 700, 
    margin: '0 auto'
  },
  ingredientsHeader: {
    fontSize: '2em',
    fontWeight: '600',
    color: '#000',
    textAlign: 'center'
   },
   ingredientsRow : {
    width: '100%',
    backgroundColor: '#009688'
  },
  colHeader: {
    fontSize: '1.2em',
    fontWeight: '200', 
    color: '#000', 
    textAlign: 'center'
  }
}

const containerStyle = {
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'Roboto, sans-serif'
}

const buttonStyle = {
  display: 'flex',
  flexFlow: 'row nowrap',
  marginTop: 10
}




class AddIngredientsTable extends Component {
constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onChange(row) {
    const ingredientInd = row.id
    console.log('row columns', row.columns);
    let updatedIngredient = {
      quantity: row.columns[0].value,
      units: row.columns[1].value,
      ingredient: row.columns[2].value
    }
    // let updatedIngredient = row.columns.reduce((accum, column) => {

    //   accum[column.ref] = column.value;
    //   return accum;
    // },{})

    console.log(row.id, updatedIngredient);
    this.props.handleChange(ingredientInd, updatedIngredient);
  }


  handleChange(event){
  let value = event.target.value
  let field = event.target.ref
   this.props.handleInputChange(field, value);
  };

  render() {
    let { recipeName, ingredients, directions, forking } = this.props
    recipeName = recipeName || ''
    directions = directions || ''

    let rows = ingredients.map((ingredient, ind) => {
      let col = {columns: [], index: ind}
      Object.keys(ingredient).forEach(key => {
        col.columns.push({value: ingredient[key], ref: key})
      })
      return col;
    })

      const fieldType = this.props.edit === true ? 'TextField' : 'ReadOnly'

      const headers = [
        {value: 'Units', type: fieldType, width: 200},
        {value: 'Amount', type: fieldType, width: 200},
        {value: 'Ingredient', type: fieldType, width: 200} 
      ]
    return (
      <div>
      <div style={{margin: '0 auto'}}>

      <TextField ref="name" defaultValue={recipeName} onChange={this.handleChange} style={{width: 200}}
        floatingLabelText="Recipe Name"
        floatingLabelStyle={styles.floatingLabelStyle}
        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
       />
      </div>

      <div>
        <EditTable forking={this.props.forking}
        onChange={this.onChange}
        rows={rows}
        headerColumns={headers}
      />
      </div>
      <div style={{margin: '0 auto'}}>

      <TextField ref="directions" defaultValue={directions} style={{width: 500, height: 200, border: '1px'}}
      floatingLabelText="Directions"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
    />
      </div>
      </div>
    );
  }
}



export default AddIngredientsTable

