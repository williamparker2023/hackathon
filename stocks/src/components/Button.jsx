import React from "react";
import styled from 'styled-components';

const ButtonComponent = styled.button`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border-radius: 0.3rem;
    padding: 2em 10em;
    height ${(props) => 
        props.size === "sm" 
        ? "34px" 
        : props.size === "md" 
        ? "37px" 
        : props.size === "lg" 
        ? "40px" 
        : "34px"};
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    font-weight: 400;
    border 1px solid transparent;
`;




const Button = ({type, variant, className, id, onClick, children}) => {
    return (
        <ButtonComponent 
            type={type ? type : "button"} 
            variant={variant} 
            className={className ? `btn-component ${className}` : "btn-component"}
            id={id} 
            onClick={onClick}
        >
            {children}
        </ButtonComponent>
    )
}
export default Button