import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Header } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import '../styles/Filter.css';

import FilterList from '../components/FilterList';

import {
  addFilter as _addFilter,
  removeFilter as _removeFilter
} from '../../common/actionCreators/data';

const operatorOptions = [{
  key: 'eq',
  value: '=',
  text: 'Equals'
}, {
  key: 'gt',
  value: '>',
  text: 'Greater Than'
}, {
  key: 'lt',
  value: '<',
  text: 'Less Than'
}, {
  key: 'in',
  value: 'in',
  text: 'Is In',
}, {
  key: 'notin',
  value: 'not in',
  text: 'Is Not In',
}, {
  key: 'before',
  value: 'before',
  text: 'Is Before'
}, {
  key: 'after',
  value: 'after',
  text: 'Is After'
}]

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operator: operatorOptions[0].value,
      field: '',
      value: '',
    }
    this.addFilter = this.addFilter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cleanInput = this.cleanInput.bind(this);
  }

  addFilter(e){
    e.preventDefault();
    const { field, operator, value } = this.state;
    const { addFilter } = this.props;
    addFilter({ field, operator, value})
    this.setState({
      operator: operatorOptions[0].value,
      field: '',
      value: '',
    });
  }

  getValueInputType(){
    const { operator } = this.state;
    switch(operator) {
      case '>':
      case '<':
        return 'number'
      default:
        return 'text'
    }
  }

  cleanInput(input) {
    const { operator } = this.state;
    switch(operator) {
      case 'in':
      case 'not in':
        return input.replace(/\s/g, '')
      default:
        return input
    }
  }
  
  getValuePlaceholder() {
    const { operator } = this.state;
    switch(operator) {
      case 'in':
      case 'not in':
        return 'Comma seperated values'
      default:
        return 'Value'
    }
  }

  handleChange(field, value) {
    this.setState({
      [field]: value
    })
  }

  render() {
    const { columns } = this.props;
    const fieldOptions = columns.map(field => ({
      key: field,
      value: field,
      text: field
    }))
    const { filters, removeFilter } = this.props;
    const { operator, field, value } = this.state;
    return (
      <React.Fragment>
        <Header as="h4">Active Filters</Header>
        <FilterList filters={filters} removeFilter={removeFilter}/>
        <Header as="h4">Add Filter</Header>
        <Form onSubmit={this.addFilter}>
          <Form.Group widths='equal'>
            <Form.Select 
              fluid
              required
              label='Field' 
              options={fieldOptions} 
              placeholder='Field'
              value={field}
              onChange={(e, data) => this.handleChange('field', data.value)}
            />
            <Form.Select 
              fluid
              required
              label='Operator' 
              options={operatorOptions} 
              placeholder='Operator'
              value={operator}
              onChange={(e, data) => this.handleChange('operator', data.value)}
            />
            {
              ['before', 'after'].includes(operator) ? (
                <Form.Input
                  required
                  control={SemanticDatepicker}
                  className="date-picker-filter-input"
                  onDateChange={date => this.handleChange('value', date)}
                  value={value}
                  label="Value"
                />
                ) : (
                <Form.Input
                  fluid 
                  required
                  label='Value' 
                  type={this.getValueInputType()}
                  placeholder={this.getValuePlaceholder()} 
                  value={value}
                  onChange={(e, data) => this.handleChange('value', this.cleanInput(data.value))}
                />
              )
            }
          </Form.Group>
          <Form.Button color="teal" content="Add Filter" size="small"/>
        </Form>
      </React.Fragment>
    )
  }
} 

const mapStateToProps = state => ({
  filters: state.data.filters,
  columns: state.data.columns
})

const mapDispatchToProps = dispatch => ({
  addFilter: bindActionCreators(_addFilter, dispatch),
  removeFilter: bindActionCreators(_removeFilter, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter);