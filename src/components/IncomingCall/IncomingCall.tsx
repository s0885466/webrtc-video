import React from 'react';
import dialogAvatarImg from '../../assets/images/dialogAvatar.png';
import acceptCallImg from '../../assets/images/acceptCall.png';
import rejectCallImg from '../../assets/images/rejectCall.png';

type IncomingCallProps = {
  callType: string;
  acceptCallHandler: () => void;
  rejectCallHandler: () => void;
};

const IncomingCall = ({
  callType,
  acceptCallHandler,
  rejectCallHandler,
}: IncomingCallProps) => {
  return (
    <div className="dialog_wrapper">
      <div className="dialog_content">
        <div className="dialog_title">
          Incoming {callType === 'CHAT' ? 'chat' : 'video'}call
        </div>
        <div className="dialog_image_container">
          <img src={dialogAvatarImg} alt="" />
        </div>
        <div className="dialog_button_container">
          <button
            className="dialog_accept_call_button"
            onClick={acceptCallHandler}
          >
            <img src={acceptCallImg} alt="" className="dialog_button_image" />
          </button>
          <button
            className="dialog_reject_call_button"
            onClick={rejectCallHandler}
          >
            <img src={rejectCallImg} alt="" className="dialog_button_image" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;
