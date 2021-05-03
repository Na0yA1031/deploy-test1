//Login.js
import React, { useState } from 'react'
import { auth } from '../firebase/index'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  h1: {
    fontSize: '36px',
    fontWeight: 'bold',
    paddingLeft: '85px',
    paddingBottom: '56px',
    paddingTop: '178px'
  },
  h2: {
    fontSize: '16px',
    paddingBottom: '10px',
    paddingLeft: '85px'
  },
  form: {
    marginBottom: '35px',
    marginLeft: '85px',
    width: '600px',
    height: '42px'
  },
  button: {
    marginLeft: '85px',
    width: '440px',
    height: '76px',
    backgroundColor: '#686868',
    color: '#E4E4E4',
    fontSize: '36px',
    boxShadow: '0'
  },
  link: {
    paddingTop: '20px',
    marginLeft: '85px',
    textAlign: 'center'
  },
  errorMessages: {
    fontSize: '16px',
    color: 'red'
  }

})

const Login = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm()
  const classes = useStyles()
  const history = useHistory()

  async function setdata() {
    return getValues()
    }

  async function login() {
    const userdata = await setdata()
    auth.signInWithEmailAndPassword(userdata.email, userdata.password)
      .then(() => {
        history.push("/")
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handlelogin = e => {
    // e.preventDefault()
    login()
  }

  // const user = useContext(AuthContext)
  // if (user) {
  //   return <Redirect to="/" />
  // }

  return (
    <>
      <h1 className={classes.h1}>ログイン</h1>
      <form onSubmit={handleSubmit(handlelogin)}>
        <div>
          <h2 className={classes.h2}>E-mail</h2>
          <input
            className={classes.form}
            type='email'
            placeholder='Email'
            {...register("email", {
              required: 'メールアドレスを入力してください',
              pattern: {
                value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
                message: '正しいメールアドレスを入力してください'
              }
            })}
          />
          {errors.email && <span className={classes.errorMessages}>※{ errors.email.message }</span>}
        </div>
        <div>
          <h2 className={classes.h2}>Password</h2>
          <input
            className={classes.form}
            type='password'
            id='password'
            placeholder='password'
            {...register("password", {
              required: 'パスワードを入力してください。',
              pattern: {
              value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
              message:'パスワードは英字1文字以上、数字1文字以上を含む8文字以上の半角英数字を入力してください'
              }
            })}
          />
          {errors.password && <span className={classes.errorMessages}>※{ errors.password.message }</span>}
        </div>
        <button className={classes.button} type='submit'>ログインする</button>
        <Link className={classes.link} to="/signup">新規登録へ</Link>
      </form>
    </>
  )
}

export default Login
