/* class combines all th existing reducers in the app
 */

import * as loginReducer from './loginReducer';
import * as imageReducer from './imageReducer'


export default Object.assign(loginReducer,imageReducer);
