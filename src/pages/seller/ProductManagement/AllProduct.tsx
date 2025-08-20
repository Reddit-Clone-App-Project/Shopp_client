import SellerBlackHeader from "../../../components/SellerBlackHeader";
import AllProductSection from "../../../features/ProductManagement/AllProductSection";
import SellerSideBar from "../../../features/SellerDashboard/SellerSidebar";

const AllProduct = () => {
    return (
        <div className="bg-black">
            <div className="flex">
                <SellerBlackHeader 
                    section={'Product Management > All Products'}
                    mLogo={'ml-7'}
                    mSection={'ml-20'}
                />  
            <SellerSideBar />
            <div className="w-[0.5px] h-[100] z-100 bg-white opacity-50"/>
                <main className="h-full w-[72%] mt-24 ml-auto mr-7 text-white">
                    <AllProductSection />
                </main>
            </div>
        </div>
    );
};

export default AllProduct;
