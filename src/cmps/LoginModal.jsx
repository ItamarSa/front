// LoginModal.js
import React from 'react';
import { LoginSignup } from './LoginSignup';

export function LoginModal({ closeModal }) {
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-left">
                    <div className='title-container'>
                        <div className="AFHxVKd">
                            <h2>Success starts here</h2>
                            <ul className="flex  m-t-24">
                                <li className="flex tbody-4 JLvB+6c">
                                    <div className="flex  m-r-8 q136ePM">
                                        <span className="XQskgrQ u6cafdy" aria-hidden="true" style={{width: '12px', height: '12px'}}>
                                            <svg fill= '#ffd7eb' width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.6202 2.6083L5.4001 10.8284L2.37973 7.80805C2.23329 7.66161 1.99585 7.66161 1.84939 7.80805L0.96551 8.69193C0.819073 8.83836 0.819073 9.0758 0.96551 9.22227L5.13492 13.3917C5.28135 13.5381 5.51879 13.5381 5.66526 13.3917L15.0344 4.02252C15.1809 3.87608 15.1809 3.63865 15.0344 3.49218L14.1505 2.6083C14.0041 2.46186 13.7667 2.46186 13.6202 2.6083Z">
                                                </path>
                                            </svg>
                                        </span>
                                    </div>Over 600 categories</li>
                                <li className="flex tbody-4 JLvB+6c">
                                    <div className="flex  m-r-8 q136ePM">
                                    <span className="XQskgrQ u6cafdy" aria-hidden="true" style={{width: '12px', height: '12px'}}>
                                        <svg fill= '#ffd7eb' width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.6202 2.6083L5.4001 10.8284L2.37973 7.80805C2.23329 7.66161 1.99585 7.66161 1.84939 7.80805L0.96551 8.69193C0.819073 8.83836 0.819073 9.0758 0.96551 9.22227L5.13492 13.3917C5.28135 13.5381 5.51879 13.5381 5.66526 13.3917L15.0344 4.02252C15.1809 3.87608 15.1809 3.63865 15.0344 3.49218L14.1505
                                             2.6083C14.0041 2.46186 13.7667 2.46186 13.6202 2.6083Z">
                                            </path>
                                        </svg>
                                    </span>
                                    </div>
                                    Pay per project, not per hour
                                    </li>
                                <li className="flex tbody-4 JLvB+6c">
                                    <div className="flex  m-r-8 q136ePM">
                                        <span className="XQskgrQ u6cafdy" aria-hidden="true" style={{width: '12px', height: '12px'}}>
                                            <svg fill= '#ffd7eb' width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.6202 2.6083L5.4001 10.8284L2.37973 7.80805C2.23329 7.66161 1.99585 7.66161 1.84939 7.80805L0.96551 8.69193C0.819073 8.83836 0.819073 9.0758 0.96551 9.22227L5.13492 13.3917C5.28135 13.5381 5.51879 13.5381 5.66526 13.3917L15.0344 4.02252C15.1809 3.87608 15.1809 3.63865 15.0344 3.49218L14.1505 2.6083C14.0041 2.46186 13.7667 2.46186 13.6202 2.6083Z">
                                                </path>
                                            </svg>
                                        </span>
                                    </div>Access to talent and businesses across the globe</li>
                            </ul>
                        </div>
                    </div>
                    <div className='img-container'>
                        <img
                            className="modal-image"
                            src="https://fiverr-res.cloudinary.com/npm-assets/layout-server/standard.ddd97e5.png"
                            alt="setup illustration banner"
                        />
                    </div>
                </div>
                <div className="modal-right">
                    <LoginSignup closeModal={closeModal} />
                </div>
                {/* <button onClick={closeModal}>Close</button> */}
            </div>
        </div>
    );
}
