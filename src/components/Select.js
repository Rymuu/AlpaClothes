

const Select = (props) => {
    return (
        <>
            <select className="select-filter" name="selecr" id="select">
                <option value="">Asc</option>
                <option value="dog">Asc</option>
                <option value="cat">Dsc</option>
            </select>
        </>
    );
}

export default Select;