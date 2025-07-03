import SellerBlackHeader from "../../components/SellerBlackHeader";
import SellerSideBar from "../../features/SellerDashboard/SellerSidebar";

const SellerDashboard = () => {
    return (
        <div className="bg-black">
            <div className="flex">
                <SellerBlackHeader 
                    section='Home'
                />
                <SellerSideBar />
            </div>
        </div>
    );
};

export default SellerDashboard;