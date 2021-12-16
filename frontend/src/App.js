import './App.css';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import Layout from './hocs/Layout';
import store from './store'
import { Provider } from 'react-redux'
import Home from './containers/Home';
import Blog from './containers/Blog';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Profile from './containers/Profile';
import Create from './containers/Post/Create';
import Category from './containers/Post/Category';
import Detail from './containers/Post/Detail';
import Update from './containers/Post/Update';
import Other from './containers/Other';
import Search from './containers/Post/Search';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/post/create" component={Create}/>
            <Route exact path="/category/:category" component={Category} />
            <Route exact path="/post/:slug/update" component={Update} />
            <Route exact path="/post/:slug" component={Detail} />
            <Route exact path = "/search/:term" component={Search} />
            <Route exact path = "/profile/:username" component={Other} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
