import { Outlet } from "react-router";
import SellerBlackHeader from "../../components/SellerBlackHeader";
import SellerSideBar from "../../features/SellerDashboard/SellerSidebar";

const SellerPageTemplate = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <SellerBlackHeader section="Home" mLogo={"ml-7"} mSection={"ml-20"} />
      
      <div className="flex flex-1 pt-16"> {/* pt-16 to offset the header height */}
        <SellerSideBar />
        <div className="w-[0.5px] bg-white opacity-50"/>
        
        <main className="flex-1 overflow-y-auto p-6 text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerPageTemplate;