import React from 'react'

const Input = (props) => {
  return (
    <div className='form__group'>
        <label htmlFor={props.label}>{props.label}</label>
        <input
            type = {props.type}
            step={props.step}
            id = {props.id}
            name = {props.name}
            onChange= {props.handleChange}
            required = {props.required}
            placeholder = {props.placeholder}
            defaultValue={props.defaultValue}
            className = {props.classes}
        />      
    </div>
  )
}

export default Input;
