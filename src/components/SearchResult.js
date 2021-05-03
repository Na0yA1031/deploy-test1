import React from 'react'
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';
import { useHistory, useLocation } from 'react-router';
import { db } from '../firebase/index';

const SearchResult = () => {
    const location = useLocation();                    //location使用
    const state = location.state.shopresult;           //検索結果受け取り

    const [results, setResults] = React.useState([]);

    React.useEffect(() => {
        axios.get(state, {
            'adapter': jsonpAdapter,
        }).then(res => {
            console.log(res.data.results.shop);
            setResults(res.data.results.shop);   //検索結果をstateに収納
        }).catch(error => {
            console.log(error);
        });
    }, [])
    const history = useHistory();   //history使用
    const shopresults = results.map((result, index) => {  //検索結果を加工しそれぞれ表示
        const result_id = result.id;
        const handleClick = () => {
            history.push({
                pathname: `/restaurant/${result_id}`
            })
        }
        db.collection('rest').doc(`${result_id}`).set({  //firestoreに検索結果のIDを収納
            id: result_id
        });
        return (
            <div style={{ display: 'flex', backgroundColor: '#c0c0c0', marginBottom: '20px', padding: '20px', cursor: 'pointer' }} key={index} onClick={handleClick}>
                <div style={{ marginRight: '20px' }}>
                    <img src={result.photo.pc.l} alt="" />
                </div>
                <div>
                    <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '10px' }}>{result.name}</h1>
                    <div>
                        <h2 style={{ marginBottom: '5px' }}>住所：{result.address}</h2>
                        <h2>平均予算：{result.budget.average}</h2>
                        <br />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>お店紹介</h2>
                        <br />
                        <p>{result.catch}</p>
                    </div>
                </div>
            </div>
        )
    });
    return (
        <div className='container'>
            <h2 className='header-h2' style={{ fontSize: '25px', marginBottom: '10px' }}>お店検索結果</h2>
            <p style={{ marginBottom: '40px' }}>あなたが検索したお店の結果です</p>
            <div>
                {shopresults}
            </div>
        </div>
    )
}

export default SearchResult;