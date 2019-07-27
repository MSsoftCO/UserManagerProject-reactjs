import React from 'react';
import PropTypes from 'prop-types';
import {headerRowTitle} from "../mockData";

const UserRowTitle = () => {
  const {name, nationalCode, roles, actions} = headerRowTitle;
  return (
    <div className="row shadow-sm bg-light">
      <div className="col-6 col-sm-4 col-md-3 name">
        {name}
      </div>
      <div className="col-4 col-md-3 d-none d-sm-block nationalCode">
        {nationalCode}
      </div>
      <div className="col-3 d-none d-md-block roles">
        {roles}
      </div>
      <div className="col-6 col-sm-4 col-md-3 actions">
        {actions}
      </div>
    </div>
  );
};


export default UserRowTitle;
