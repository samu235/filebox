export default function ItemRow(props) {

    return (
        <>
            <div className="card">
                
                <div className="card-body">
                    {props.description}
                </div>
            </div>
        </>)
}