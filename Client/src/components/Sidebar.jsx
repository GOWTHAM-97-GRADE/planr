import { PrimaryButton, SidebarContainer, TopCTA, MenuItems, MenuItem, svgIconStyle } from "./Utility";

function Sidebar({editPopupState, setEditPopupOpenState, category, setCategory, taskId, setTaskId, setPage}) {
    const cat = ["Home","Completed","Timeup","Household", "Academics"];
    const selectedStyle = {
        background: "rgb(35 52 67)",
        color: "#FFFFFF"
    };

    const newTaskclick = () =>{
        setEditPopupOpenState(0);
        setTaskId(-1);
    }

    const categoryChange = (cat1) => {
        setCategory(cat1);
        setPage(1);
    }
    return (
    <div>
    <SidebarContainer>
        <h2>PLAN-R</h2>
        <TopCTA>
            <PrimaryButton onClick={newTaskclick} style={{background : "#ffcf89", color : "black"}}>New Task</PrimaryButton>
        </TopCTA>
        <MenuItems>
            {cat.map((cat1, index) => (
                <MenuItem onClick={()=>categoryChange(cat1)} style={(cat1 == category? selectedStyle: {})}><svg style={svgIconStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d={(cat1 == "Home") ? "M9,13H15V19H18V10L12,5.5L6,10V19H9V13M4,21V9L12,3L20,9V21H4Z" : "M16,17H5V7H16L19.55,12M17.63,5.84C17.27,5.33 16.67,5 16,5H5A2,2 0 0,0 3,7V17A2,2 0 0,0 5,19H16C16.67,19 17.27,18.66 17.63,18.15L22,12L17.63,5.84Z"} /></svg>{cat1}</MenuItem>
            ))}
            </MenuItems>
    </SidebarContainer>
    </div>
  );
}

export default Sidebar;
