/* class combines all th existing reducers in the app
 */

import * as loginReducer from './loginReducer';
import * as imageReducer from './imageReducer';
import * as chatRoomReducer from './chatRoomReducer';


export default Object.assign(loginReducer,imageReducer,chatRoomReducer);
