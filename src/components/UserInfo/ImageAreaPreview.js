import React, { useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/core';
import { storage } from '../../firebase';




const useStyles = makeStyles({
    'icon': {
        width: 38,
        height: 38,
        // position: 'absolute',
        // top: '226px',
        // right: '104px'
    },
    'button': {
        width: '150px',
        marginTop: '15px'
    }
})


const ImageAreaPreview = ({ images, setImages }) => {

    // material-ui,IconButtonのstyleを変えるための変数
    const classes = useStyles();

    // // fireStorageに画像をアップロードする関数
    const uploadImages = useCallback((e) => {

        // <input type='file'/>を指定した時のイベントで画像ファイルを取得
        const file = e.target.files;

        if (file.length > 0) {

            // 取得したファイルはそのままStorageにアップロードできない為blobオブジェクトに変換
            // Blobオブジェクトには二つの引数を渡す
            // ① e.target.filesで取得したファイル
            // ②ファイルのタイプ
            let blob = new Blob(file, { type: 'images/jpeg' });

            // 文字列をランダム生成するときに使うアルファベットと数字の定義
            const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

            // 16桁の文字列のランダム生成を指定するための変数
            const N = 16;

            // Array.fromで文字列から配列を生成
            // join()によって16個の要素を持つ配列から16桁の文字列を生成
            const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n % S.length]).join('')

            // storage.ref('image')はStorageのディレクトリ名のようなものでそこにファイルをアップロードするという意味
            // child(ファイル名)でファイル名を指定してStorageにアップロードできる
            const uploadRef = storage.ref('images').child(fileName)

            // putメソッドで実際にアップロードを実行。
            // blobオブジェクトを渡す
            const uploadTask = uploadRef.put(blob);

            // アップロードが完了した後に実行する処理
            uploadTask.then(() => {

                // アッップロードが完了した後のダウンロードできるURLを取得
                // ダウンロードしたURLを<img src="(ダウンロードしたURL)"/>とすることで画像の表示ができる
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

                    // 変数にファイルネームとダウンロードURLを指定したオブジェクトを格納
                    const newImage = { id: fileName, path: downloadURL };

                    // imagesステートの中身を上記のnewImageに更新
                    // 更新されたimagesのpathプロパティをimgのsrcに指定することで画像を表示
                    setImages(newImage)
                })
            })
        }
    }, [setImages])

    return (
        <div className="user-profile-images-preview" >
            <div className='user-profile-img user-profile-img-preview'>
                <img className='img' src={images && images.path} alt='' />
            </div>
            <IconButton className={classes.icon}>
                <label>
                    <AddPhotoAlternateIcon />
                    <input type="file" style={{ display: 'none' }} onChange={uploadImages} />
                </label>
            </IconButton>
        </div>
    )
}

export default ImageAreaPreview;