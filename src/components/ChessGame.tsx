import React, { useCallback, useState } from 'react'
import { ChessType, GameStatus } from '../types/enums'
import { ChessBoard } from './ChessBoard'
type NextChess = ChessType.red | ChessType.black
enum Direc {
  row,
  col,
  diagonal // 对角线
}
const gameResult = {
  [GameStatus.gaming] : '对局进行中',
  [GameStatus.redWin] : '红方胜利',
  [GameStatus.blackWin] : '黑方胜利',
  [GameStatus.eqaul] : '平局',
}
function isEqualInLine(chessList:ChessType[], start:number, lineLen: number, direction: Direc): boolean {
  // 对角线是否一样
  if (direction === Direc.diagonal) {
    return (
      (chessList[0] === chessList[4] && chessList[4] === chessList[8]) || 
      (chessList[2] === chessList[4] && chessList[4] === chessList[6])
    ) && chessList[4] !== ChessType.none
  }
  // 橫向或者纵向是否一样
  const interval = direction === Direc.row ? 1 : 3 // 横向棋子的index间隔为1 纵向index间隔为3
  const headChess = chessList[start];
  const otherChessIndex = Array(lineLen - 1).fill('').map((item, index) => start + ((index + 1) * interval));
  const otherChess = otherChessIndex.map((index) => chessList[index]);

  const result = otherChess.filter((chess) => chess === headChess).length === otherChess.length;
  return result
}

function getGameStatus(index: number, curChess:ChessType, chessList:ChessType[]): GameStatus {
  // 是否某方胜利
  const rowStart = Math.floor(index / 3) * 3 // 如果落子的index 为012表示落在第0行 然后判断第0行所有元素是否一致
  const colStart = index % 3 // 如果落子的index为036 表示落在第0列 然后判断第0列是否一致

  if(
    isEqualInLine(chessList, rowStart, 3, Direc.row) ||
    isEqualInLine(chessList, colStart, 3, Direc.col) ||
    isEqualInLine(chessList, -1, 3, Direc.diagonal)
  ) {
    return curChess === ChessType.red ? GameStatus.redWin : GameStatus.blackWin
  }
  // 是否平局
  if(!chessList.includes(ChessType.none)) {
    return GameStatus.eqaul
  }
  return GameStatus.gaming
}

export default function ChessGame() {
  const [chessList, setChessList] = useState(Array(9).fill('').map((item) => ChessType.none));
  const [gameStatus, setGameStatus] = useState(GameStatus.gaming);
  const [nextChess, setNextChess] = useState<NextChess>(ChessType.red);
  const handleClick = useCallback(
    (index: number) => (chessList: ChessType[], nextChess: NextChess) => {
      const newList = [...chessList];
      newList.splice(index, 1, nextChess)
      setChessList(newList)
      const next = nextChess === ChessType.red ? ChessType.black : ChessType.red
      setNextChess(next);
      setGameStatus(getGameStatus(index, nextChess, newList))
    },
    [],
  )
  
  const nextTip = gameStatus === GameStatus.gaming ? `请${nextChess === ChessType.red ? '红' : '黑'}方落子` : '游戏结束'
  return (
    <div>
      <ChessBoard
        chessList={ chessList }
        isGameOver={gameStatus !== GameStatus.gaming}
        onClick={(index) => handleClick(index)(chessList, nextChess)}
      />
      <div>{nextTip}</div>
      <div>对局结果：{gameResult[gameStatus]}</div>
    </div>
  )
}
