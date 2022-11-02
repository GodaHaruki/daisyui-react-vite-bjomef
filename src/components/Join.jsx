import {useAsyncCookie} from './Cookie.jsx'
import {Navigate} from 'react-router-dom'

const Join = () => {
  const roomInfo = useAsyncCookie()
  const roomID = "URLParameter"
  
  const jsx = roomID != null ? (
    <div>
        <table>
          <thead>
            <th>Name</th>
            <th>Description</th>
            <th>Digit</th>
            <th>Times</th>
          </thead>
        </table>
      </div>
  )
            : (
      <Navigate replace to="/" />          
            )
  return jsx
};

export default Join;