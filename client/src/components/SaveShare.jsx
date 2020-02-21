/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import SaveOnly from './SaveOnly.jsx';
import ShareOnly from './ShareOnly.jsx';

class SaveShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
    };
    this.saveFavorite = this.saveFavorite.bind(this);
  }

  saveFavorite({ id, name }) {
    console.log(`Saved ${name}, with id of ${id}, or would if we had back-end save functionality.`);
    this.setState({ saved: true });
  }

  render(
    // {name, saved, share, shareClose, url, }
  ) {
    return (
      <div>
        <div className="tom-grid-100-saveshare">
          <div className="tom-grid-50-left">
            {/* <SaveOnly saved={saved} saveFavorite={this.saveFavorite} /> */}
          </div>
          <div className="tom-grid-50-right">
            {/* <ShareOnly
              url={url}
              name={name}
              share={share}
              shareClose={shareClose}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default SaveShare;
