import React, {Component} from 'react';
import $ from 'jquery';
import "./Modal.scss";

class Modal extends Component {
  componentDidMount() {
    this.$el = $(this.el);
    this.$el.modal({show: this.state.show});

    this.$el.on('hidden.bs.modal', this.handleHidden);
    this.$el.on('hide.bs.modal', this.handleHide);
    this.$el.on('shown.bs.modal', this.handleShown);


  }


  handleHidden() {
    this.props.onHidden && this.props.onHidden();
  }

  handleHide() {
    this.setState({
      show: false
    })
  }

  handleShown() {
    this.setState({
      show: true
    })
  }

  handleSave(e) {
    this.props.onSave && this.props.onSave(e);
  }


  componentWillUnmount() {
    this.$el.modal('dispose');
  }

  componentDidUpdate(props, state, snapshot) {
    if (!!this.props.show !== state.show) {
      this.$el.modal(this.props.show ? 'show' : 'hide');
    }
  }

  constructor(props) {
    super(props);
    this.state = {show: this.props.show};


    this.handleHidden = this.handleHidden.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleShown = this.handleShown.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  render() {
    return (
      <div className="modal fade" ref={el => this.el = el} role="dialog"
           aria-labelledby="Add or edit user"
           aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <h5 className="modal-title" id="exampleModalLabel">لطفا اطلاعات زیر را وارد کنید</h5>
              <button type="button" className="close mr-auto" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button type="button" className="btn btn-primary" title="ذخیره اطلاعات" onClick={this.handleSave}>ذخیره
              </button>
              <button type="button" className="btn btn-outline-secondary" title="لغو عملیات" data-dismiss="modal">لغو
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
