import styled from "styled-components";

export const svgIconStyle = {
    fill : "#DDDDDD",
    height : "32px",
    width  : "32px"
}

export const HeaderContainer = styled.div`
background : black;
color   :   #DDDDDD;
padding :   12px 64px;
display :   flex;
flex-direction  :   row;
justify-content :   space-between;
position :  relative;
border-bottom : 1px solid gray;
`;

export const HeaderSubContainer = styled.div`
color   :   #DDDDDD;
padding :   8px;
display :   flex;
flex-direction  :   row;
font-weight : 600;
align-items :   center;
gap     :   20px;
`;

export const SearchBar = styled.input`
  background: #1b1b1b;
  color: #DDDDDD;
  border-radius: 128px;
  padding: 16px 32px;
  border: 1px solid #303030;
  width: 400px;
  height: 16px;
  text-align: left;
  outline: none; 
  font-size: 16px; 

  &:focus {
    background: #303030;
    color: #FFFFFF;
  }
`;


export const PrimaryButton = styled.div`
background  :   #1b1b1b;
color       :   #DDDDDD;
border-radius : 128px;
padding     : 16px 32px;
border      :   1px solid #303030;
cursor      : pointer;
&:hover {
    background: #303030;
    color: #FFFFFF;
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
    background  :   rgb(197 197 197);
    color       :   black;
`;

export const SidebarContainer = styled.div`
  position: fixed; /* Keep sidebar fixed */
  background: black;
  color: #DDDDDD;
  padding: 32px 0 24px 0;
  margin-top : -120px;
  z-index : 0;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #303030;
  height: 100vh; /* Full height of the viewport */
  width: 250px;  /* Fixed width for the sidebar */
  overflow-y: auto; 
/* Enable scrolling if content overflows */
`;


export const TopCTA = styled.div`
color   :   #DDDDDD;
padding :   64px 16px 32px 16px;
display :   flex;
flex-direction  :   column;
font-weight : 600;
align-items :   center;
gap     :   20px;
`;

export const MenuItems = styled.div`
color   :   #DDDDDD;
display :   flex;
flex-direction  :   column;
font-weight : 600;
gap     :   2px;
`;

export const MenuItem = styled.div`
color   :   #DDDDDD;
padding :  16px 32px;
display :   flex;
flex-direction  :   row;
font-weight : 600;
align-items :   center;
gap     :   20px;
text-align  : left;
z-index : 3;
cursor: pointer;
&:hover {
    background: rgb(35 52 67);
    color: #FFFFFF; 
  }
`;


export const BodyContainer = styled.div`
  background: white;
  color: black;
  padding: 24px 32px;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #303030;
  height: 130vh; /* Use full viewport height */
  gap: 24px;
  margin-left: 250px; 
  flex: 1; 
  overflow-y: auto;
`;


export const TaskGroup = styled.div`
background  : white;
color       : black;
padding     : 24px;
display     : flex;
flex-direction  :   column;
gap         : 24px;
width : 100%;
flex: 1;
height: 100%;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
border      :   1px solid #d3d3d3;
`;

export const TaskItem = styled.div`
background  :rgb(247 247 247);
color       : black;
padding     : 24px;
display     :   flex;
flex-direction  :   row;
justify-content : space-between;
border : 1px solid #303030;
`;

export const EditPopup = styled(TaskGroup)`
  background: rgb(242 242 242);
  color: black;
  position : sticky;
  height  :600px;
  
`;

export const LoginContainer = styled.div`
    background : "white";
    display : "flex";
    flex-direction : "column";
    gap:"24px";
    height : 100vh;
`;

export const Title = styled.div`
    background :  black;
    color: white;
    height: 30%;
    align-content: center;
`;

export const AuthContainer = styled.div`
    background :  #e8e8e8;
    display : flex;
    flex-direction : row;
    gap : 24px;
    justify-content : center;
    height :  70%;
    align-content: center;
    padding : 24px;
    text-align: -webkit-center;

`;

export const Login = styled.div`
    background : white;
    padding     : 24px;
    flex :1;

`;

export const Signup = styled.div`
background : white;
    padding     : 24px;
    flex : 1;
`;
