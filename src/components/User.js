import React from 'react';
import {rolesTitles as roles} from '../mockData'
import Modal from "./Modal";
import {toast} from "react-toastify";
import { uniqueId } from 'lodash'

class User extends React.Component {

  constructor(props) {
    super(props);
    let user = Object.assign({}, {name: '', nationalCode: ''}, props.user);
    user.roles = new Map(user.roles && user.roles.map ? user.roles.map(id => [id, roles[id]]) : []);
    this.newUser = !!this.props.new;

    this.state = {...user, modal: false};
    this.state.modalUser = {...user, roles: new Map(user.roles.entries())};
  }


  componentDidMount() {
  }

  componentWillUnmount() {

  }

  componentDidUpdate(props, state) {
    if (props.modal !== this.props.modal && state.modal !== !!this.props.modal) {
      this.setState({modal: !!this.props.modal})
    }

    if (state.modal !== this.state.modal && !!this.state.modal) {
      this.setState({
        modalUser: {...state, roles: new Map(state.roles)}
      });
    }
  }


  saveUser = () => {
    let user = {...this.state.modalUser, roles: new Map(this.state.modalUser.roles)};
    if (!user.name || !user.nationalCode) {
      toast.warn('فیلدهای نام و کدملی اجباری است', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else
      this.setState(state => {
        return ({
          modal: false,
          ...user,
          modalUser: {...user, roles: new Map()}
        });
      }, () => {
        !!this.props.saveHandler && this.props.saveHandler({
          ...this.state, modalUser: undefined
        });
      })
  };
  onHide = () => {
    this.setState({
      modal: false,
      modalUser: {...this.state, roles: new Map()}
    }, () => !!this.props.hideHandler && this.props.hideHandler())
  };


  inputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState(state => ({
      modalUser: {...state.modalUser, [name]: value}
    }))

  };
  roleChange = (event, roleId) => {
    const target = event.target;
    const value = target.checked;
    const id = parseInt(roleId);
    this.setState(state => {
      const userRoles = new Map(state.modalUser.roles.entries());
      if (value) userRoles.set((id), roles[id]); else userRoles.delete(id);
      return {modalUser: {...state.modalUser, roles: userRoles}};
    });

  };

  render() {

    return <React.Fragment>
      <Modal
        show={this.state.modal}
        onSave={this.saveUser}
        onHidden={(e) => this.onHide(e)}>
        <form className="needs-validation" noValidate>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="name">نام و نام خانوادگی</label>
              <input type="text" className="form-control" id="name" name="name"
                     value={this.state.modalUser.name}
                     onChange={this.inputChange}
                     placeholder="نام" required
                     autoFocus/>
              <div className="invalid-feedback">
                Valid name is required.
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="nationalCode">کد ملی</label>
              <input type="text" className="form-control" id="nationalCode" name="nationalCode"
                     value={this.state.modalUser.nationalCode}
                     onChange={this.inputChange} placeholder="کد ملی"
                     required/>
              <div className="invalid-feedback">
                Valid ID Code is required.
              </div>
            </div>
            <div className="roles-wrapper">
              <label>انتخاب نقش</label>
              <div className="roles">{
                (Object.entries(roles)).map(([id, role]) => {
                  let elementId = uniqueId('custom-control');
                  return <div key={id} className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input"  id={elementId} name="role-menu"
                           onChange={e => this.roleChange(e, id)}
                           checked={this.state.modalUser.roles.has(Number.parseInt(id))}
                    />
                    <label htmlFor={elementId} className="custom-control-label">{role.title}
                    </label>
                  </div>;
                })
              }
              </div>
            </div>
          </div>
        </form>
      </Modal>
      {this.newUser || <div className="row shadow-sm bg-white">
        <div className="col-6 col-sm-4 col-md-3 name">
          {this.state.name}
        </div>
        <div className="col-4 col-md-3 d-none d-sm-block nationalCode">
          {Number(this.state.nationalCode).toLocaleString('fa-IR', {useGrouping: false})}
        </div>
        <div className="col-3 d-none d-md-block roles">
          {Array.from(this.state.roles.entries()).map(([id, role]) => {
            return <span className="badge badge-info ml-2"
                         key={id}>{role.title}</span>;
          })}
        </div>
        <div className="col-6 col-sm-4 col-md-3 actions">
          <button className="btn btn-sm btn-secondary ml-2" data-toggle="modal"
                  onClick={() => this.setState({modal: true})} title="ویرایش کاربر"><i
            className="fa fa-edit"/></button>
          <button className="btn btn-sm btn-danger"
                  onClick={(e) => this.props.deleteHandler(e, this.state.id, this.state.name)}
                  title="حذف کاربر"><i
            className="fa fa-trash"/></button>
        </div>
      </div>
      }</React.Fragment>
  }


}

export default User;
