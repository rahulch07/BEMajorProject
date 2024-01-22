import {atom} from 'recoil'

 export const gState = atom({
    key: 'gState', // unique ID (with respect to other atoms/selectors)
    default: {
        uname: ""
    }, // default value (aka initial value)
  });