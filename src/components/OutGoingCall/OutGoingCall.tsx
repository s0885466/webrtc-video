import React from 'react';
import dialogAvatarImg from '../../assets/images/dialogAvatar.png';
import rejectCallImg from '../../assets/images/rejectCall.png';

type OutGoingCallProps = {
  callType: string;
  rejectCallHandler: () => void;
};

const OutGoingCall = ({ callType, rejectCallHandler }: OutGoingCallProps) => {
  return (
    <div className="dialog_wrapper">
      <div className="dialog_content">
        <div className="dialog_title">
          Outgoing {callType === 'CHAT' ? 'chat' : 'video'}call
        </div>
        <div className="dialog_image_container">
          <img src={dialogAvatarImg} alt="" />
        </div>
        <div className="dialog_button_container">
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

export default OutGoingCall;
