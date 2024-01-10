
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Alert } from 'antd';


const ReviewModel = ({ open, onClose, title, onConfirm }) => {

    const [reviewNote, setReviewNote] = useState('')
    const [errorMgs, setErrorMgs] = useState('')

    const handleApprove = (value) => {

        if (!reviewNote) {
            setErrorMgs('Ghi chú duyệt là bắt buộc.')
        } else {

            let params = {
                is_reviewed: value,
                review_note: reviewNote
            }
            onConfirm(params)
        }
    };



    return (
        <React.Fragment>
            <div className={`ca_modal ${open ? 'ca_modal_open' : ''}`} id='ca_notice_del'>
                <div className='ca_modal_container '>
                    <div className='ca_title_modal'>
                        <h3>{title}</h3>
                        <span className='ca_close_modal fi fi-rr-cross-small' onClick={onClose}></span>

                    </div>
                    {errorMgs ? (
                        <Alert type={'error'} message={errorMgs} showIcon={false} />
                    ) : null}
                    <div className="ca_main_modal">
                        <div className="ca_frm_box ca_readonly">
                            <label>Ghi chú duyệt</label>
                            <input onChange={({ target: { value } }) => {
                                setReviewNote(value)
                                setErrorMgs('')
                            }}
                                className=""
                                placeholder="Nhập dung ghi chú"></input>
                        </div>
                    </div>
                    <div className='ca_footer_modal'>
                        <button className="ca_btn ca_btn_success" type='button' onClick={() => handleApprove(1)}>
                            <span className="fi fi-rr-check"></span> Duyệt
                        </button>
                        <button className="ca_btn ca_btn_danger" type='button' onClick={() => handleApprove(0)}>
                            <span className="fi fi-rr-cross"></span>
                            Không duyệt
                        </button>
                        <button type='button' onClick={onClose} className='ca_btn_outline ca_btn_outline_danger'>
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

ReviewModel.propTypes = {
    open: PropTypes.bool,
    className: PropTypes.string,
    header: PropTypes.node,
    footer: PropTypes.string,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    children: PropTypes.node,

};

export default ReviewModel;
