import { 
  FILE_CHOSEN,
  IMPORT_COMPLETE,
  FETCH_FILTERED_ROWS_REQUESTED,
  COUNT_TOTAL_ROWS
} from '../reducers/data';

export function fileChosen(data) {
  return {
    type: FILE_CHOSEN,
    payload: data
  }
}

export function importComplete(data) {
  return {
    type: IMPORT_COMPLETE,
    payload: data
  }
}

export function fetchFilteredRows(filter) {
  return {
    type: FETCH_FILTERED_ROWS_REQUESTED,
    payload: filter
  }
}

export function countTotalRows() {
  return {
    type: COUNT_TOTAL_ROWS,
  }
}