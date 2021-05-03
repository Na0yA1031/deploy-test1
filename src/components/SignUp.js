//SignUp.js
import React from 'react'
import { useHistory, Link } from 'react-router-dom'
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

const SignUp = () => {
  const history = useHistory()
  const { register, handleSubmit, formState: { errors }, getValues } = useForm()

  const classes = useStyles()

  async function setdata() {
    return getValues()
    }


  const onSubmit = () => {
    history.push({ pathname: './signup/result', state: getValues() })
  }

  return (
    <>
      <h1 className={classes.h1}>新規会員登録</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className={classes.h2}>ユーザー名</h2>
        <input
          className={classes.form}
          type="text"
          placeholder="ユーザー名"
          {...register("username", {
            required: 'ユーザー名を入力してください',
          })}


        />
        {errors.username && <span className={classes.errorMessages}>※{ errors.username.message }</span>}
          <h2 className={classes.h2}>メールアドレス</h2>
        <input
          className={classes.form}
          type="text"
          placeholder="Email"
          {...register("email", {
            required: 'メールアドレスを入力してください',
            pattern: {
              value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
              message: '正しいメールアドレスを入力してください'
            }
          })}
        />
        {errors.email && <span className={classes.errorMessages}>※{ errors.email.message }</span>}
        <h2 className={classes.h2}>パスワード</h2>
        <input
          className={classes.form}
          type="text"
          placeholder="パスワード"
          {...register("password", {
            required: 'パスワードを入力してください',
            pattern: {
              value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
              message:'パスワードは英字1文字以上、数字1文字以上を含む8文字以上の半角英数字を入力してください'
            }
          })}
        />
        {errors.password && <span className={classes.errorMessages}>※{errors.password.message}</span>}


        <h2 className={classes.h2}>生年月日</h2>
        <input
          className={classes.form}
          type="text"
          placeholder="生年月日"
          {...register("birthday", {
            required: '生年月日を入力してください',
            pattern: {
              value: /^[0-9]{8}$/,
              message:'半角数字8文字で入力してください'
            }
          })}
        />
        {errors.birthday && <span className={classes.errorMessages}>※{errors.birthday.message}</span>}

        <h2 className={classes.h2}>性別</h2>
        <select
          className={classes.form}
          {...register("gender")}
        >
          <option value='無回答'>無回答</option>
          <option value='男性'>男性</option>
          <option value='女性'>女性</option>
          <option value='その他'>その他</option>
        </select>
        <div>
          <button className={classes.button} type="submit">確認画面へ</button>
          <Link className={classes.link} to="/login">ログインへ</Link>
        </div>
      </form>
      </>
  )
}


export default SignUp
