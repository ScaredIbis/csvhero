export const FILE_CHOSEN = 'FILE_CHOSEN';
export const IMPORT_COMPLETE = 'IMPORT_COMPLETE';
export const FETCH_FILTERED_ROWS_SUCCESS = 'FETCH_FILTERED_ROWS_SUCCESS';
export const FETCH_FILTERED_ROWS_REQUESTED = 'FETCH_FILTERED_ROWS_REQUESTED';
export const ROW_FILTER_UPDATED = 'ROW_FILTER_UPDATED';
export const TOTAL_ROWS_COUNTED = 'TOTAL_ROWS_COUNTED';
export const COUNT_TOTAL_ROWS = 'COUNT_TOTAL_ROWS';
export const ADD_FILTER = 'ADD_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';
export const SET_FILTERS = 'SET_FILTERS';
export const COLUMNS_UPDATED = 'COLUMNS_UPDATED';
export const APPLY_BULK_EDIT = 'APPLY_BULK_EDIT';
export const BULK_EDIT_START = 'BULK_EDIT_START';
export const BULK_EDIT_COMPLETE = 'BULK_EDIT_COMPLETE';
export const ROW_UPDATED = 'ROW_UPDATED';
export const SET_ROWS = 'SET_ROWS';
export const RESET_DEMO_DATA = 'RESET_DEMO_DATA';

let columnsStr = localStorage.getItem(process.env.REACT_APP_COLUMN_NAMES_KEY);
let filtersStr = localStorage.getItem(process.env.REACT_APP_FILTERS_KEY);

const initialState = {
  rows: [],
  file: {
    name: localStorage.getItem(process.env.REACT_APP_FILE_NAME_KEY) || 'No File Imported'
  },
  fetching: false,
  importing: false,
  isBulkUpdating: false,
  filters: filtersStr ? JSON.parse(filtersStr) : [],
  totalRows: 0,
  columns: columnsStr ? columnsStr.split(',') : []
};

export default (state = initialState, action) => {
	switch (action.type) {
  case FILE_CHOSEN:
    return {
      ...state,
      importing: true,
      rows: [],
      file: action.payload,
      totalRows: 0
    }
  case TOTAL_ROWS_COUNTED:
    return {
      ...state,
      totalRows: action.payload
    }
  case IMPORT_COMPLETE:
    return {
      ...state,
      importing: false,
      totalRows: action.payload
    }
  case FETCH_FILTERED_ROWS_SUCCESS:
    return {
      ...state,
      fetching: false,
      rows: action.payload
    }
  case FETCH_FILTERED_ROWS_REQUESTED:
    return {
      ...state,
      fetching: true
    }
  case SET_FILTERS:
    return {
      ...state,
      filters: action.payload
    }
  case COLUMNS_UPDATED:
    return {
      ...state,
      columns: action.payload
    }
  case BULK_EDIT_START:
    return {
      ...state,
      isBulkUpdating: true
    }
  case BULK_EDIT_COMPLETE:
    return {
      ...state,
      isBulkUpdating: false
    }
  case SET_ROWS:
    return {
      ...state,
      rows: action.payload
    }
	default:
		return state;
	}
};
