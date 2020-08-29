import React from 'react';
import classes from './Users.module.css'
import userPhoto from '../../assets/userPhoto.png'
import { NavLink } from 'react-router-dom';


let Users =(props)=>{
    
    let pagesCount = Math.ceil(props.TotalUsersCount / props.pageSize);

    let pages=[];
    
    for (let i=1; i<=pagesCount; i++ ){
        pages.push(i);
    }
    
return( 
        
    <div>
        <div>
            {pages.map(p =>{
            return(<span className ={props.currentPage === p && classes.selected}
            onClick={(e)=>{props.onPageChenged(p)}}>{p}</span>)})}
        </div>
        {
            props.users.map( u =><div key={u.id}>
                <span>
                    <div>
                        <NavLink to ={'/profile/' + u.id}>
                        <img src={u.photos.small !=null ? u.photos.small : userPhoto}
                        className={classes.userphoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed 
                        ? <button disabled={props.followingInProgress.some(id =>id === u.id)} 
                        onClick={()=>{props.unfollow( u.id);
                        }}>Unfollow</button> 
                        : <button disabled={props.followingInProgress.some(id=>id === u.id)} 
                        onClick={()=>{props.follow(u.id)
                        }}>FOLLOW</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
            </div>)
               
        }
    </div>
)
}
export default Users;