import React from 'react';
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const API_ENDPOINT = `https://webservice.recruit.co.jp/hotpepper/genre/v1/?key=17f7928912557ff8&format=jsonp`;

const Genre = ({ genres, setGenres, selectGenre, setSelectGenre }) => {
  window.callback = json => console.log(json);
  const handleChangeGenre = (e) => {      // 選択したジャンルを収納
    setSelectGenre(e.target.value);
  }
  const options = genres.map((genre, index) => (   // ジャンルリストを取り出しoptionタグに反映
    <MenuItem key={index} value={genre.code}>
      {genre.name}
    </MenuItem>
  ));
  React.useEffect(() => {
    axios.get(API_ENDPOINT, {     // ジャンルマスタAPI取得
      'adapter': jsonpAdapter,
    }).then(res => {
      setGenres(res.data.results.genre)      // 取得したジャンルリストを扱うためにstateに収納
    }).catch(error => {
      console.log(error);
    });
  }, [])
  return (
    <FormControl variant='outlined' style={{ marginBottom: '20px', width: '100%' }}>
      <InputLabel id="genre-select-label" style={{ fontWeight: 'bold', color: 'black' }}>ジャンルを選択</InputLabel>
      <Select labelId="genre-select-label" id="genre-select" value={selectGenre} onChange={handleChangeGenre} label="ジャンルを選択" style={{ backgroundColor: '#DDDDDD' }}>
        {options}
      </Select>
    </FormControl>
  );
};

export default Genre;