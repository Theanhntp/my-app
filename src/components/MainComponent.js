import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import About from './AboutComponent';
import { addComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))

});
class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  render() {
    const HomePage = () => {
      return(
        <Home 
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment={this.props.addComment} />
      );
    };
            
    return (
      <div>
        <Header />
        <Routes>
            <Route path='/home' Component={HomePage} />
            <Route exact path='/menu' element={<Menu dishes={this.props.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />} />
            <Route to="/home" element={<Navigate to="/menu" />}/>
            <Route exact path='/contactus' Component={Contact} />
            <Route path='/menu/:dishId' component={DishWithId} />
            <Route exact path='/aboutus' Component={About}/>            
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Main));
