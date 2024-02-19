function Form() {
  return (
    <form className='petpage__input--container' onSubmit={handleName}>
        <input type="text" name="petName" className="petpage__nameinput" placeholder="Name your pet" />
        <button className="petpage__button">save</button>
    </form>
  )
}

export default Form;
