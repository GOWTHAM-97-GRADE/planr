import { useState } from "react";
import { HeaderContainer,HeaderSubContainer, PrimaryButton, SearchBar, svgIconStyle } from "./Utility";

function Header({sideColumn, setSideColumn}) {
    const [query, setQuery] = useState("");
    const search = () => {
        alert("searching..");
    }
    const clr = () => {
        setQuery("");
    }
    return (
    <div style={{position:"relative"}}>
    <HeaderContainer>
        <HeaderSubContainer>PLAN R</HeaderSubContainer>
        <HeaderSubContainer style={{gap:"4px"}}>
            <SearchBar placeholder="Search here..." type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}/> 
            <PrimaryButton onClick={clr}>Clear</PrimaryButton>
            <PrimaryButton onClick={search}>Search</PrimaryButton>
        </HeaderSubContainer>
        <HeaderSubContainer>
            <PrimaryButton onClick={() => setSideColumn(1)}>Account</PrimaryButton>
            <PrimaryButton onClick={() => setSideColumn(2)}><svg style={{...svgIconStyle, height : "20px", width : "20px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 21H14C14 22.1 13.1 23 12 23S10 22.1 10 21M21 19V20H3V19L5 17V11C5 7.9 7 5.2 10 4.3V4C10 2.9 10.9 2 12 2S14 2.9 14 4V4.3C17 5.2 19 7.9 19 11V17L21 19M17 11C17 8.2 14.8 6 12 6S7 8.2 7 11V18H17V11Z" /></svg></PrimaryButton>
        </HeaderSubContainer>
    </HeaderContainer>
    </div>
  );
}

export default Header;
