import React from 'react';
import Genre from "../etc/Genre";
import Address from '../etc/Address';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';


export default function Search() {
    const [genres, setGenres] = React.useState([]);
    const [selectGenre, setSelectGenre] = React.useState('');
    const [address, setAddress] = React.useState([]);
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        const uri = encodeURI(address); //入力した住所をURLエンコード
        const API_ENDPOINT = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=17f7928912557ff8&address=${uri}&genre=${selectGenre}&order=4&count=25&format=jsonp`;
        let check_address = address.replace(/[/t/s　 ]/g, "")
        if (check_address.length === 0) {                       //半角スペースや全角スペースなどを単体で用いた時、アラート
            alert("住所を入力してください。")
        } else {
            history.push({  //ボタンを押すと検索結果ページに移動し、検索結果を渡す
                pathname: '/search/result',
                state: { shopresult: API_ENDPOINT }
            });
        }
    }
    return (
        <div className='container'>
            <h2 className='header-h2' style={{ marginBottom: '40px' }}>いきてぇお店を探そう</h2>
            <div style={{ backgroundColor: '#c0c0c0', padding: '40px 20px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <Genre genres={genres} setGenres={setGenres} selectGenre={selectGenre} setSelectGenre={setSelectGenre} />
                    <Address address={address} setAddress={setAddress} />
                    <p style={{ marginBottom: '20px', lineHeight: '20px' }}>※住所入力の際、都道府県・市町村・地域名ごとにスペースを空けてください。<br /><br />(例) 大阪府 大阪市 中央区 難波千日前</p>
                    <Button variant="contained" type="submit" style={{ fontSize: '16px', backgroundColor: '#222222', color: 'white', width: '100%' }}>この条件で探す</Button>
                </form>
            </div>
        </div>
    );
}
