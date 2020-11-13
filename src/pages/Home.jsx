import styled from "styled-components";
import "../css/custom.css"
import { Main, SidePanel, BottomPanel } from '../components/components'

export default () => {
    return (
        <div className="flex h-screen w-screen">
            <div className="w-1/5 bg-gray-800 shadow-xl z-10">
                <SidePanel />
            </div>
            <div className="flex flex-col flex-1 h-full">
                <div className="p-16 w-full h-full bg-gray-100">
                    <Main days={1} hours={0} minutes={1} seconds={10}/>
                </div>
                <BottomPanel />
            </div>
        </div>
    );
}