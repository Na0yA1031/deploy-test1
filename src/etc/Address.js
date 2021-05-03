import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

const Address = ({ address, setAddress }) => {
  const handleChangeAddress = (e) => {
    const addressValue = e.target.value.replace('　', ' ');  //全角スペースを半角スペースに変換
    setAddress(addressValue);
  }
  return (
    <FormControl required style={{ width: '100%' }}>
      <Input type='text' value={address} onChange={handleChangeAddress} placeholder='探したい店の住所を入力' style={{ marginBottom: '20px', backgroundColor: '#DDDDDD' }} />
    </FormControl>
  );
};

export default Address;