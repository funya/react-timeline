'use strict';
import Axios from 'axios';
import * as Types from './types';
import {
  loadSeedData,
  addNewEventData,
  deleteSingleEvent_Success,
  updateSingleEvent_Success,
  deleteBatchEvents_Success,
  fetchStarredEvents_Success
} from './index';


const dispatchActionCreator = (dispatch, actionCreator) => (resp) => dispatch(actionCreator(resp.data));
const catchAsyncError = (err, msg) => { throw new Error(`${msg}:\t${err}`); };

// Returns a function to be called within the Redux-Thunk middleware:
export const fetchSeedData = () => {
  return (dispatch) => {
    return Axios
      .get('/api/events', {
        responseType: 'json',
        maxContentLength: Number.MAX_SAFE_INTEGER,
        onUploadProgress: (progressEvt) => { console.log('Upload in progress...'); },
        validateStatus: (statusCode) => statusCode >= 200 && statusCode < 300,
        maxRedirects: 3,
        timeout: 30000
      })
      .then(dispatchActionCreator(dispatch, loadSeedData));
  };
};

// 
export const fetchStarredEvents = () => {
  console.log('Function `fetchStarredEvents()` Called');
  return (dispatch) => {
    return Axios
      .get('/api/search/starred', {
        responseType: 'json',
      })
      .then(dispatchActionCreator(dispatch, fetchStarredEvents_Success))
      .catch(err => {
        throw new Error(`Error fetching starred events:\t${err}`);
      });
  };
};

// 
export const addNewEvent = (evtData) => {
  return (dispatch) => {
    return Axios
      .post('/api/events', evtData)
      .then(dispatchActionCreator(dispatch, addNewEventData))
      .catch(err => {
        throw new Error(`Error making POST request:\t${err}`);
      });
  };
};

// 
export const updateSingleEvent = (evtData) => {
  return (dispatch) => {
    return Axios
      .put(`/api/events/edit/${evtData.uuid}`, evtData)
      .then(dispatchActionCreator(dispatch, updateSingleEvent_Success))
      .catch(err => {
        throw new Error(`Error making PUT request:\t${err}`);
      });
  };
};

// 
export const deleteSingleEvt = (evt) => {
  return (dispatch) => {
    return Axios
      .delete(`/api/events/edit/${evt.uuid}`, {
        data: evt,
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(dispatchActionCreator(dispatch, deleteSingleEvent_Success))
      .catch(err => {
        throw new Error(`Error making DELETE request:\t${err}`);
      });
  };
};

// 
export const deleteBatchEvents = (evts) => {
  return (dispatch) => {
    return Axios
      .delete('/api/events', {
        data: evts,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(dispatchActionCreator(dispatch, deleteBatchEvents_Success))
      .catch(err => {
        throw new Error(`Error making DELETE request:\t${err}`);
      });
  };
};


// name: {
//   type: String,
//   validate: {
//     validator: (name) => name.length >= 3,
//     message: 'Your event name must be at least 3 characters long.'
//   },
//   required: [true, 'This event requires a name.']
// },
// date: {
//   type: Date,
//   validate: {
//     validator: (date) => date.getTime() <= Date.now(),
//     message: 'A date is required for this event.'
//   },
//   required: [true, 'This event requires a date.']
// },
// formattedDate: String,
// eventId: String,
// type: String,
// description: String,
// location: String,
// photos: [EventPhotoSchema],
// tags: [EventTagSchema],
// numRevisions: Number

// export const addNewEvent = () => {
//   return function(dispatch) {
//     return Axios
//       .post('/api/events')
//   };
// };
