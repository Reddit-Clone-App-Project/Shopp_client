import { Outlet } from "react-router";
import SellerBlackHeader from "../../components/SellerBlackHeader";
import SellerSideBar from "../../features/SellerDashboard/SellerSidebar";
import { useLocation } from "react-router";

const SellerPageTemplate = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const pathNameToNav = (name: string) => {
    let displayNavName = '';
    const nameArr = name.split('/');

    switch(nameArr[2]){
      case "dashboard":
        displayNavName = "Home";
        break;
      case "order":
        displayNavName = "Order Management";
        if(nameArr[3] === "all") displayNavName += " > All";
        else if(nameArr[3] === "bulk") displayNavName += " > Bulk Shipment";
        else if(nameArr[3] === "pickup") displayNavName += " > Orders Pick Up";
        else if(nameArr[3] === "returns") displayNavName += " > Return/Refund/Cancellation";
        break;
      case "product":
        displayNavName = "Product Management";
        break;
      case "marketing":
        displayNavName = "Marketing";
        break;
      case "customer-service":
        displayNavName = "Customer Service";
        break;
      case "financial":
        displayNavName = "Financial";
        break;
      case "metrics":
        displayNavName = "Metrics";
        break;
      case "setting":
        displayNavName = "Shop Setting";
        break;
    };

    return displayNavName;
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <SellerBlackHeader section={pathNameToNav(pathname)} mLogo={"ml-7"} mSection={"ml-20"} />

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