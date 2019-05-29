import React, { Component } from 'react'

import AppHeader from '../../components/app-header/app-header'
import SearchPanel from '../../components/search-panel/search-panel'
import TodoList from '../../components/todo-list/todo-list'
import ItemStatusFilter from '../../components/item-status-filter/item-status-filter'
import AddItem from '../../components/todo-list-add-item/todo-list-add-item'

import './app.css'

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '',
    filter: 'all' //active, all, done
  };

  createTodoItem(label) {
    return { label, important: false, id: this.maxId++, done: false}
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];
      return {
        todoData: newArray
      };
    });
  };

  addItem = (text) => {
    this.setState(({ todoData }) => {
      const newArray = [
        ...todoData,
        this.createTodoItem(text)
      ];
      return {
        todoData: newArray
      }
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
  };

  search(items, term) {
    if (term === '') {
      return items;
    }
    return items.filter((item) => {
      return item.label
                 .toUpperCase()
                 .indexOf(term.toUpperCase()) > -1;
    });
  }

  onSearchChange = (term) => {
    this.setState({
      term
    })
  };

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    };
  };

  onFilterChange = (filter) => {
    this.setState({
      filter
    })
  };

  render() {

    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter(this.search(todoData, term), filter);

    const doneCount = todoData
      .filter((el) => el.done)
      .length;

    const todoCount = todoData.length - doneCount;

    return (
      <div className='todo-app'>
        <AppHeader toDo={ todoCount } done={ doneCount }/>
        <div className='top-panel d-flex'>
          <SearchPanel onSearchChange={ this.onSearchChange }/>
          <ItemStatusFilter onFilterChange={ this.onFilterChange }
                            filter={ filter }/>
        </div>

        <TodoList
          todos={ visibleItems }
          onDeleted={ this.deleteItem }
          onToggleImportant={ this.onToggleImportant }
          onToggleDone={ this.onToggleDone }
        />

        <AddItem
          addItem={ this.addItem }
        />
      </div>
    )
  }
}
