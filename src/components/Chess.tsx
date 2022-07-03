import React from 'react';
import './Chess.css';
import { ChessType } from '../types/enums';

interface IProps {
  type: ChessType,
  onClick?: () => void,
}
export default function Chess(props: IProps) {
  let chess = null;
  if (props.type === ChessType.red) {
    chess = <div className="chess-item red" />
  } else if (props.type === ChessType.black) {
    chess = <div className="chess-item black" />
  }
  return (
    <div className='chess-box' onClick={() => {
      if(props.type===ChessType.none && props.onClick) {
        props.onClick()
      }
    }}>
      { chess }
    </div>
  )
}
