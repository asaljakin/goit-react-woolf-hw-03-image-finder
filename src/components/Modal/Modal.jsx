import { Component } from 'react';

export class Modal extends Component {
  closeModalBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
  };
  handleClickEsc = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleClickEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleClickEsc);
  }

  render() {
    return (
      <div
        className="Overlay"
        onClick={e => {
          this.closeModalBackdrop(e);
        }}
      >
        <div className={'Modal'}>{this.props.children}</div>
      </div>
    );
  }
}
