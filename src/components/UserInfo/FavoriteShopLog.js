/* eslint react-hooks/exhaustive-deps: off */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';


const FavoriteShopLog = () => {
    // /////////////////////////////////////////
    /*              hooks                  */
    // ////////////////////////////////////////

    // 取得したお店IDを入れる
    const [goodShopsId, setGoodShopsId] = useState([])

    // お店IDを使って取得したお店情報を入れる
    const [shopsInfo, setShopsInfo] = useState([])

    const history = useHistory('');

    const { id } = useParams();

    // /////////////////////////////////////////
    /*              通常の変数                  */
    // ////////////////////////////////////////

    // shopsInfoのrestIdを一つの配列に収納
    const idNames = goodShopsId.map((shopId) => {
        return `${shopId.restId},`
    })

    // お店情報20件分を取得するためのURL
    const shopsUrl = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=4883ba76de4f3d72&id=${idNames}&count=20&order=2&format=jsonp`

    // /////////////////////////////////////////
    /*              useEffect                  */
    // ////////////////////////////////////////

    // いいねしたお店idを最新20件取得
    useEffect(() => {
        db.collection('users').doc(id).collection('good').orderBy('time', 'desc').limit(20)
            .onSnapshot(snapshot => {
                const getGoodShopsId = snapshot.docs.map((doc) => {
                    return {
                        restId: doc.id
                    }
                })
                setGoodShopsId(getGoodShopsId)
            })
    }, [])

    // 取得したidでお店情報を取得
    useEffect(() => {
        goodShopsId.length > 0 && axios.get(shopsUrl, { 'adapter': jsonpAdapter })
            .then((res) => {
                setShopsInfo(res.data.results.shop)
            })
    }, [goodShopsId])

    return (
        <>
            <div style={{ width: '100%' }}>
                <div className="shop-log-wrap">
                    <h2 style={{ padding: '30px 0 10px 0', fontSize: '12px' }} >
                        またいきてぇをしたお店の最新の20件を表示しています（ジャンル別）
                    </h2>
                    <table className='shop-log-table'  >
                        <tbody>
                            <tr >
                                <th className='shop-log-th' >店名</th>
                                <th className='shop-log-th' >ジャンル</th>
                            </tr>
                            {shopsInfo.map(shop => (
                                <tr key={shop.id}>
                                    <td className='shop-log-td shop-log-link'
                                        onClick={() => history.push(`/restaurant/${shop.id}`)}
                                    >
                                        {shop.name}
                                    </td>
                                    <td className='shop-log-td'>{shop.genre.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default FavoriteShopLog;