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
                <div className="w-[0.5px] h-[100] z-100 bg-white opacity-50"/>
                <main className="h-[150vh]">

                </main>
            </div>
        </div>
    );
};

export default SellerDashboard;