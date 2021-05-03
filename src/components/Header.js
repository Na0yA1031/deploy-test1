import React, { useContext, useState } from 'react';
import logo from '../etc/img/tabelog-match.png'
import { Squash as Hamburger } from 'hamburger-react'
import { AuthContext } from '../AuthProvider';
import { Button, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

const useStyles = makeStyles({
    'button': {
        backgroundColor: '#4080FF',
        color: 'white',
        position: 'relative',
        right: '43px',
        '&:hover': {
            opacity: '.8',
            backgroundColor: '#4080FF'
        }
    }
})

const Header = ({ children }) => {
    // ハンバガーメニューをクリックした時にメニューの表示を切り替えるステート
    const [openMenu, setOpenMenu] = useState(false)

    // openMenuがtrueかfalseか入っている文字列を変えている(動的に変化するクラス名として使う)
    const openOrClose = openMenu ? `nav-menu nav-menu-in` : 'nav-menu';

    // ハンバーガーメニューが三本線か✖️印になるかを真偽値によって変化させるステート
    const [isOpen, setOpen] = useState(false)

    // openMenuがtrueならmodalという文字列、falseなら空文字が入る(動的に変わるクラス名)
    const modal = openMenu ? 'modal' : '';

    const history = useHistory();

    const { authUser } = useContext(AuthContext)
    // console.log(authUser)

    const classes = useStyles();

    return (
        <>
            <header className='header'>
                <div className='header-flex'>
                    <div className='header-flex-logo'>
                        <img className="header-logo" src={logo} alt="" onClick={() => history.push('/')} />
                        <h2 className='header-h2'>誰でもいいから一緒にこのお店に行って欲しい</h2>
                    </div>
                    {authUser ? (<Hamburger
                        size={20}
                        toggled={isOpen}
                        toggle={setOpen}
                        color={openMenu ? 'white' : 'black'}
                        onToggle={toggled => {
                            if (toggled) {
                                setOpenMenu(true)
                            } else {
                                setOpenMenu(false);
                            }
                        }} />) : (
                        <Button
                            className={classes.button}
                            variant='contained'
                            onClick={() => history.push('/login')}
                        >
                            ログイン
                        </Button>

                    )}

                    <nav id="nav-menu" className={openOrClose} onClick={() => {
                        setOpenMenu(false)
                        setOpen(false)
                    }}>
                        <ul>
                            <li onClick={() => history.push('/userinfo')} ><span className="under-line">ユーザーページ</span></li>
                            <li onClick={() => history.push('/search')} ><span className="under-line">検索ページ</span></li>
                            {/* <li><span className="under-line">チャット一覧</span></li> */}
                            {/* <li><span className="under-line">お知らせ</span></li>
                            <li><span className="under-line">このサービスの使い方</span></li>
                            <li><span className="under-line">よくある質問</span></li> */}
                            <li onClick={() => auth.signOut()} ><span className="under-line">ログアウト</span></li>
                            {/* <li><span className="under-line">利用規約</span></li>
                            <li><span className="under-line">ポリシー</span></li> */}
                        </ul>
                    </nav>

                </div>
                <div className={modal} onClick={() => {
                    setOpenMenu(false)
                    setOpen(false)
                }}>
                </div>

            </header>
            <div style={{ paddingTop: '108px' }} ></div>

            {children}
        </>
    )
}

export default Header;