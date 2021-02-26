import React from "react";
import close from '../../assets/close.svg'
import bottleError from '../../assets/bottle-error.svg'


import './Modal.scss'

const Modal = ({ visible, setIsOpen, data }) => {
    return (
        <>
            { visible &&
                <div className='modal-overlay' >
                    <div onClick={() => setIsOpen(false)} className='modal-close' ></div>
                    <div className='modal-window'>
                        <div className='modal-header'>
                            <span>{data.name}</span>
                            <img alt='error' onClick={() => setIsOpen(false)} className='icon-close' src={close} />
                        </div>

                        <div className='modal-content' >
                            <div className='tagline'>{data.tagline}</div>
                            <div className='info'>
                                {data.imageUrl
                                    ? <img alt='error' src={data.imageUrl} />
                                    : <img alt='error' src={bottleError} />
                                }
                                <div className='abv'>
                                    <span><strong>ABV: </strong>{data.abv}</span>
                                    <span><strong>Date first brewed: </strong>{data.firstBrewed}</span>
                                </div>
                            </div>
                            <div className='description' ><strong>Description</strong><br />{data.description}</div>
                            <div className='tips' ><strong>Brewer's tips</strong><br />{data.brewersTips}</div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Modal
