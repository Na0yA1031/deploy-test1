/*eslint react-hooks/exhaustive-deps: off*/
import React, { memo, useEffect, useState } from 'react';
import FormDialog from '../Forms/FormDialog'
import FavoriteShop from './FavoriteShop';
import ImageArea from './ImageArea';
import { TextField } from '@material-ui/core';
import { useParams } from 'react-router';
import { db } from '../../firebase';
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';
import FavoriteShopComment from './FavoriteShopComment';



const OtherUserInfo = memo(() => {
    // /////////////////////////////////////////
    /*              useState                  */
    // ////////////////////////////////////////

    // プロフィール編集用のモーダルの開閉を管理するstate
    const [open, setOpen] = useState(false);

    // firestoreから取得したuser情報を入れるステート
    const [users, setUsers] = useState([]);

    // いいねしたお店のドキュメント(お店ID)を入れる
    const [good, setGood] = useState('');

    // goodステートのお店IDでお店の情報を取得したものを入れる
    // const [goodShop, setGoodShop] = useState('');
    const [goodShop1, setGoodShop1] = useState('');
    const [goodShop2, setGoodShop2] = useState('');
    const [goodShop3, setGoodShop3] = useState('');

    // いいねしたお店のいいね数を入れる
    const [goodShop1Count, setGoodShop1Count] = useState('');
    const [goodShop2Count, setGoodShop2Count] = useState('');
    const [goodShop3Count, setGoodShop3Count] = useState('');

    // コメントしたお店IDを入れる
    const [comment, setComment] = useState('');
    const [commentShop1, setCommentShop1] = useState('');
    const [commentShop2, setCommentShop2] = useState('');
    const [commentShop3, setCommentShop3] = useState('');

    // コメントしたお店の情報
    const [commentShop1Count, setCommentShop1Count] = useState('');
    const [commentShop2Count, setCommentShop2Count] = useState('');
    const [commentShop3Count, setCommentShop3Count] = useState('');

    // ////////////////////////////////////////
    /*                通常の変数               */
    // ////////////////////////////////////////
    // いいねしたお店三軒分を取得するURL設定
    const goodShop1Url = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=4883ba76de4f3d72&id=${good[good.length - 1] && good[good.length - 1].restId}&format=jsonp`
    const goodShop2Url = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=4883ba76de4f3d72&id=${good[good.length - 2] && good[good.length - 2].restId}&format=jsonp`
    const goodShop3Url = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=4883ba76de4f3d72&id=${good[good.length - 3] && good[good.length - 3].restId}&format=jsonp`

    // コメントしたお店三軒分を取得するURL設定
    const commentShop1Url = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=4883ba76de4f3d72&id=${comment[comment.length - 1] && comment[comment.length - 1].restId}&format=jsonp`
    const commentShop2Url = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=4883ba76de4f3d72&id=${comment[comment.length - 2] && comment[comment.length - 2].restId}&format=jsonp`
    const commentShop3Url = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=4883ba76de4f3d72&id=${comment[comment.length - 3] && comment[comment.length - 3].restId}&format=jsonp`

    const { id } = useParams()

    // ////////////////////////////////////////
    /*                イベント関数             */
    ///////////////////////////////////////////

    // 特定の条件(編集の確定やキャンセル、背景をクリック)したときにモーダルを閉じる関数
    const handleClose = () => {
        setOpen(false);
    };

    // ///////////////////////////////////////////
    /*                 UseEffect                */
    // //////////////////////////////////////////

    // パラメーターから受け取ったdocIDをキーにユーザー情報を取得
    useEffect(() => {
        db.collection('users').doc(id).get().then(doc => {
            setUsers(doc.data())
        })

    }, [])

    // いいねしたお店IDを取得
    useEffect(() => {
        db.collection('users').doc(id).collection('good')
            .orderBy('time', 'desc').limit(3)
            .onSnapshot(snapshot => {
                const getGoodShop = snapshot.docs.map(doc => {
                    return {
                        restId: doc.id
                    }
                })
                setGood(getGoodShop)
            })
    }, [])

    // いいねしたお店情報を取得
    useEffect(() => {
        axios.get(goodShop1Url, { 'adapter': jsonpAdapter })
            .then((res) => {
                setGoodShop1(res.data.results.shop)
            })
    }, [good])

    useEffect(() => {
        axios.get(goodShop2Url, { 'adapter': jsonpAdapter })
            .then((res) => {
                setGoodShop2(res.data.results.shop)
            })
    }, [good])

    useEffect(() => {
        axios.get(goodShop3Url, { 'adapter': jsonpAdapter })
            .then((res) => {
                setGoodShop3(res.data.results.shop)
            })
    }, [good])

    // いいねしたお店のいいね数を取得
    useEffect(() => {
        goodShop1.length > 0 && db.collection('rest').doc(goodShop1[0].id).collection('good')
            .onSnapshot(snapshot => {
                const GoodCount = snapshot.docs.map((doc) => {
                    return {
                        ...doc.id
                    }
                })
                setGoodShop1Count(GoodCount.length)
            })
    }, [goodShop1])

    useEffect(() => {
        goodShop2.length > 0 && db.collection('rest').doc(goodShop2[0].id).collection('good')
            .onSnapshot(snapshot => {
                const GoodCount = snapshot.docs.map((doc) => {
                    return {
                        ...doc.id
                    }
                })
                setGoodShop2Count(GoodCount.length)
            })
    }, [goodShop2])

    useEffect(() => {
        goodShop3.length > 0 && db.collection('rest').doc(goodShop3[0].id).collection('good')
            .onSnapshot(snapshot => {
                const GoodCount = snapshot.docs.map((doc) => {
                    return {
                        ...doc.id
                    }
                })
                setGoodShop3Count(GoodCount.length)
            })
    }, [goodShop3])

    // コメントしたお店IDを取得
    useEffect(() => {
        db.collection('users')
            .doc(id).collection('comment')
            .orderBy('time', 'desc').limit(3)
            .onSnapshot(snapshot => {
                const getCommentShop = snapshot.docs.map(doc => {
                    return {
                        restId: doc.id
                    }
                })
                setComment(getCommentShop)
            })
    }, [])

    // コメントしたお店情報を取得
    useEffect(() => {
        axios.get(commentShop1Url, { 'adapter': jsonpAdapter })
            .then((res) => {
                setCommentShop1(res.data.results.shop)
            })
    }, [comment])

    useEffect(() => {
        axios.get(commentShop2Url, { 'adapter': jsonpAdapter })
            .then((res) => {
                setCommentShop2(res.data.results.shop)
            })
    }, [comment])

    useEffect(() => {
        axios.get(commentShop3Url, { 'adapter': jsonpAdapter })
            .then((res) => {
                setCommentShop3(res.data.results.shop)
            })
    }, [comment])

    // コメントしたお店のいいね数を取得
    useEffect(() => {
        commentShop1.length > 0 && db.collection('rest').doc(commentShop1[0].id).collection('good')
            .onSnapshot(snapshot => {
                const GoodCount = snapshot.docs.map((doc) => {
                    return {
                        ...doc.id
                    }
                })
                setCommentShop1Count(GoodCount.length)
            })
    }, [commentShop1])

    useEffect(() => {
        commentShop2.length > 0 && db.collection('rest').doc(commentShop2[0].id).collection('good')
            .onSnapshot(snapshot => {
                const GoodCount = snapshot.docs.map((doc) => {
                    return {
                        ...doc.id
                    }
                })
                setCommentShop2Count(GoodCount.length)
            })
    }, [commentShop2])

    useEffect(() => {
        commentShop3.length > 0 && db.collection('rest').doc(commentShop3[0].id).collection('good')
            .onSnapshot(snapshot => {
                const GoodCount = snapshot.docs.map((doc) => {
                    return {
                        ...doc.id
                    }
                })
                setCommentShop3Count(GoodCount.length)
            })
    }, [commentShop3])

    return (
        <>
            <div className='user-profile container'>
                <div className='user-profile-config'>
                    <ImageArea images={users && users.userImage} />
                </div>

                <div className='user-info-wrap user-info-wrap-first'>
                    <h2 className="user-info-title user-info-title-first ">{users && users.username}</h2>
                    {/* <p className='user-info-desc'>自己紹介</p> */}
                    {/* <p style={{ marginTop: '7px', lineHeight: '1.65', wordWrap: 'break-word' }}>
                        {selfIntroduction}
                    </p> */}
                    <TextField variant='outlined' fullWidth={true} multiline={true} value={users ? users.userDesc : ''} rows={5} InputProps={{ readOnly: true }} placeholder='自己紹介' />
                </div>

                {/* <div className='user-info-wrap'>
                    <h2 className='user-info-title'>こんな感じでごはんが食べたい</h2>
                    <p className="user-info-desc user-info-desc-second">このユーザーがどんなふうに一緒にごはんを食べたいのか分かります</p>
                </div>

                <div className='user-info-wrap'>
                    <h2 className='user-info-title'>行くお店のジャンルの傾向</h2>
                    <p className="user-info-desc">このサービスを使ったお店から集計しています</p>
                </div>

                <div className='user-info-wrap'>
                    <h2 className='user-info-title'>時間帯の傾向</h2>
                    <p className="user-info-desc">このサービスを使って行ったときの時間帯から集計しています</p>
                </div> */}

                <div className='user-info-wrap'>
                    <h2 className='user-info-title'>またいきてぇお店</h2>
                    <p className="user-info-desc">この人がまたいきてぇをしたお店です</p>
                    <FavoriteShop
                        shopImage1={goodShop1[0] && goodShop1[0].photo.pc.m}
                        shopImage2={goodShop2[0] && goodShop2[0].photo.pc.m}
                        shopImage3={goodShop3[0] && goodShop3[0].photo.pc.m}
                        shopName1={goodShop1[0] && goodShop1[0].name}
                        shopName2={goodShop2[0] && goodShop2[0].name}
                        shopName3={goodShop3[0] && goodShop3[0].name}
                        shopId1={goodShop1[0] && goodShop1[0].id}
                        shopId2={goodShop2[0] && goodShop2[0].id}
                        shopId3={goodShop3[0] && goodShop3[0].id}
                        goodCount1={goodShop1Count && goodShop1Count}
                        goodCount2={goodShop2Count && goodShop2Count}
                        goodCount3={goodShop3Count && goodShop3Count}
                        paramsId={id}
                    />
                </div>

                {/* <div className='user-info-wrap'>
                    <h2 className='user-info-title'>行ったお店のコメント</h2>
                    <p className="user-info-desc">この人がコメントをしたお店です</p>
                    <FavoriteShopComment
                        shopImage1={commentShop1[0] && commentShop1[0].photo.pc.m}
                        shopImage2={commentShop2[0] && commentShop2[0].photo.pc.m}
                        shopImage3={commentShop3[0] && commentShop3[0].photo.pc.m}
                        shopName1={commentShop1[0] && commentShop1[0].name}
                        shopName2={commentShop2[0] && commentShop2[0].name}
                        shopName3={commentShop3[0] && commentShop3[0].name}
                        shopId1={commentShop1[0] && commentShop1[0].id}
                        shopId2={commentShop2[0] && commentShop2[0].id}
                        shopId3={commentShop3[0] && commentShop3[0].id}
                        goodCount1={commentShop1Count && commentShop1Count}
                        goodCount2={commentShop2Count && commentShop2Count}
                        goodCount3={commentShop3Count && commentShop3Count}
                    />
                </div> */}

            </div>

            <FormDialog
                open={open}
                handleClose={handleClose}
            />
        </>
    )
})

export default OtherUserInfo;