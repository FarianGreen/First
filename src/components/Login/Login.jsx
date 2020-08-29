import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Input } from '../../Utils/FormControl/From';
import { required, minLengthCreator } from '../../Utils/VL/Validators';
import { connect } from 'react-redux';
import { login } from '../../Redux/Auth-reducer';
import { Redirect } from 'react-router-dom';
import classes from '../../Utils/FormControl/From.module.css';


const minLength5 = minLengthCreator(5) 

const LoginForm =(props)=>{
    return(
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={"Email"} name= {"email"} component = {Input} validate={[required,minLength5]}/>
                </div>
                <div>
                    <Field placeholder={"Password"} name= {"password"} 
                    component = {Input} validate={[required,minLength5]} type ={"password"}/>
                </div>
                <div>
                    <Field type={"checkbox"} name= {"rememberMe"} component = {Input}/> remember me
                </div>
                {props.error && <div className={classes.formAutorithedError}>
                    {props.error} </div>}
                <div>
                    <button>Login</button>
                </div>
            </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'
}) (LoginForm)

const Login =(props)=>{
    const onSubmit=(formData)=>{
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth){
        return <Redirect to ={"/profile"}/>
    }
    return(
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
        
    )
}

let mapStateToprops = (state)=>({
    isAuth: state.auth.isAuth
})

export default connect (mapStateToprops, { login })(Login);