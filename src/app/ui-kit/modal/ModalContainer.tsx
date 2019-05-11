import * as React from 'react';
import Transition from 'react-transition-group/Transition';

import Modal from './Modal';


interface IModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  classNameWindow?: string;
  isCloseEsc?: boolean;
  isBackdrop?: boolean;
  isCloser?: boolean;
  blur?: {
    size: number;
    block: string;
    duration: number;
  };
  animationWindow?: {
    duration: number;
    styleStart: object;
    styleEnd: object;
  };
  animationBackdrop?: {
    duration: number;
    styleStart: object;
    styleEnd: object;
  };
}

export default class ModalContainer extends React.Component<IModalContainerProps, any> {

  public render() {
    const { isOpen, animationWindow = { duration: 0 } } = this.props;

    return (
      <Transition
        in={isOpen}
        timeout={{
          enter: 0,
          exit: animationWindow.duration,
        }}
        unmountOnExit={true}
      >
        {(state) => <Modal state={state} {...this.props} />}
      </Transition>
    );
  }
}
