import dashboard from 'assets/dashboard.svg'
import explore from 'assets/explore.svg'

const routes = [
  { path: `/`, name: 'Home', img: dashboard },
  { path: `/simple-dashboard`, name: 'Simple Dashboard', img: dashboard },
  { path: `/advanced-dashboard`, name: 'Advanced Dashboard', img: dashboard },
  { path: `/native-dashboard`, name: 'Native Dashboard', img: dashboard },
  { path: `/explore`, name: 'Self Service', img: explore }
]

export default routes
