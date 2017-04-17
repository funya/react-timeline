'use strict';
import React, { Component } from 'react';
import ConfirmDeletionModal from '../ConfirmDeletionModal';
import TimelineEventToolbar from './TimelineEventToolbar';
import TLEventHeader from './TLEventHeader';
import TLEventBody from './TLEventBody';
import TLEventFooter from './TLEventFooter';


const destructureEvent = (evtObj) => {
  let oo = {};
  for (let key in evtObj) {
    let formattedKey = `evt${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    oo[formattedKey] = evtObj[key];
  }
  console.log('oo', oo);

  return function() {
    return {};
  };
};


const TimelineEvent = (props) => {
  const {
    evt,
    evt: {
      name: evtName,
      date: evtDate,
      formattedDate: evtFormattedDate,
      description: evtDescription,
      location: evtLocation,
      type: evtType,
      photoCount,
      uuid
    },
    evtAlign, logModalData, toggleModal, deleteEvt, batchSelectionState, addSelectionToBatch, isInBatch, addEventToFavorites, getStarGlyphClass,
    hasMultipleTags, inverted, confirmDeleteModal, confirmDeletionEvt, imageData, cloudinaryImageStore
  } = props;

  const ci = (cloudinaryImageStore.hasOwnProperty(uuid) && cloudinaryImageStore[uuid].images.length
    ? cloudinaryImageStore[uuid].images
    : null);

  return (
    <li className={ `tl-event${evtAlign}` }>
      <div className="tl-marker">
        <i className="material-icons">{ !!getStarGlyphClass ? 'stars' : 'adjust' }</i>
      </div>
      <div className={ `in-view tl-event-panel${isInBatch ? ' batch-select-active' : ''}` }>
        <TimelineEventToolbar
          evt={ evt }
          logModalData={ logModalData }
          toggleModal={ toggleModal }
          deleteEvt={ deleteEvt }
          confirmDeleteModal={ confirmDeleteModal }
          confirmDeletionEvt={ confirmDeletionEvt } />
        <TLEventHeader
          evtName={ evtName }
          evtUuid={ uuid }
          batchSelectionState={ batchSelectionState }
          addSelectionToBatch={ addSelectionToBatch }
          inverted={ inverted }
          imageData={ imageData } />
        <TLEventBody
          evt={ evt }
          { ...evt }
          evtDescription={ evtDescription }
          evtLocation={ evtLocation }
          evtDate={ evtDate }
          photoCount={ photoCount }
          evtFormattedDate={ evtFormattedDate }
          // imageData={ imageData }
          cloudinaryImageStore={ ci }
          getMyImgs={ props.getMyImgs } />
        <TLEventFooter
          evt={ evt }
          evtType={ evtType }
          addEventToFavorites={ addEventToFavorites }
          getStarGlyphClass={ getStarGlyphClass }
          hasMultipleTags={ hasMultipleTags } />
      </div>
    </li>
  );
};

export default TimelineEvent;







// <li className={ `tl-event${evtAlign}` }>
//   <div className="tl-marker">
//     <i className="glyphicon glyphicon-record" />
//   </div>
//   <div className="tl-event-panel">
//     <TimelineEventToolbar
//       evt={ evt }
//       logModalData={ logModalData }
//       toggleModal={ toggleModal } />
//     <div className="panel-header">
//       <i 
//         className="collapse-up glyphicon glyphicon-chevron-up"
//         onClick={ collapseBody } />
//       <h3>{ evtName }</h3>
//     </div>
//     <div className="panel-body">
//       { evtDescription }
//       <div
//         className="tl-location"
//         onClick={ debounceToggle }>
//         <i className="glyphicon glyphicon-map-marker" />
//         <em key={ `Location_${evtLocation}` }>{ evtLocation }</em>
//         <i className="map-toggle glyphicon glyphicon-menu-right" />
//         <StaticGMap
//           evtLocation={ evtLocation } />
//       </div>
//     </div>
//     <div className="panel-footer">
//       {[
//         evtNote,
//         <i
//           key="StarGlyph"
//           className="glyphicon glyphicon-star-empty" />
//       ]}
//     </div>
//   </div>
// </li>
