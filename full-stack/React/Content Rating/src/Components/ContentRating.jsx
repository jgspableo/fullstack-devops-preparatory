
import React, { Component } from 'react';
import './ContentRating.css';

class ContentRating extends Component {
  constructor() {
    super();
    this.state = {
      likes: 0,
      dislikes: 0,
      total: 0,
      handleLike:() => {
        this.setState((prevState) => ({
          likes: prevState.likes + 1
        }), this.state.handleTotal)
      },
      handleDislike:() => {
        this.setState((prevState) => ({
          dislikes: prevState.dislikes + 1
        }), this.state.handleTotal)
      },
      handleTotal:() => { 
        this.setState((prevState) => ({
          total: prevState.likes + prevState.dislikes
        }))
      }
    }
  }
  render() {
    return (
     <div className='content-rating'>
      <p>
        I AM A BEAUTIFUL TEXT
      </p>
      <div className="rating-buttons">
        <button className="like-button" onClick={this.state.handleLike}>
          Like ({this.state.likes})
        </button>
        <button className="dislike-button" onClick={this.state.handleDislike}>
          Dislike ({this.state.dislikes})
        </button>
      </div>
      <div className="total-ratings">
        <p>
          Total: {this.state.total}
        </p>
      </div>
     </div>
    );
  }
}

export default ContentRating;
