import React, {Component} from 'react';
import "./Square.css";

const Square = ({onClick, value}) => {
    // O와 X에 대한 스타일 지정
    const style =
        value === "X"
            ? {color: "black"} // X의 색상은 검은색으로 지정
            : value === "O"
                ? {color: "white"} // O의 색상은 하얀색으로 지정
                : {};

    return (
        <button className="square" onClick={onClick} style={style}>
            {value}
        </button>
    );
};


export default Square;


