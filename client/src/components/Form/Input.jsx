const Input = ({ label, placeholder, type, register, required }) => (
  <>
    <label>{label}</label>
    <input name={label} ref={register({ required })} />
  </>
);
