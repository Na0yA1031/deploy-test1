import React from 'react'
import styled from 'styled-components'
import { useState, useEffect, useContext } from 'react'
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocode from 'react-geocode'
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router';
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';
import { db } from '../firebase/index';
import { AuthContext } from '../AuthProvider';

// styled-components
const ShopImg = styled.img`
    height: 200px;
    width: 200px;
    border: 1px solid #000;
    border-radius: 50%;
    margin: 40px;
`;

const MapStyle = {
    height: "400px",
    width: "80%",
    margin: "40px auto",
    border: "1px solid #000"
};

const Wrapper = styled.section`
    display: flex;
    margin-bottom: 20px;
    background-color: #c0c0c0;
`;

const InfoList = styled.li`
    margin-top: 25px;
`;

const Location = styled.section`
    width: 80%;
    margin: 0 auto;
`;

const CommentSection = styled.section`
    width: 80%;
    margin: 0 auto;
`;

const GoodButton = styled(Button)`
height: 50px;
width: 300px;
margin: 0 auto;
background-color: #0099ff;
float: right;
`;

const GoodButtonParagraph = styled.p`
color: #fff;
font-weight: bold;
font-size: 100%;
`;

const Span = styled.span`
    font-weight: bold;
`;

// const CommentForm = styled.form`
//     margin: 0 auto 100px;
//     background-color: #c0c0c0;
//     display: flex;
//     flex-direction: column;
// `;
//ここまでがスタイル

const Restaurant = () => {
    //ユーザー情報を受け取るstate
    const [user, setUser] = useState([{
        birthday: "",
        email: "",
        gender: "",
        id: "",
        username: ""
    }]);
    //useEffectからお店情報をstateで受け取る
    const [shopResult, setShopResult] = useState([{
        address: '',
        photo: {
            pc: {
                m: ''
            }
        },
        name: '',
        access: '',
        genre: '',
        open: '',
        budget: {
            name: ''
        }
    }]);

    //いいねの情報を入れるstate(counter.lengthでいいねの数を集計)
    const [counter, setCounter] = useState([]);

    //コメント情報を入れるstate
    // const [comments, setComments] = useState([{
    //     user_id: '',
    //     title: '',
    //     content: '',
    //     time: null
    // }]);

    //コメントのタイトルと文章をstateに渡す
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');

    //パスからお店のIDを取得
    const { id } = useParams();

    //user情報を取得
    const { authUser } = useContext(AuthContext);
    const email = authUser && authUser.email;

    const disabled = authUser ? false : true;

    useEffect(() => {
        db.collection('users').where('email', '==', email)
            .onSnapshot(snapshot => {
                const getUsers = snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        docId: doc.id
                    }
                });
                console.log(getUsers);
                setUser(getUsers);
            });
        db.collection('rest').doc(id).collection('good').onSnapshot(snap => {
            const goodCount = snap.docs.map(doc => {
                return doc.data;
            })
            setCounter(goodCount);
        });
        // db.collection('rest').doc(id).collection('comments').onSnapshot(snap => {
        //     const getComments = snap.docs.map(doc => {
        //         return doc.data();
        //     })
        //     setComments(getComments);
        //     console.log(comments);
        // });
        axios.get(`http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=17f7928912557ff8&id=${id}&order=4&format=jsonp`, {
            'adapter': jsonpAdapter,
        }).then(res => {
            setShopResult(res.data.results.shop);
            Geocode.fromAddress(res.data.results.shop[0].address).then(
                (response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    setPlace({ lat, lng });
                },
                (error) => {
                    console.log(error);
                }
            );
        });
    }, [authUser]);

    // 緯度・経度を変更
    const center = {
        lat: 35.62982,
        lng: 139.794242
    };

    const [place, setPlace] = useState(center);

    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
    Geocode.setLanguage('ja');
    Geocode.setRegion('ja');

    // いいね(行きてえ)済みかどうかの確認
    const [good, setGood] = useState(false);

    // いいねの状態の切り替え
    const handleClick = () => {
        if (good === false) {
            console.log(`${user[0].id},${id}`);
            db.collection('rest').doc(id)
                .collection('good').doc(user[0].id).set({
                    user_id: user[0].id,
                    time: new Date()
                });
            db.collection('users').doc(user[0].docId)
                .collection('good').doc(id).set({
                    rest_id: id,
                    time: new Date()
                })
            setGood(true);
        } else {
            db.collection('rest').doc(id)
                .collection('good').doc(user[0].id).delete().then(() => {
                    console.log('Deleted!');
                }).catch((error) => {
                    console.log(error);
                });
            db.collection('users').doc(user[0].docId)
                .collection('good').doc(id).delete().then(() => {
                    console.log('Deleted!');
                }).catch((error) => {
                    console.log(error);
                });
            setGood(false);
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     db.collection('rest').doc(id).collection('comments').doc(user[0].id).set({
    //         title: title,
    //         content: content,
    //         time: new Date(),
    //         user_id: user[0].id
    //     });
    //     db.collection('users').doc(user[0].docID).collection('comments').doc(id).set({
    //         title: title,
    //         content: content,
    //         time: new Date(),
    //         rest_id: id
    //     });
    //     setTitle('');
    //     setContent('');
    //     window.alert('コメントが送信されました！');
    // }

    return (
        <>
            <Wrapper>
                <ShopImg src={shopResult[0].photo.pc.m}></ShopImg>
                <div>
                    <ul>
                        <InfoList>店名　　　<Span>{shopResult[0].name}</Span></InfoList>
                        <InfoList>アクセス　<Span>{shopResult[0].access}</Span></InfoList>
                        <InfoList>ジャンル　<Span>{shopResult[0].genre.name}</Span></InfoList>
                        <InfoList>営業時間　<Span>{shopResult[0].open}</Span></InfoList>
                        <InfoList>平均予算　<Span>{shopResult[0].budget.name}</Span></InfoList>
                        <InfoList>行きてえ　<Span>{counter.length}</Span></InfoList>
                    </ul>
                    <GoodButton onClick={handleClick} disabled={disabled}>
                        {
                            good ?
                                <GoodButtonParagraph>行きてえ済</GoodButtonParagraph> : <GoodButtonParagraph>行きてえ</GoodButtonParagraph>
                        }
                    </GoodButton>
                </div>
            </Wrapper>

            <Location>
                <h1 style={{ fontWeight: 'bold' }}>お店の場所</h1>
                <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
                    <GoogleMap mapContainerStyle={MapStyle} center={place} zoom={17}>
                        <Marker position={place}></Marker>
                    </GoogleMap>
                </LoadScript>
            </Location>

            {/* <CommentSection>
                <h1 style={{ fontWeight: 'bold' }}>お店へのコメント</h1>
                <CommentForm onSubmit={handleSubmit}>
                    <input type='text' placeholder='タイトル' value={title} style={{ width: '20%', margin: '5px auto' }} onChange={e => setTitle(e.target.value)}></input>
                    <textarea type='text' placeholder='ここにコメントを入力してください' value={content} style={{ width: '50%', height: '100px', margin: '0 auto' }} onChange={e => setContent(e.target.value)}></textarea>
                    <Button type='submit' style={{ width: '10%', margin: '5px auto', fontSize: '20px', color: 'white', backgroundColor: 'blue', textAlign: 'center' }}>送信</Button>
                </CommentForm>
            </CommentSection>
            {
                comments ?
                    comments.map(comment => {
                        <div>
                            <h1>{comment.title}</h1>
                        </div>
                    }) : <p>Loading...</p>
            } */}
        </>
    )
}


export default Restaurant