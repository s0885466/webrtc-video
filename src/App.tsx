import React from 'react';
import logoImg from './assets/images/logo.png';
import copyButtonImg from './assets/images/copyButton.png';
import chatButtonImg from './assets/images/chatButton.png';
import videoButtonImg from './assets/images/videoButton.png';
import checkImg from './assets/images/check.png';
import micImg from './assets/images/mic.png';
import cameraImg from './assets/images/camera.png';
import hangUpImg from './assets/images/hangUp.png';
import pauseImg from './assets/images/pause.png';
import switchCameraScreenSharingImg from './assets/images/switchCameraScreenSharing.png';
import recordingStartImg from './assets/images/recordingStart.png';
import resumeImg from './assets/images/resume.png';
import sendMessageButtonImg from './assets/images/sendMessageButton.png';
import { useWebRTC } from './hooks/useWebRTC';
import Modal from '@components/Modal/Modal';
import IncomingCall from '@components/IncomingCall/IncomingCall';
import OutGoingCall from '@components/OutGoingCall/OutGoingCall';

export type CallerDetails = {
  callerSocketId: string;
  callType: string;
};

const App = () => {
  const {
    calleePersonalCode,
    updateCalleePersonalCode,
    sendPreOffer,
    callType,
    callingState,
    socketId,
  } = useWebRTC();

  const copyPersonalCodeToClipboard = () => {
    navigator.clipboard.writeText(socketId);
  };

  const acceptCallHandler = () => {
    console.log('acceptCallHandler');
  };

  const rejectCallHandler = () => {
    console.log('rejectCallHandler');
  };

  return (
    <>
      <div className="main_container">
        <div className="dashboard_container">
          <div className="logo_container">
            <img src={logoImg} />
          </div>
          <div>
            <div className="description_container">
              <p className="description_container_paragraph">
                Talk with other user by passing his personal code or talk with
                strangers!
              </p>
            </div>
            <div className="personal_code_container">
              <div className="personal_code_title_container">
                <p className="personal_code_title_paragraph">{socketId}</p>
              </div>
              <div className="personal_code_value_container">
                <p
                  className="personal_code_value_paragraph"
                  id="personal_code_paragraph"
                />
                <button
                  className="personal_code_copy_button"
                  id="personal_code_copy_button"
                  onClick={copyPersonalCodeToClipboard}
                  value={calleePersonalCode}
                >
                  <img src={copyButtonImg} />
                </button>
              </div>
            </div>
          </div>
          <div className="personal_code_connecting_container">
            <p className="personal_code_connecting_paragraph">Personal Code</p>
            <div className="personal_code_connecting_input_container">
              <input
                className="personal_code_input"
                id="personal_code_input"
                onChange={updateCalleePersonalCode}
              />
            </div>
            <div className="personal_code_connecting_buttons_container">
              <button
                className="connecting_button"
                id="personal_code_chat_button"
                onClick={sendPreOffer}
              >
                <img src={chatButtonImg} className="connecting_buttons_image" />
              </button>
              <button
                className="connecting_button display_none"
                id="personal_code_video_button"
              >
                <img
                  src={videoButtonImg}
                  className="connecting_buttons_image"
                />
              </button>
            </div>
          </div>
          <div className="stranger_connecting_container">
            <p className="stranger_title_container">Stranger</p>
            <div className="stranger_buttons_container">
              <button className="connecting_button" id="stranger_chat_button">
                <img src={chatButtonImg} className="connecting_buttons_image" />
              </button>
              <button
                className="connecting_button display_none"
                id="stranger_video_button"
              >
                <img
                  src={videoButtonImg}
                  className="connecting_buttons_image"
                />
              </button>
            </div>
          </div>
          <div className="checkbox_container">
            <div className="checkbox_connection" id="allow_strangers_checkbox">
              <img
                id="allow_strangers_checkbox_image"
                className="display_none"
                src={checkImg}
              />
            </div>
            <p className="checkbox_container_paragraph">
              Allow connection from strangers
            </p>
          </div>
          <div className="dashboard_blur display_none" id="dashboard_blur" />
        </div>
        <div className="call_container">
          <div className="videos_container">
            <div id="video_placeholder" className="videos_placeholder">
              <img src={logoImg} />
            </div>
            <video
              className="remote_video display_none"
              muted
              autoPlay
              id="remote_video"
            />
            <div className="local_video_container">
              <video className="local_video" id="local_video" muted autoPlay />
            </div>
            <div
              className="call_buttons_container display_none"
              id="call_buttons"
            >
              <button className="call_button_small" id="mic_button">
                <img src={micImg} id="mic_button_image" />
              </button>
              <button className="call_button_small" id="camera_button">
                <img src={cameraImg} id="camera_button_image" />
              </button>
              <button className="call_button_large" id="hang_up_button">
                <img src={hangUpImg} />
              </button>
              <button className="call_button_small" id="screen_sharing_button">
                <img src={switchCameraScreenSharingImg} />
              </button>
              <button className="call_button_small" id="start_recording_button">
                <img src={recordingStartImg} />
              </button>
            </div>
            <div
              className="finish_chat_button_container display_none"
              id="finish_chat_button_container"
            >
              <button
                className="call_button_large"
                id="finish_chat_call_button"
              >
                <img src={hangUpImg} />
              </button>
            </div>
            <div
              className="video_recording_buttons_container display_none"
              id="video_recording_buttons"
            >
              <button id="pause_recording_button">
                <img src={pauseImg} />
              </button>
              <button id="resume_recording_button" className="display_none">
                <img src={resumeImg} />
              </button>
              <button id="stop_recording_button">Stop recording</button>
            </div>
          </div>
        </div>
        <div className="messenger_container">
          <div className="messages_container" id="messages_container" />
          <div className="new_message_container display_none" id="new_message">
            <input
              className="new_message_input"
              id="new_message_input"
              type="text"
              placeholder="Type your message..."
            />
            <button className="send_message_button" id="send_message_button">
              <img
                className="send_message_button_image"
                src={sendMessageButtonImg}
              />
            </button>
          </div>
        </div>
      </div>
      {callingState === 'INCOMING_CALL' && (
        <Modal>
          <IncomingCall
            callType={callType}
            acceptCallHandler={acceptCallHandler}
            rejectCallHandler={rejectCallHandler}
          />
        </Modal>
      )}
      {callingState === 'OUTGOING_CALL' && (
        <Modal>
          <OutGoingCall
            callType={callType}
            rejectCallHandler={rejectCallHandler}
          />
        </Modal>
      )}
    </>
  );
};

export default App;
