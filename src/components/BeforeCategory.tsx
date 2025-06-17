import choiceIcon from "../assets/HomePage/Before_Category/choice.svg";
import discountIcon from "../assets/HomePage/Before_Category/discount.svg";
import getDressIcon from "../assets/HomePage/Before_Category/get-dress.svg";
import vouchersIcon from "../assets/HomePage/Before_Category/vouchers.svg";
import internationalIcon from "../assets/HomePage/Before_Category/international.svg";

const BeforeCategory = () => {
  const features = [
    {
      icon: choiceIcon,
      title: "Handpicked Deals at",
      subtitle: "Great Prices",
    },
    {
      icon: discountIcon,
      title: "Discount code",
    },
    {
      icon: getDressIcon,
      title: "Shopp Get Dress",
      subtitle: "Voucher 30%",
    },
    {
      icon: vouchersIcon,
      title: "Voucher up to",
      subtitle: "$50 off",
    },
    {
      icon: internationalIcon,
      title: "International goods",
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-6 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-3 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-xs sm:shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-16 sm:h-16 mb-2 sm:mb-4 flex items-center justify-center">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-6 h-6 sm:w-10 sm:h-10 object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xs sm:text-sm font-medium text-gray-800 leading-tight">
                  {feature.title}
                </h3>
                {feature.subtitle && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 leading-tight">
                    {feature.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeCategory;