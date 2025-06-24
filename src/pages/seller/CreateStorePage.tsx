import { useState } from "react";
import LandingForm from "../../features/CreateStore/LandingForm";
import Form1 from "../../features/CreateStore/Form1";
import Form2 from "../../features/CreateStore/Form2";
import FinalForm from "../../features/CreateStore/FinalForm";
import { AddressFormData } from "../../features/CreateStore/AddAddressModal";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export type StoreDataType = {
    storeName: string,
    storeEmail: string,
    storePhone: string,
    address: AddressFormData | null,
    expressShipping: boolean
    fastShipping: boolean,
    economicalShipping: boolean,
    bulkyShipping: boolean,
};


const CreateStorePage = () => {
    const [step, SetStep] = useState(1);
    const { accessToken } = useSelector((state: RootState) => state.auth);
    const [status, setStatus] = useState(true);
    const [storeData, setStoreData] = useState<StoreDataType>({
        storeName: '',
        storeEmail: '',
        storePhone: '',
        address: null as AddressFormData | null,
        expressShipping: false,
        fastShipping: false,
        economicalShipping: false,
        bulkyShipping: false,
    });

    const handleFinalSubmit = async () => {
        try {
            await axios.post('http://localhost:3000/store/', storeData,
                {
                    headers: {
                    Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            toast.success('Registration completed!');
            setStatus(true);

        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.error) {
                toast.error(err.response.data.error);
            } else {
                toast.error('Network Error, try again!')
            } 
            setStatus(false);
        };
        
    };

    const goNext = () => SetStep(prev => prev + 1);
    const goBack = () => SetStep(prev => prev - 1);

    return (
        <div>
            {step === 1 && <LandingForm onNext={goNext} />}
            {step === 2 && <Form1 data={storeData} onChange={setStoreData} onNext={goNext}/>}
            {step === 3 && <Form2 data={storeData} onChange={setStoreData} onNext={goNext} onBack={goBack} onSubmit={handleFinalSubmit}/>}
            {step === 4 && <FinalForm status={status}/>}
        </div>
    );
};

export default CreateStorePage;