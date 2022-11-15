import React, { Fragment, useEffect, useState } from "react";
import { fetchCommitDevice } from "../http/deviceApi";
import { fetchOneDevice } from "../http/deviceApi";
import { getUserName } from "../http/userApi";
import { onKeyDown } from "../pages/Auth";
import '../style/Commits.css';

function Commits(props){
    const deviceId = props.deviceId;
    const userId = props.userId;
    const [commits, setCommits] = useState(props.commits);
    const [commit, setCommit] = useState('');

    function newCommit(){
        fetchCommitDevice(commit, deviceId, userId).catch(rej=>console.log(rej))
        fetchOneDevice(deviceId)
        .then(res => setCommits(res.commit))
    }
    
  
    
    return(
        <article className="commits__wrapper">
            <h6 className="commits__title">
                КОММЕНТАРИИ
            </h6>
            { commits.length !== 0 ?
            <div className="commits__messeg">
             {
                commits.map(item =>
                    <Fragment key={Math.random()}>
                    <span className="messeg__user">{item.userName}</span>
                    <p className="messeg__text">{item.text}</p>
                    </Fragment>
                    )
             }
            </div>
            :
            <div className="commits__messeg">
              <span className="messeg__null">КОММЕНТАРИИ ОТСУТСТВУЮТ</span>
            </div>
            }
            { userId !== null &&
            <div className="commits__new-commit">
                <textarea  className="new-commit__input" onChange={(e)=>setCommit(e.target.value)}
                            onKeyDown={(e)=> onKeyDown(e, newCommit)}/>
                <button className="new-commit__btn __btn__grey" onPointerUp={newCommit}>
                    ОСТАВИТЬ ОТЗЫВ
                </button>
            </div>
            }
        </article>
    )
}

export default Commits