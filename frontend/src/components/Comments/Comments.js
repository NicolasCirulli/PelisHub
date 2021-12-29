import React, { useState, useRef, useEffect } from "react"
import { connect } from "react-redux"
import swal from 'sweetalert2'

const Comment = (props) => {

    return (
        <div>
            <div className="comments">
                <div className="onecomment">
                    <div className="commentpic" key="0001">
                        <img src="../../assets/user.png" alt="user" />
                    </div>
                    <div className="nombreycomment">
                        <p className="negrita">Username</p><p>:</p><p className="comentario">Esta peli es muy buena</p>
                    </div>
                </div>
                    <div className="onecomment">
                        <div className="commentpic" key="0002">
                            <img src="../../assets/user.png" alt="user" />
                        </div>
                        <div className="nombreycomment">
                        <p className="negrita">Username</p><p>:</p><p className="comentario">Esta peli es muy buena</p>
                    </div>
                    </div>
                    <div className="onecomment">
                        <div className="commentpic" key="0003">
                            <img src="../../assets/user.png" alt="user" />
                        </div>
                        <div className="nombreycomment">
                        <p className="negrita">Username</p><p>:</p><p className="comentario">Esta peli es muy buena</p>
                    </div>
                    </div>
                    <div className="onecomment">
                        <div className="commentpic" key="0004">
                            <img src="../../assets/user.png" alt="user" />
                        </div>
                        <div className="nombreycomment">
                        <p className="negrita">Username</p><p>:</p><p className="comentario">Esta peli es muy buena</p>
                    </div>
                    </div>
                    <div className="onecomment">
                        <div className="commentpic" key="0005">
                            <img src="../../assets/user.png" alt="user" />
                        </div>
                        <div className="nombreycomment">
                        <p className="negrita">Username</p><p>:</p><p className="comentario">Esta peli es muy buena</p>
                    </div>
                    </div>
            </div>
            <div className="makecomment">
                <input className="writecomment" type="text" placeholder="Your comment..." />
                <button className="btn btn-primary mb-3 btn-makecomment bblue">Comment!</button>
            </div>
        </div>
    )
}

export default Comment
