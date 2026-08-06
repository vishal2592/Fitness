import { useSelector } from "react-redux";
import gymData from "../Data/gymData";
import yogaData from "../Data/yogaData";
const useModuleData = () => {
    const currentMode = useSelector(
        (state) => state.mode.currentMode
    );
    const data = currentMode === "gym"
        ? gymData
        : yogaData;
    return {
        currentMode,
        data
    };
}
export default useModuleData;