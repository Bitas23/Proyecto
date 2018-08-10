import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const UserTimeLineComponent = ({ tweets }) => {
  let textToDispay;
  if (tweets.length) {
    textToDispay = (
      <ListGroup>
        {tweets.map(item => (
          <ListGroupItem key={item.text}>
            {item.user.location} <br />
            <img
              src={item.user.profile_image_url_https}
              width="50"
              height="50"
              alt={item.user.profile_image_url_https}
            />
            {item.user.name}
            <br />
            {item.text}
            <br />
            <a href={item.user.url} target="_blank">
              {item.user.url}
            </a>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }
  return (
    <div>
      <br />
      <br />
      <h3>User Time Line</h3>
      <br />
      {textToDispay}
    </div>
  );
};

const mapStateToProps = state => ({
  tweets: state.consult.tweets,
});

export const UserTimeLine = connect(mapStateToProps)(UserTimeLineComponent);
