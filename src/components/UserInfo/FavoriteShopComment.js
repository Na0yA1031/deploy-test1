import React, { memo } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core';


// const useStyles = makeStyles({
//     button: {
//         marginBottom: '10px',
//         display: 'block',
//         width: '100%',
//         backgroundColor: '#F50357',
//         borderRadius: '0',
//         '&:hover': {
//             backgroundColor: '#F50357',
//             opacity: .7,

//         },
//         '@media screen and (max-width: 600px)': {
//             display: 'none'
//         }
//     },
//     button_sp: {
//         display: 'block',
//         marginBottom: '10px',
//         width: '100%',
//         borderRadius: '0',
//         '&:hover': {
//             backgroundColor: '#F50357',
//             opacity: .7,
//         },
//         '@media screen and (min-width: 601px)': {
//             display: 'none'
//         }
//     }
// })



const FavoriteShopComment = memo(({
    shopImage1,
    shopImage2,
    shopImage3,
    shopName1,
    shopName2,
    shopName3,
    shopId1,
    shopId2,
    shopId3,
    goodCount1,
    goodCount2,
    goodCount3
}) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 5000
    };

    const history = useHistory()

    // const classes = useStyles();

    return (
        <>
            <div className='favorite-shop favorite-shop-pc'>
                <div className='favorite-shop-contents'>
                    <div className="favorite-shop-content">
                        {/* <p className="favorite-shop-number">No.1</p> */}
                        <div className="shop-thumbnail">
                            {shopImage1 ? (
                                <img src={shopImage1 || ''} alt="" onClick={() => shopImage1 && history.push(`/restaurant/${shopId1}`)} />
                            ) : (
                                <div className="non-image-text">
                                    <p>またいきてぇをした<br />お店がありません</p>
                                </div>
                            )}
                        </div>
                        <p className='favorite-shop-name'>{shopName1}</p>
                        <p className='Aggregate'>{`${goodCount1}：またいきてぇ`}</p>
                    </div>

                    <div className="favorite-shop-content">
                        {/* <p className="favorite-shop-number">No.2</p> */}
                        <div className="shop-thumbnail">
                            {shopImage2 ? (
                                <img src={shopImage2 || ''} alt="" onClick={() => shopImage2 && history.push(`/restaurant/${shopId2}`)} />
                            ) : (
                                <div className="non-image-text">
                                    <p>またいきてぇをした<br />お店がありません</p>
                                </div>
                            )}
                        </div>
                        <p className='favorite-shop-name'>{shopName2}</p>
                        <p className='Aggregate'>{`${goodCount2}：またいきてぇ`}</p>
                    </div>

                    <div className="favorite-shop-content">
                        {/* <p className="favorite-shop-number">No.3</p> */}
                        <div className="shop-thumbnail">
                            <div className="non-image-text">
                                {shopImage3 ? (
                                    <img src={shopImage3 || ''} alt="" onClick={() => shopImage3 && history.push(`restaurant/${shopId3}`)} />
                                ) : (
                                    <div className="non-image-text">
                                        <p>またいきてぇをした<br />お店がありません</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className='favorite-shop-name'>{shopName3}</p>
                        <p className='Aggregate'>{`${goodCount3}：またいきてぇ`}</p>
                    </div>
                </div>
            </div>

            <div className='favorite-shop favorite-shop-sp' >
                <div className='favorite-shop-contents'>
                    <Slider {...settings}>
                        <div className="favorite-shop-content">
                            {/* <p className="favorite-shop-number">No.1</p> */}
                            <div className="shop-thumbnail">
                                {shopImage1 ? (
                                    <img src={shopImage1 || ''} alt="" onClick={() => shopImage1 && history.push(`/restaurant/${shopId1}`)} />
                                ) : (
                                    <div className="non-image-text">
                                        <p>またいきてぇをした<br />お店がありません</p>
                                    </div>
                                )}
                            </div>
                            <div style={{ width: '200px', margin: 'auto' }}>
                                <p className='favorite-shop-name'>{shopName1}</p>
                                <p className='Aggregate'>{`${goodCount1}：またいきてぇ`}</p>
                            </div>
                        </div>

                        <div className="favorite-shop-content">
                            {/* <p className="favorite-shop-number">No.2</p> */}
                            <div className="shop-thumbnail">
                                {shopImage2 ? (
                                    <img src={shopImage2 || ''} alt="" onClick={() => shopImage2 && history.push(`/restaurant/${shopId2}`)} />
                                ) : (
                                    <div className="non-image-text">
                                        <p>またいきてぇをした<br />お店がありません</p>
                                    </div>
                                )}
                            </div>
                            <div style={{ width: '200px', margin: 'auto' }}>
                                <p className='favorite-shop-name'>{shopName2}</p>
                                <p className='Aggregate'>{`${goodCount2}：またいきてぇ`}</p>
                            </div>
                        </div>

                        <div className="favorite-shop-content">
                            {/* <p className="favorite-shop-number">No.3</p> */}
                            <div className="shop-thumbnail">
                                {shopImage3 ? (
                                    <img src={shopImage3 || ''} alt="" onClick={() => shopImage3 && history.push(`/restaurant/${shopId3}`)} />
                                ) : (
                                    <div className="non-image-text">
                                        <p>またいきてぇをした<br />お店がありません</p>
                                    </div>
                                )}
                            </div>
                            <div style={{ width: '200px', margin: 'auto' }}>
                                <p className='favorite-shop-name'>{shopName3}</p>
                                <p className='Aggregate'>{`${goodCount3}：またいきてぇ`}</p>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div >
        </>


    )
})

export default FavoriteShopComment;