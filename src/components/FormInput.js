import "./formInput.css"


const FormInput = (props) => {
    return(
        <div>
            {/* <label>{props.placeholder}</label> */}
            <input name={props?.name} placeholder={props?.placeholder} onChange={event => props.setUsername(event?.target?.value)} />
        </div>
    )
}

export default FormInput