import React from 'react'
interface Iprops {
  num: number
  onChange?: (n:number) => void;
  children?: React.ReactNode
}

export const CountComp:React.FC<Iprops> = (props) => {
  return (
    <div>
      <button onClick={() => {
        if (props.onChange) {
          props.onChange(props.num - 1);
          
        }
      }}>-</button>
      <span>{ props.num }</span>
      <button onClick={() => {
        if (props.onChange) {
          props.onChange(props.num + 1)
        }
      }}>+</button>
    </div>
  )
}
