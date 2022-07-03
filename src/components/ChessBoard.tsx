import React from 'react'
import { ChessType } from '../types/enums'
import Chess from './Chess'

import './ChessBoard.css'

interface IChessBoard {
  chessList: ChessType[]
  onClick?: (i:number) => void
  isGameOver?: boolean
};

export const ChessBoard: React.FC<IChessBoard> = function (props) {
  return (
    <div className='chess-board'>
      { props.chessList.map((type, index) =>
        <Chess
          key={index}
          type={type}
          onClick={() => {
            if (props.onClick && !props.isGameOver) {
              props.onClick(index)
            }
          }}
        />)
      }
    </div>
  )
}
// 若要使得默认属性中的类型检查和props属性对应上，需要把函数约束成 ChessBoard: React.FC<IChessBoard> 这样的形式
ChessBoard.defaultProps = {
  isGameOver: false
}
