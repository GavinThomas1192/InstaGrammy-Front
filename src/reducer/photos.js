export default (state=[], action) => {
  let {type, payload} = action;
  switch(type) {
  case 'PHOTO_SET':
    return payload;
  case 'PHOTO_CREATE':
    return [payload, ...state];
  case 'PHOTO_UPDATE':
    return state.map(item => item._id === payload._id ? payload : item);
  case 'PHOTO_DELETE':
    return state.filter(item => item._id !== payload._id);
  default: return state;
  }
};