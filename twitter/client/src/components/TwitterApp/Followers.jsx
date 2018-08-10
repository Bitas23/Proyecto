import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const FollowersComponent = ({ followers }) => {
  let textToDispay;
  if (followers.length) {
    textToDispay = (
      <ListGroup>
        {followers.map((item, index) => (
          <ListGroupItem key={item.screen_name + item.status.text}>
            <h2>{index + 1}</h2>
            <img
              src={item.profile_image_url_https}
              width="60"
              height="60"
              alt={item.profile_image_url_https}
            />
            {item.screen_name}
            <br />
            statuses {item.statuses_count}
            <br />
            {item.status.text}
            <br />
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }
  return (
    <div>
      <br />
      <br />
      <h3>Followers</h3>
      <br />
      {textToDispay}
    </div>
  );
};

const mapStateToProps = state => ({
  followers: state.consult.followers,
});
export const Followers = connect(mapStateToProps)(FollowersComponent);
