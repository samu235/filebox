import styles from "./../styles/General.module.css"
import { getSvgIcons } from "./IconsRow"

export default function ItemRow(props) {

    
    let partName=props.description?.split(".")
    console.log(partName)
    let svgIcon = getSvgIcons("folder")
    console.log(partName.length)
    if(partName.length>1){
        svgIcon = getSvgIcons(partName[partName.length-1])
        console.log(partName[partName.length-1])
    }
    if(props.returnIco )
    {
        svgIcon = getSvgIcons("return")
    }
    
    
    
    return (
        <>
            <div className={"card "} onClick={props.myonClick} >

                <div className={"card-body " + styles.container} >
                    <div className={styles.left}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-folder" viewBox="0 0 16 16">
                            <path d={svgIcon} />
                         
                        </svg>
                    </div>
                    <div className={styles.left}>
                        {props.description}
                    </div>

                </div>
            </div>
        </>)
}